import CustomArgsParser from './customArgsParser';

const myParser = new CustomArgsParser();

myParser
  .register('--action, -a', 'action', 'Invoke an action with given name')
  .addChild('--file, -f', 'Pass an arguments for action')
  .parse(process.argv.slice(2));
