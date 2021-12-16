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
  "<TOKEN_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to mint the token supply goes here
 *
 *
 **/
