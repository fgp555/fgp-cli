module.exports = function (plop) {
  // Generador para componentes
  plop.setGenerator("component", {
    description: "Crea un nuevo componente de React",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nombre del componente:",
      },
      {
        type: "input",
        name: "destination",
        message: "Carpeta de destino (por defecto: src/components):",
        default: "src/components",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{destination}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add",
        path: "{{destination}}/{{pascalCase name}}/{{pascalCase name}}.module.css",
        templateFile: "plop-templates/styles.hbs",
      },
    ],
  });
};
