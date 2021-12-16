// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// in order to deploy the new module we need our old friend the app module again.
const app = sdk.getAppModule("0xbDE5aeCa4DD6FcDF4cbA0A86c61f141c39Cb8d64");

try {
  // this should already start to look familiar 👀
  // we're calling the deployTokenModule function from the app module to deploy our own governance token
  const tokenModule = await app.deployTokenModule({
    // what should the governance token be called?
    name: "CookieDAO Governance Token",
    // you know how there's Ethereum (ETH)?
    // Well we're going to have the CookieDAO Governance Token (COOKIE).
    symbol: "COOKIE",
  });
  //just logging out the address of the new module that we deployed if it succeded
  console.log(
    "Successfully deployed token module, address:",
    tokenModule.address,
  );
} catch (error) {
  console.error("failed to deploy token module", error);
}
