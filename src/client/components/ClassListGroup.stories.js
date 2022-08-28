import ClassListGroup from "./ClassListGroup.vue";
import ClassListStories from "./ClassList.stories.js";

export default {
  title: "ClassListGroup",
  component: ClassListGroup,
};
/*
const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { ClassListGroup },
  template: '<ClassListGroup v-bind="args"/>',
});

export const Pair = Template.bind({});
Pair.args = {
  lists: [
    { ...ClassListStories.Default.args },
    { ...ClassListStories.ContainsUser.args },
  ],
};
*/
