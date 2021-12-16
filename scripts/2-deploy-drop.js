import { ethers } from "ethers";
//we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";
//we use readFileSync to read the image file that we want to use for our drop
import { readFileSync } from "fs";

//in order to deploy the new module we need to first know which app we are deploying it to
const app = sdk.getAppModule("<APP_MODULE_ADDRESS>");

/**
 *
 *
 * your code to deploy the bundle drop module goes here
 *
 *
 **/
