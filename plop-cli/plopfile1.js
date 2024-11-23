module.exports = function (plop) {
    // Generador para componentes
    plop.setGenerator('component', {
      description: 'Crea un nuevo componente de React',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Nombre del componente:',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/component.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
          templateFile: 'plop-templates/styles.hbs',
        },
      ],
    });
  
    // Puedes añadir más generadores aquí (hooks, páginas, etc.)
  };
  