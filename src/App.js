import { useEffect, useMemo, useState } from "react";
import './App.css';

const App = () => {
  const balance = false;
  const address = "";
  const dropAddress = "";

  const getBalance = async () => {
  };

  const mintNft = async () => {
  };

  const screenToShow = () => {
    if (balance) {
      return (
        <div className="landing dao">
          <h1>🍪 Welcome, fellow CookieDAO Member</h1>
          <button onClick={() => window.open("https://discord.gg")}>
            Join the Discord
          </button>
        </div>
      );
    } else if (address) {
      return (
        <div className="landing h-full">
          <h1>👀 Looks like you're not in the DAO</h1>
          <button onClick={mintNft}>
            Mint NFT
          </button>
        </div>
      );
    } else {
      return (
        <div className="landing h-full">
          <h1>CookieDAO</h1>
          <button onClick={() => { }}>
            Connect Wallet
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {screenToShow()}
    </div>
  );
};

export default App;;
