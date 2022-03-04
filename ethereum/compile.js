const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// remove build directory before compiling
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// read src .sol file from contracts folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// compile contracts with solc
const output = solc.compile(source, 1).contracts;

// create build directory to hold compiler output
fs.ensureDirSync(buildPath);

// write compiler output to separate JSON files for each contract
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
