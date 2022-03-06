import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x977e6AB52ad6dc54e8A6134b89E909379b9BbaA7"
);

export default instance;
