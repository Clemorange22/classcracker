import Login from "./Login.vue";

export default {
  title: "Login",
  component: Login,
};

export const Default = () => ({
  components: { Login },
  template: `<Login />`,
});
