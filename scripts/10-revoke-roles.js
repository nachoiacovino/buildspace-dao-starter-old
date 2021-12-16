// we are importing the sdk that we previously set up in the "1-initialize-sdk.js" file
import sdk from "./1-initialize-sdk.js";

// okay, we have everything set up right? what's left?
// there is one small thing that we *should* do in order for members to be able to be able to trust that the DAO is legit
// we need to *remove* our own access to the DAO treasury, it is now set up, it should only be manipulated by the DAO members through voting

// ⚠️⚠️⚠️ PLEASE NOTE that once you run this script you WILL NOT be able to to interact with the DAO treasury anymore, you will only be able to interact with the treasury through the voting

// one last time we'll grab our token module
const tokenModule = sdk.getTokenModule(
  "0x608fE848119636ecdAF36e827617a2030cd6f449",
);

try {
  // let's log out the current roles that exist on the DAO treasury
  console.log(
    "Roles before revoking ourselves",
    await tokenModule.getAllRoleMembers(),
  );
  // we will revoke ourselves from every role on the DAO treasury
  await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
  // let's log out the roles we on the DAO treasury after revoking ourselves
  console.log(
    "Roles after revoking ourselves",
    await tokenModule.getAllRoleMembers(),
  );
  console.log("Successfully revoked our access to the DAO treasury");
} catch (error) {
  console.error("Failed to revoke ourselves from the DAO trasury", error);
}
