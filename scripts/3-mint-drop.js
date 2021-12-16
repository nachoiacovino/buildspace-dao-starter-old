//we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";
//we use readFileSync to read the image file that we want to use for our drop
import { readFileSync } from "fs";

// we're going to create our actual NFT. In order to do this we need to grab the bundleDrop module again that we deployed in the previous script
const bundleDrop = sdk.getBundleDropModule(
  "0x6382AD08c47e2Cad024BAa240fCe9F349dd7b8a9",
);

try {
  await bundleDrop.lazyMintBatch([
    {
      name: "Chocolate Cookie",
      description: "This NFT will give you access to CookieDAO!",
      image: readFileSync("scripts/assets/basic-cookie.png"),
    },
  ]);
  console.log("Successfully created a new NFT in the drop!");
} catch (error) {
  console.error("failed to create the new NFT", error);
}
