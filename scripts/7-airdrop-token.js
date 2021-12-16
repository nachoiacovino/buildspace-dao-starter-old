//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// exciting things are happening! we'll now be using to different modules from the sdk!
// in order to airdrop our tokens we need to get a list of all the holders of our NFTs from the bundleDrop module
const bundleDropModule = sdk.getBundleDropModule(
  "0x6382AD08c47e2Cad024BAa240fCe9F349dd7b8a9",
);
// we also need to interact with the token module to actually transfer the token
const tokenModule = sdk.getTokenModule(
  "0x608fE848119636ecdAF36e827617a2030cd6f449",
);

// ok let's go!
try {
  // first up lets get the list all the wallets that have minted our NFT
  // the "0" here is the tokenId of our NFT in the bundleDrop, which is the *first* NFT in the bundleDrop (things are zero-indexed)
  const claimedNFTs = await bundleDropModule.getAllClaimerAddresses(0);

  // in the case that there are no holders of our NFTs there is no-one to airdrop to
  if (claimedNFTs.length === 0) {
    console.log(
      "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
    );
    process.exit(0);
  }

  // now that we have the list of every claimed NFT we can get the wallet address of all of them
  const walletAddresses = claimedNFTs.map((nft) => nft.owner);

  // we could loop through these addresses and send them each some tokens...
  // ...but we can also transfer a whole bunch of tokens in batch, so let's set that up

  const airdropTargets = walletAddresses.map((address) => {
    // we could airdrop each wallet the same amount, but what about mixing it up a bit and randomizing the amounts?
    // this will give us a random amount between 1000 and 10,000
    const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

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
