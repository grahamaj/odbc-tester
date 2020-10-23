const { promises: fsPromises } = require("fs");
const bindingFile = "./node_modules/odbc/binding.gyp";
fsPromises.readFile(bindingFile).then((bindingStr) => {
  let binding;
  eval(`binding = ${bindingStr}`);
  binding.targets[0].defines = [...binding.targets[0].defines, "DEBUG"];
  return fsPromises.writeFile(bindingFile, JSON.stringify(binding));
}).catch((error) => {
  console.error(`Error setting the debug flag for odbc: ${error.message}`);
  process.exit(1);
});
