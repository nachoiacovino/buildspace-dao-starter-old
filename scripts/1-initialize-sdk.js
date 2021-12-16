import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";
//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Initialize the SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
    process.env.PRIVATE_KEY,
    // RPC URL, we'll use our Alchemy API URL from our .env file || you can also pass it the name of the network you want to connect to (rinkeby), but this will be rate-limited
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL || "rinkeby"),
  ),
);

try {
  const apps = await sdk.getApps();
  console.log("Your app address is:", apps[0].address);
} catch (err) {
  console.error("Failed to get apps from the sdk", err);
  process.exit(1);
}

//we are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;
