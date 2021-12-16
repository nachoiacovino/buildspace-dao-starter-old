//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

/**
 * ------------------------------------------------
 * 💸💸💸💸💸💸 LETS PRINT SOME FAKE MONEY 💸💸💸💸💸💸
 * ------------------------------------------------
 */

// in order to print our fake money we need to first get the token module that we deployed in the previous script
const tokenModule = sdk.getTokenModule(
  "0xE0a33150469AD506717bA6f32CA8ff7973654554",
);

try {
  //first let's define how much fake money we want to print, how about a cool million 💰
  const amount = 1_000_000;
  // we use the util function from "ethers" to convert the amount to have 18 decimals (which is the standard for ERC20 tokens)
  const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
  // now we get to --printing-- minting the fake money!
  await tokenModule.mint(amountWith18Decimals);
  // lets check how much fake money has been created
  const totalSupply = await tokenModule.totalSupply();
  // just logging out the sucessful result
  console.log(
    "There now is",
    ethers.utils.formatUnits(totalSupply, 18),
    "COOKIE in circulation",
  );
} catch (error) {
  console.error("Failed to print money", error);
}
