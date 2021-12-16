// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// we'll need our old friend the bundleDrop again to setup claim conditions (the rules for who can claim the drop)
const bundleDrop = sdk.getBundleDropModule(
  "0x6382AD08c47e2Cad024BAa240fCe9F349dd7b8a9",
);

try {
  // in order to set a "claim condition" we need to create a factory, this lets us create new claim conditions in an easy way
  const claimConditionFactory = bundleDrop.getClaimConditionFactory();
  //now that we have our factory we can create a new claim phase (phases *can* be used to set up multiple claim conditions, we'll only be using one for now)
  claimConditionFactory.newClaimPhase({
    // we're setting the new claim condition to be active immediately
    startTime: new Date(),
    // this means there are a total of 50,000 nfts available to be claimed
    maxQuantity: 50_000,
    // this means only 1 nft can be claimed per transaction (users will still be able to claim multiple times, but only *1* per transaction)
    maxQuantityPerTransaction: 1,
  });
  // now we are setting the new claim condition factory we just created to be active for the tokenId "0", which is the NFT we created in the previous script
  // Note: each NFT in the bundleDrop has a unique tokenId, so they can all have their own claim conditions (if you wanted to create more than 1 different NFT)
  await bundleDrop.setClaimCondition(0, claimConditionFactory);
  console.log("Sucessfully set claim condition!");
} catch (error) {
  console.error("Failed to set claim condition", error);
}
