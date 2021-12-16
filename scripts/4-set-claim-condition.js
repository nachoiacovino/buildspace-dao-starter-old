// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// we'll need our old friend the bundleDrop again to setup claim conditions (the rules for who can claim the drop)
const bundleDrop = sdk.getBundleDropModule(
  "<DROP_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to set the claim conditions goes here
 *
 *
 **/
