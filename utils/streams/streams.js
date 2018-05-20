import CustomArgsParser from './customArgsParser';

const myParser = new CustomArgsParser();

myParser
  .register('--action, -a [name]', 'action', 'Invoke an action with given [name]')
  .addChild('--file, -f [argument]', 'Pass an [argument] for action')
  .parse(process.argv.slice(2));
