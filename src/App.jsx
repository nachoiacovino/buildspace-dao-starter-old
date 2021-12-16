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

const App = () => {
  return (
    <div className="container mx-auto my-auto align-center flex column text-center">
      <h1>Welcome to 🍪DAO</h1>
      <button onClick={() => { }} className="btn-hero">
        Connect your wallet
      </button>
    </div>);
};

export default App;
