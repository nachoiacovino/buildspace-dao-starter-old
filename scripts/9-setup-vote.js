//ethers is an amazing library that has a bunch of helpful functions to do blockchain things
import { ethers } from "ethers";
// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// we're going to create a new proposal to be voted on by the DAO members
// to do this we need to access the vote module we just created in the previous script
const voteModule = sdk.getVoteModule(
  "<VOTE_MODULE_ADDRESS>",
);

// we want the voting module to interact with our governance token, so we'll need to get the token module
const tokenModule = sdk.getTokenModule(
  "<TOKEN_MODULE_ADDRESS>",
);

/**
 *
 *
 * your code to setup the vote goes here
 *
 *
 **/
