//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// exciting things are happening! we'll now be using to different modules from the sdk!
// in order to airdrop our tokens we need to get a list of all the holders of our NFTs from the bundleDrop module
const bundleDropModule = sdk.getBundleDropModule(
  "<DROP_MODULE_ADDRESS>",
);
// we also need to interact with the token module to actually transfer the token
const tokenModule = sdk.getTokenModule(
  "<TOKEN_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to airdrop the token goes here
 *
 *
 **/
