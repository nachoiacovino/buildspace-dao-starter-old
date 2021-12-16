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

const tokenModule = sdk.getTokenModule("0xE0a33150469AD506717bA6f32CA8ff7973654554");

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

  // when the user clicks the claim button, we'll want to disable it until the transaction is complete
  // so let's use a useState hook to keep track of whether the button is disabled or not
  const [isClaiming, setIsClaiming] = useState(false);

  // we use the useState hook to keep track of whether the current user has claimed their nft or not
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // we use this useEffect to check if the user has already claimed their nft whenever the connected wallet changes
  useEffect(() => {
    // if there is no address the wallet is not connected, so we just reset the state to "false"
    if (!address) {
      setHasClaimedNFT(false);
      return;
    }
    // if we have an address, the wallet is connected, so we need to check if the user has already claimed their nft
    // we use the sdk to get the bundleDrop module
    // this interface shoudld look familiar from when we were creating our module

    // we call the balanceOf(<address>) function on the bundleDrop module
    // this returns the total *amount* of the nft owned by that address
    // the "0" is the id of the nft we want to check the balance of, in our case it's the first nft in the bundle
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        // if the balance is greater than 0, the user has already claimed their nft
        // NOTE that we are not checking the value by doing a `balance > 0` check:
        // this is because "balance" is a BigNumber - a special number type that is commonly used in web3 applications because numbers can be bigger than the native JavaScript Number type can support
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          //otherwise the user has not claimed their nft yet
        } else {
          setHasClaimedNFT(false);
        }
      })
      .catch((error) => {
        console.error("failed to nft balance", error);
      });
  }, [address]);

  // we need to get the memberlist from the bundleDrop module
  // to do this first we need to keep track of it somewhere, another useState!
  const [memberAddresses, setMemberAddresses] = useState([]);

  // we use this useEffect to get the memberlist if the connected wallet is a member (no need to fetch it if the user is not a mamber)
  useEffect(() => {
    if (!hasClaimedNFT) {
      //nothing to do here
      return;
    }
    // we use bundledrop module to get all the addresses that have minted the nft
    bundleDropModule
      // "0" is the id of the nft we want to get the memberlist of
      .getAllClaimerAddresses("0")
      .then((addresses) => {
        // if it is successfull we just set the memberList into the state
        setMemberAddresses(addresses);
      })
      .catch((err) => {
        // if it fails we log the error to the console
        console.error("failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  // we would also like to display the token amount that the members holding, so we'll use another useState hook
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});

  //similarly to the useEffect before we'll use this useEffect to get the token amounts of the members (but only if the connected wallet is a member)
  useEffect(() => {
    if (!hasClaimedNFT) {
      //nothing to do here
      return;
    }
    // we use the token module to get the token amounts of the members
    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        // if it is successfull we just set the memberTokenAmounts into the state
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        // if it fails we log the error to the console
        console.error("failed to get token amounts", err);
      });
  }, [hasClaimedNFT]);

  // now we need to combine the memberAddresses and the token amounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        // we return back the address of the member
        address,
        // and we add on the tokenAmount of that member, oh hey our old friend the ethers.utils is back!
        tokenAmount: ethers.utils.formatUnits(
          // a member *may* have no tokens at all, in which case we'll fall back to passing 0
          memberTokenAmounts[address] || 0,
          // still the same token decimals as we used when we created the token (18)
          18,
        ),
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

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

  // if the user has already claimed their nft we want to display the interal DAO page to them, only DAO members will see this
  if (hasClaimedNFT) {
    return (
      <div className="container mx-auto my-auto align-center flex column text-center">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
        <div className="flex space-around w-full text-left">
          <div className="flex column w-50">
            <h2>Member List</h2>
            <table className="bg-white p-1 br-1 color-black shadow-md">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // this should never be reached, but just in case we render something
  return (
    <div>
      <p>You found the secret page, have a 🍪.</p>
    </div>
  );
};

export default App;
