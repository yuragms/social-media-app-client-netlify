export default function (plop) {
  // controller generator
  plop.setGenerator("f", {
    description: "application controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "name new create folder please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/Components/{{name}}/{{name}}.jsx",
        templateFile: "plop-templates/createFileJsx.hbs",
      },
      {
        type: "add",
        path: "src/Components/{{name}}/{{name}}.css",
        templateFile: "plop-templates/createFileCss.hbs",
      },
    ],
  });
}
