import { ethers } from "hardhat";
import { tokenizedBallotSol } from "../typechain-types/contracts";
import * as dotenv from "dotenv";
dotenv.config();

import { Lottery, LotteryToken, Lottery__factory } from "../typechain-types";

let contract: Lottery;
let token: LotteryToken;

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1;

async function main() {
  const provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
  // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  console.log(`Connected to the account of ${signer.address}
  \nThis account has a balance of ${balanceBN.toString()}} Wei`);

  const contractFactory = new Lottery__factory(signer);
  const lotteryContract = await contractFactory.deploy(
    "Lottoken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );

  await lotteryContract.deployed();
  console.log(`Lottery contract deployed at ${lotteryContract.address}\n`);
  const tokenAddress = await lotteryContract.paymentToken();
  console.log(`Lottoken contract address is:${tokenAddress}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
