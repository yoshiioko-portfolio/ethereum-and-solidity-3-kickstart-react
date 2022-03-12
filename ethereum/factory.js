import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xEa51E2143C7Af6d3f76aF8D2ecbF5110fe4436c8"
);

export default instance;
