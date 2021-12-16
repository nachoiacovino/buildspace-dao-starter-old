//we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";
//we use readFileSync to read the image file that we want to use for our drop
import { readFileSync } from "fs";

// we're going to create our actual NFT. In order to do this we need to grab the bundleDrop module again that we deployed in the previous script
const bundleDrop = sdk.getBundleDropModule(
  "<DROP_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to mint the drop goes here
 *
 *
 **/
