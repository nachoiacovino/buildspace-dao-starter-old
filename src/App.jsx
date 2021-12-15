import { useEffect, useMemo, useState } from "react";
import "./App.css";

// we will be deploying a bundle-drop module as part of the project, once we have the module address available we fill it in here
const BUNDLE_DROP_MODULE_ADDRESS = "";

const App = () => {
  //we will be checking the balance of the connected wallet later, when we do that we will update this state
  const [balance, setBalance] = useState(1);

  // we will be listing out the members of the dao and how much of the governance token they own
  const [tokenHolders, setTokenHolders] = useState([]);

  // the address will be the address of the connected wallet, we will set that up when we hook up connectiong your wallet
  const address = "";

  //this function will be replaced with the real getBalance function once we have set up the bundle drop module
  const getBalance = async () => {};

  //this function will be replaced with the real claim function once we have set up the bundle drop module
  const mintNft = async () => {};

  // this function will be replaced with the real getTokenHolders function once we have set up the token module
  const getTokenHolders = useState([]);

  const screenToShow = () => {
    //if the connected wallet has a balance this means that they own the NFT already, so we will show them the internal screen
    if (balance) {
      return (
        <div className="h=">
          <h1>🍪 Welcome, fellow CookieDAO Member</h1>
          <button onClick={() => window.open("https://discord.gg")}>
            Join the Discord
          </button>
        </div>
      );
      //otherwise if there is they connected their wallet, but it does *not* have a balance, we will show them the mint nft screen
    } else if (address) {
      return (
        <div className="landing h-full">
          <h1>👀 Looks like you're not in the DAO</h1>
          <button onClick={mintNft}>Mint NFT</button>
        </div>
      );
      //otherwise we will show them the connect wallet screen
    } else {
      return (
        <div className="landing h-full">
          <h1>CookieDAO</h1>
          <button onClick={() => {}}>Connect Wallet</button>
        </div>
      );
    }
  };

  //this just renders the screen based on the logic above
  return <div>{screenToShow()}</div>;
};

export default App;
