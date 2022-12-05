import React from "react";
import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import lottery from "./artifacts/Lottery.json";
import token from "./artifacts/LotteryToken.json";
import OpenLotto from "./OpenLotto";
import ClosedLotto from "./ClosedLotto";

const lotteryAddress = "0xd7Cdc697A44cc19EC02F2F67C77DA76de3B373Fd";
const TokenAddress = "0xB2b22ae8f00476d07C94d200FF934D0DF7996fCF";

function MainDashboard({ accounts, setAccounts }) {
  const isConnected = Boolean(accounts[0]);
  const [walletAddress, setWalletAddress] = useState(undefined);
  const [LtoAmmount, setLtoAmmount] = useState(0.1);
  const [lotteryState, setlotteryState] = useState();
  const [tokenBal, settokenBal] = useState(0);
  const [etherBal, setEtherBal] = useState(0);

  async function handleBuyTokens() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);
      try {
        const response = await contract.purchaseTokens({
          value: ethers.utils.parseEther(LtoAmmount.toString()),
        });
        console.log("response", response);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  async function checkState() {
    if (window.ethereum) {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);
      try {
        const response = await contract.betsOpen();
        console.log("response", response);
        setlotteryState(response);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  //===========
  const handleDecrement = () => {
    if (LtoAmmount <= 0.1) return;
    setLtoAmmount(LtoAmmount - 0.1);
  };
  const handleIncrement = () => {
    if (LtoAmmount >= 1) return;
    setLtoAmmount(LtoAmmount + 0.1);
  };

  //   START USE EFFECT
  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);

      provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      let etherBal;
      etherBal = await signer.getBalance();
      etherBal = ethers.utils.formatEther(etherBal, 18);
      setEtherBal(etherBal);

      const walletAddress = await signer.getAddress();
      setWalletAddress(walletAddress);

      let tokenBal;
      const tokenContract = await new ethers.Contract(
        TokenAddress,
        token.abi,
        provider
      );
      tokenBal = await tokenContract.balanceOf(walletAddress);
      tokenBal = ethers.utils.formatEther(tokenBal, 18);
      settokenBal(tokenBal);

      checkState();
      let lotteryState;
      const lotteryContract = await ethers.Contract(
        lotteryAddress,
        lottery.abi,
        provider
      );
      lotteryState = await lotteryContract.betsOpen();
      setlotteryState(lotteryState);
    };
    onLoad();
  }, []);

  //========

  return (
    <div class="content-center justify-center place-content-center text-center">
      <h1 class="text-6xl font-extrabold pt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Lott3ry
      </h1>
      <p class="pb-10">
        Just another Lottery smart contract developed for
        <mark class="px-2 text-whitebg-gradient-to-r to-emerald-600 from-sky-400 rounded ">
          educational
        </mark>{" "}
        purposes.
      </p>
      {isConnected ? (
        <div class="grid h-screen place-items-center ">
          <div class="border rounded p-5 w-500 ">
            <h2 class="text-lg font-bold">Stats of {accounts[0]}:</h2>
            <h2 class="">You have {etherBal} ETH </h2>
            <h2>You have {tokenBal} LT0 Tokens </h2>
          </div>
          <div class=" mt-10 border rounded p-5 w-500 min-w-max">
            <h2>Buy LT0 Tokens to participate in the lottery</h2>
            <h4 class="my-2 font-extrabold">Buy {LtoAmmount} LT0 Tokens</h4>
            <button
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
              onClick={handleDecrement}
            >
              -
            </button>
            <button
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
              onClick={handleIncrement}
            >
              +
            </button>
            <br />
            <br />
            <button
              onClick={handleBuyTokens}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Buy {LtoAmmount} LT0 Tokens
            </button>
          </div>
          <div>
            {/* <h2>Check State</h2>
            <button onClick={checkState}>Check State</button> */}
            <h1 class="my-10">
              <mark class=" p-1 px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                {lotteryState
                  ? "Lottery state: OPEN! Place your bet below 👇"
                  : "The lottery is CLOSED right now"}
              </mark>
            </h1>
            {!lotteryState ? <ClosedLotto /> : <OpenLotto />}
          </div>
        </div>
      ) : (
        <p>You must connect to open bets</p>
      )}
    </div>
  );
}

export default MainDashboard;
