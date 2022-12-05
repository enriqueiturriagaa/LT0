import React from "react";
import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import lottery from "./artifacts/Lottery.json";
import token from "./artifacts/LotteryToken.json";

const lotteryAddress = "0xd7Cdc697A44cc19EC02F2F67C77DA76de3B373Fd";
const TokenAddress = "0xB2b22ae8f00476d07C94d200FF934D0DF7996fCF";

function OpenLotto() {
  const [ownerPool, setOwnerPool] = useState("");
  const [prize, setPrize] = useState(0);
  const [amount, setAmount] = useState(1);

  async function handleOwnerPool() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);

      try {
        const balanceBN = await contract.ownerPool();
        const balance = ethers.utils.formatEther(balanceBN);
        setOwnerPool(balance);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }
  async function handleDisplayPrize() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);

      try {
        const prizeBN = await contract.prize(signer.address);
        const prize = ethers.utils.formatEther(prizeBN);
        setPrize(prizeBN);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  async function handleLT0Approval() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);
      const tokenContract = new ethers.Contract(
        TokenAddress,
        token.abi,
        signer
      );

      try {
        const allowTx = await tokenContract.approve(
          contract.address,
          ethers.constants.MaxUint256
        );
        await allowTx.wait();
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  async function handleBetting(amount) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);
      const tokenContract = new ethers.Contract(
        TokenAddress,
        token.abi,
        signer
      );

      try {
        const tx = await contract.connect(signer.address).betMany();
        const receipt = await tx.wait();
        console.log(`Bets placed (${receipt.transactionHash})\n`);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  async function handleClose() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);

      try {
        const tx = await contract.closeLottery();
        const receipt = await tx.wait();
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  //Use Effect
  useEffect(() => {
    const onLoad = async () => {
      handleOwnerPool();
      handleDisplayPrize();
    };

    return () => {
      onLoad();
    };
  }, []);

  // RETURN
  return (
    <div class=" mt-10 border rounded p-5 w-500 min-w-max mb-10">
      <div>
        <h4 class="text-lg font-extrabold mb-1 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Current ownerPool
        </h4>
        <p>The owner pool is {ownerPool}</p>
      </div>
      <br />
      <div>
        <h4 class="text-lg font-extrabold mb-1 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Prize
        </h4>
        <p>The Prize is {prize} LT0</p>
      </div>
      <br />
      <div>
        <h4 class="text-lg font-extrabold mb-2 underline underline-offset-3 decoration-8 decoration-emerald-400 dark:decoration-blue-600">
          Bet in 2 steps
        </h4>
        <p class="mb-1 text-sm font-normal text-gray-500 ">
          Step 1: Approve LT0 Before betting
        </p>
        <button
          class="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleLT0Approval}
        >
          Approve LT0 spending
        </button>
        <br />

        <p class="mb-1 text-sm font-normal text-gray-500 ">
          Step 2: How many tickets do you want to buy
        </p>
        <input
          class="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="Tickets"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <br />
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleBetting}
        >
          Buy {amount} tickets!
        </button>
      </div>
      <br />
      <div>
        <p>claimPrice</p>
      </div>
      <br />
      <div>
        <p class="text-lg font-extrabold mb-4 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          closeLottery
        </p>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleClose}
        >
          CLOSE Lottery
        </button>
      </div>
      {/* <div>
        <p>withdrawTokens</p>
      </div>
      <div>
        <p>burnTokens</p>
      </div> */}
    </div>
  );
}

export default OpenLotto;
