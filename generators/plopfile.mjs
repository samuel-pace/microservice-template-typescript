export default function (plop) {
  plop.setGenerator('microservice-api', {
    description: 'application microservice-api',
    prompts: [
      {
        type: 'list',
        name: 'env',
        message: 'Choose lambda type -> ',
        choices: [
          { name: 'API (lambda function with api endpoint)', value: 'api', short: 'api' },
          { name: 'JOB (lambda function to run in background)', value: 'jobs', short: 'jobs' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Microservice name -> ',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Microservice path -> ',
      },
      {
        type: 'list',
        name: 'method',
        when: (t) => t.env === 'api',
        message: 'Microservice path -> ',
        choices: [
          { name: 'GET', value: 'GET', short: 'GET' },
          { name: 'POST', value: 'POST', short: 'POST' },
          { name: 'PUT', value: 'PUT', short: 'PUT' },
          { name: 'DELETE', value: 'DELETE', short: 'DELETE' },
        ],
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../functions/{{env}}/{{name}}/index.ts',
        templateFile: './templates/microservice.js.hbs',
      },
      {
        type: 'add',
        path: '../infra/lambda/{{name}}.yml',
        templateFile: './templates/lambda.yml.hbs',
      },
      {
        type: 'append',
        path: '../serverless.yml',
        pattern: /functions:/,
        template: '  - ${file(./infra/lambda/{{name}}.yml)}',
      },
    ],
  })

  // plop.setGenerator('microservice-job', {
  //   description: 'application microservice-job',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Microservice job name -> ',
  //     },
  //     {
  //       type: 'input',
  //       name: 'path',
  //       message: 'Microservice job path -> ',
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: '../functions/job/{{name}}/index.ts',
  //       templateFile: './templates/job/microservice.js.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: '../infra/lambda/{{name}}.yml',
  //       templateFile: './templates/job/lambda.yml.hbs',
  //     },
  //     {
  //       type: 'append',
  //       path: '../serverless.yml',
  //       pattern: /functions:/,
  //       template: '  - ${file(./infra/lambda/{{name}}.yml)}',
  //     },
  //   ],
  // })
}
