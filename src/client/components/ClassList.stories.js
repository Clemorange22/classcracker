import ClassList from "./ClassList.vue";

export default {
  title: "ClassList",
  component: ClassList,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { ClassList },
  template: '<ClassList v-bind="args"/>',
});

export const Default = Template.bind({});

Default.args = {
  list: [
    "John Doe",
    "Jane Doe",
    "Mark Doe",
    "John Doe2",
    "Jane Doe2",
    "Mark Doe2",
    "John Doe3",
    "Jane Doe3",
    "Mark Doe3",
    "John Doe4",
    "Jane Doe4",
    "Mark Doe4",
    "John Doe5",
    "Jane Doe5",
    "Mark Doe5",
    "John Doe6",
    "Jane Doe6",
    "Mark Doe6",
    "John Doe7",
    "Jane Doe7",
    "Mark Doe7",
    "John Doe8",
    "Jane Doe8",
    "Mark Doe8",
  ],
  className: "TG1",
};

export const ContainsUser = Template.bind({});

ContainsUser.args = {
  ...Default.args,
  user: "John Doe",
};

ContainsUser.args.className = "TG2";
