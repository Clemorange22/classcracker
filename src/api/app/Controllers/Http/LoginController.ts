import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Session } from 'ecoledirecte.js'
import Env from '@ioc:Adonis/Core/Env'
import { schema } from '@ioc:Adonis/Core/Validator'
import Ws from '../../Services/Ws'
import Student from '../../Models/Student'
import { DateTime } from 'luxon'
import _ from 'lodash'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LoginController {
  public async index(ctx: HttpContextContract) {
    const loginSchema = schema.create({
      username: schema.string(),
      password: schema.string(),
    })

    const payload = await ctx.request.validate({ schema: loginSchema })

    const username = payload.username
    const password = payload.password

    const session = new Session(username, password)
    const account = await session.login().catch((err) => {
      if (err == 'EcoleDirecteAPIError: 505 | Mot de passe invalide !') {
        throw new Error('showToClient:Mot de passe invalide !')
      } else if (err == 'EcoleDirecteAPIError: 505 | Identifiant et/ou mot de passe invalide !') {
        throw new Error('showToClient:Identifiant et/ou mot de passe invalide !')
      } else {
        throw new Error(err)
      }
    })
    if (!(account.type == 'student')) {
      throw new Error("showToClient:Le compte n'est pas un compte élève")
    }
    const school = account._raw.nomEtablissement
    if (!(school == Env.get('SCHOOL_NAME'))) {
      throw new Error(
        'showToClient:Cette instance de classcracker est configurée pour un autre établissement'
      )
    }
    const id = account.edId
    let classCode = account._raw.profile.classe?.code
    if (!classCode) {
      if (Env.get('NODE_ENV') == 'development') {
        classCode = 'TG1'
      } else {
        throw new Error("showToClient:Votre classe n'est pas encore disponible !")
      }

      const student = await Student.find(id)
      const name = account._raw.nom + ' ' + account._raw.prenom

      if (student) {
        // Update student
        await student
          .merge({
            class: classCode,
            updatedAt: DateTime.local(),
          })
          .save()
      } else {
        await Student.create({
          id: id,
          name: name,
          class: classCode,
          createdAt: DateTime.local(),
          updatedAt: DateTime.local(),
        })
      }
      const students = await Student.all()
      const classList = _.groupBy(students, 'class')
      const classListWithNames = _.mapValues(classList, (students) => {
        return _.map(students, (student) => {
          return student.name
        })
      })
      ctx.response.send({
        classList: classListWithNames,
        userClassCode: classCode,
        userName: name,
      })
      Ws.io.emit('new:student', { name: name, class: classCode })
    }
  }
}
