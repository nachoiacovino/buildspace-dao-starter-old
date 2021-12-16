// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// okay, we have everything set up right? what's left?
// there is one small thing that we *should* do in order for members to be able to be able to trust that the DAO is legit
// we need to *remove* our own access to the DAO treasury, it is now set up, it should only be manipulated by the DAO members through voting

// ⚠️⚠️⚠️ PLEASE NOTE that once you run this script you WILL NOT be able to to interact with the DAO treasury anymore, you will only be able to interact with the treasury through the voting

// one last time we'll grab our token module
const tokenModule = sdk.getTokenModule(
  "<TOKEN_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to revoke yourself from minting more currency goes here
 *
 *
 **/
