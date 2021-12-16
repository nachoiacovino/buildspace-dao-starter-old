import { ethers } from "ethers";
//we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";
//we use readFileSync to read the image file that we want to use for our drop
import { readFileSync } from "fs";

//in order to deploy the new module we need to first know which app we are deploying it to
const app = sdk.getAppModule("0x21880B662A42f89337dA882488B48Fa6860966d0");

(async () => {
  try {
    // we call the deployBundleDropModule function from the app module (this function returns a promise, we're using async/await here, you could also use .then())
    const bundleDropModule = await app.deployBundleDropModule({
      // what should the name of the module be? (this is the name that will show up for the collection on OpenSea for example)
      name: "CookieDAO Membership",
      // we can also set the description of the module, this is optional, but it's a good idea to have one because sites like OpenSea will show the image in the collection page
      description: "The best DAO for cookie lovers",
      // we can give the module an image, this is optional, but it's a good idea to have one because sites like OpenSea will show the image in the collection page
      image: readFileSync("scripts/assets/basic-cookie.png"),
      // we need to pass in the address of who will be receiving the proceeds from sales of nfts in the module
      // we're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your wallet address if you want to charge for the drop
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    //just logging out the address of the new module that we deployed if it succeded
    console.log(
      "Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    // we're also logging the metadata of the module so we can see that everything is exactly as we set it
    console.log("bundleDrop metadata:", await bundleDropModule.getMetadata());
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
