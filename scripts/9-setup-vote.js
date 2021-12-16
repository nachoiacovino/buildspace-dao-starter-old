//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// we're going to create a new proposal to be voted on by the DAO members
// to do this we need to access the vote module we just created in the previous script
const voteModule = sdk.getVoteModule(
  "0xeC9E737eBadCC9E4B9E9F9F4D396B1dd8f145868"
);

// we want the voting module to interact with our governance token, so we'll need to get the token module
const tokenModule = sdk.getTokenModule(
  "0xE0a33150469AD506717bA6f32CA8ff7973654554"
);

(async () => {
  // the first thing we're going to do in this script is to give the vote module permissions to act on our token module
  // why? we'll want the vote module to be able to execute functionality on the token module like minting new supply & transferring existing supply
  try {
    // we'll first give the vote module permissions to mint additional governance tokens
    // this means that when there is a proposal to mint additional governance tokens, the vote module will be able to execute the minting if the proposal passes
    await tokenModule.grantRole("minter", voteModule.address);

    // we'll log out a success message when this is done
    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    // we don't want to continue if this fails, so we'll exit the node process
    process.exit(1);
  }

  // now the vote module has permission to mint new governance tokens, but what about the tokens we already minted, personally?
  // we'll want to transfer the *bulk* of them to the vote module (we'll keep some to ourselves)
  try {
    // first lets figure out how many tokens we still own personally
    // we'll get the balance of our own wallet (the one we used to initialize the sdk)
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // we'll turn the amount into a BigNumber so we can do math with it
    // oh hey ethers is back again!
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);

    // we'll transfer 90% of our owned tokens to the vote module, so let's do that math
    // we'll take the total amount, divide it by 100 and multiply by 90, now we have 90% of our total owned amount
    const percent90 = ownedAmount.div(100).mul(90);

    // we'll now call "transfer" on the tokenModule, to transfer 90% of our owned tokens
    await tokenModule.transfer(
      // the first parameter is the address of the recipient
      // in our case that's the vote module address
      voteModule.address,

      // the second parameter is the amount to transfer
      // we'll transfer the 90% of our owned tokens that we just calculated above
      percent90
    );

    // we'll log out a success message when this is done
    console.log("Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
