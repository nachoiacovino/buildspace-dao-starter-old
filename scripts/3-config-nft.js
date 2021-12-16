//we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";
//we use readFileSync to read the image file that we want to use for our drop
import { readFileSync } from "fs";

// we're going to create our actual NFT. In order to do this we need to grab the bundleDrop module again that we deployed in the previous script
const bundleDrop = sdk.getBundleDropModule(
  "0x2fE4C89bf3b7267Db53720E9b4318c74B00C325C"
);

(async () => {
  try {
    // we can create multiple NFTs at once, so we'll use an array here
    // even though we're only creating one NFT, we still need to use an array because the create function expects an array of NFTs
    await bundleDrop.createBatch([
      {
        // what would you like to name your NFT?
        name: "Chocolate Cookie",
        // you can also set the description of your NFT (this is optional)
        description: "This NFT will give you access to CookieDAO!",
        // the image of your NFT
        image: readFileSync("scripts/assets/basic-cookie.png"),
      },
    ]);
    // we'll log out a success message when this is done
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
