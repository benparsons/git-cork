const { exec } = require('child_process');
const fs = require('fs');
var projects = fs.readdirSync('/Users/benp/projects/');
projects.forEach(item => {
  var stat = fs.statSync('../' + item);
  if (stat && stat.isDirectory()) {
    gitParse('../' + item);
  }
});
process.chdir('/Users/benp/')

function gitParse(path) {
  exec(`git -C ${path} status -sb`, (err, stdout, stderr) => {

    if (err) {
      console.log("\n\n=======\n" + path);
      console.log(`err: ${err}`);
      process.exitCode(1);
      return;
    }
    if (stderr) {
      console.log("\n\n=======\n" + path);
      console.log(`stderr: ${stderr}`);
      process.exitCode(1);
      return;
    }

    if (stdout.indexOf('ahead') !== -1 || stdout.indexOf('behind') !== -1 || stdout.split('\n').length > 2) {
      console.log("\n\n=======\n" + path);
      console.log(`stdout: ${stdout}`);
      process.exitCode(1);
    }
  });
}