/* eslint-disable no-unused-vars */
// we'll use these hooks later as we build out the app
import { useEffect, useState, useMemo } from "react";
// ethers is a utility library for interacting with the Ethereum blockchain, we'll be using it later
import { ethers } from "ethers";
// we import the ThirdwebSDK from the thirdweb sdk library, we'll use this to interact with our modules that we deploy in the scripts
import { ThirdwebSDK } from "@3rdweb/sdk";
// we import the useWeb3 hook from the thirdweb hooks library, we'll use this to connect to the blockchain
import { useWeb3 } from "@3rdweb/hooks";
// this is just a little helper function to format long wallet addresses into something more readable, we'll use it later on
const shortenAddress = (str) => {
  return str.substring(0, 6) + "..." + str.substring(str.length - 4);
};

/// ---------- WE'RE BUILDING BELOW THIS LINE ---------- ///

const App = () => {
  return (
    <div className="landing">
      <h1>Welcome to 🍪DAO</h1>
    </div>
  );
};

/// ---------- WE'RE BUILDING ABOVE THIS LINE ---------- ///

export default App;
