//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// exciting things are happening! we'll now be using to different modules from the sdk!
// in order to airdrop our tokens we need to get a list of all the holders of our NFTs from the bundleDrop module
const bundleDropModule = sdk.getBundleDropModule(
  "0x2fE4C89bf3b7267Db53720E9b4318c74B00C325C",
);
// we also need to interact with the token module to actually transfer the token
const tokenModule = sdk.getTokenModule(
  "0xE0a33150469AD506717bA6f32CA8ff7973654554",
);

// ok let's go!
try {
  // first up lets get the list all the wallets that have minted our NFT
  // the "0" here is the tokenId of our NFT in the bundleDrop, which is the *first* NFT in the bundleDrop (things are zero-indexed)
  const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

  // in the case that there are no wallets that minted our NFT there is no-one to airdrop to
  if (walletAddresses.length === 0) {
    console.log(
      "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
    );
    process.exit(0);
  }

  // we could loop through these addresses and send them each some tokens...
  // ...but we can also transfer a whole bunch of tokens in batch, so let's set that up
  const airdropTargets = walletAddresses.map((address) => {
    // we could airdrop each wallet the same amount, but what about mixing it up a bit and randomizing the amounts?
    // this will give us a random amount between 1000 and 10,000
    const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

    console.log("Airdropping", randomAmount, "tokens to", address);

    // a valid target requires us to have a valid address and a valid amount
    const airdropTarget = {
      address,
      // we're using the util function from "ethers" to convert the amount to have 18 decimals (which is the standard for ERC20 tokens)
      amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
    };

    //return it back in the .map(), so we can use it in the next step
    return airdropTarget;
  });

  // now that we have our targets, we can actually airdrop the tokens!
  await tokenModule.transferBatch(airdropTargets);
  console.log("Successfully airdropped tokens to all the holders of the NFT!");
} catch (err) {
  console.error("Failed to airdrop tokens", err);
}
