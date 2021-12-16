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

const bundleDropModule = sdk.getBundleDropModule(
  "0x2fE4C89bf3b7267Db53720E9b4318c74B00C325C",
);

const App = () => {
  // we use the useWeb3 hook to get access to the web3 context
  // connectWallet: a function that lets the user connect their wallet
  // address: the address of the connected wallet (if connected) or undefined (if not connected)
  // error: any error that happens within the web3 context
  // provider: the wallet provider (if connected) or undefined (if not connected)
  const { connectWallet, address, error, provider } = useWeb3();

  // if the wallet is connected we'll have a provider and should be able to get the signer off of it
  // the signer is required to sign transactions on the blockchain, without it we can only read data, not write
  const signer = provider ? provider.getSigner() : undefined;

  // we use a useEffecthook that updates when the signer changes
  useEffect(() => {
    // we pass the signer to the sdk, which enables us to interact with modules now.
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  // we use the useState hook to keep track of whether the current user has claimed their nft or not
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // when the user clicks the claim button, we'll want to disable it until the transaction is complete
  // so let's use a useState hook to keep track of whether the button is disabled or not
  const [isClaiming, setIsClaiming] = useState(false);

  // if there was some kind of error we want to display it
  if (error) {
    // one common error happens when the user's wallet is connected to the wrong network
    // we will handle this error by displaying a message to the user and asking them to switch to rinkeby
    if (error.name === "UnsupportedChainIdError") {
      return (
        <div className="container-xs mx-auto my-auto p-1">
          <h2>Please connect to Rinkeby</h2>
          <p>
            This dapp only works on the Rinkeby network, please switch networks
            in your connected wallet.
          </p>
        </div>
      );
    }
    // if some other error happens we just display the message to the user
    return (
      <div className="container-xs mx-auto my-auto error br-1 p-1">
        <h2>An error occurred</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // if the user has not connected their wallet yet we want to display a button to connect
  if (!address) {
    return (
      <div className="container mx-auto my-auto align-center flex column text-center">
        <h1>Welcome to 🍪DAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  // if the user has connected their wallet but they have not claimed the drop yet, we need to display a button to claim
  if (!hasClaimedNFT) {
    return (
      <div className="container mx-auto my-auto align-center flex column text-center">
        <h1>Mint your free 🍪DAO Membership NFT</h1>
        <button
          disabled={isClaiming}
          className="btn-hero"
          onClick={() => {
            // we set the isClaiming state to true to disable the button until the transaction is complete
            setIsClaiming(true);
            // we call the "claim" function on the bundleDrop module
            // the "0" is the token id of the nft we want to claim
            // the "1" is the amount of tokens we want to claim
            bundleDropModule
              .claim("0", 1)
              .then(() => {
                // if the claim function is successful we set the hasClaimedNFT state to true
                setHasClaimedNFT(true);
              })
              .catch((err) => {
                // if the claim function fails we log out the error
                console.error("failed to claim", err);
              })
              .finally(() => {
                // in *either* case we need to set the isClaiming state to false to enable the button again
                setIsClaiming(false);
              });
          }}
        >
          {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
        </button>
      </div>
    );
  }

  // this should never be reached, but just in case we render something
  return (
    <div>
      <p>You found the secret page, have a 🍪.</p>
    </div>
  );
};

export default App;
