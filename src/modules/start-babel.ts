require('@babel/register')({
  extensions: ['.js', '.ts'],
  cache: true
});
require('module-alias/register');

// @ts-ignore
const program = require('commander');

program
  .option('-m, --module [type]', 'Set module name [module]')
  .parse(process.argv);

require(`./${program.module}/start.ts`);
