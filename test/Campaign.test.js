const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

// declare some re-usable variables
let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  // deploy an instance of the Factory contract
  factory = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: "1000000" })
  );

  // use factory to create an instance of the campaign
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  // use factory method to get the campaign's contract address
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // create a JS representation of the contract that accesses the contract at our deployed address
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});