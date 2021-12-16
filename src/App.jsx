import "./App.css";
import { useEffect, useState, useMemo } from "react";
// we import the useWeb3 hook from the thirdweb hooks library
import { useWeb3 } from "@3rdweb/hooks";
// we import the ThirdwebSDK from the thirdweb sdk library
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

const shortenAddress = (str) => {
  return str.substring(0, 6) + "..." + str.substring(str.length - 4);
};

// we instatiate the sdk with the Alchemy API URL or rinkeby network name
const alchemyApiUrl = "";
const sdk = new ThirdwebSDK(alchemyApiUrl || "rinkeby");
// we can grab the bundleDropModule from the sdk, we'll need it later
const bundleDropModule = sdk.getBundleDropModule(
  "<DROP_MODULE_ADDRESS>",
);
// we can grab the tokenModule from the sdk, we'll need it later
const tokenModule = sdk.getTokenModule(
  "<TOKEN_MODULE_ADDRESS>",
);
// we can grab the tokenModule from the sdk, we'll need it later
const voteModule = sdk.getVoteModule(
  "<VOTE_MODULE_ADDRESS>",
);

const App = () => {
  const screenToShow = () => {
    return (
      <div className="landing h-full">
        <h1>Welcome to 🍪DAO</h1>
      </div>
    );
  };

  return <div>{screenToShow()}</div>;
};

export default App;
