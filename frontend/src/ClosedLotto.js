import React from "react";
import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import lottery from "./artifacts/Lottery.json";
import token from "./artifacts/LotteryToken.json";

const lotteryAddress = "0xd7Cdc697A44cc19EC02F2F67C77DA76de3B373Fd";
const TokenAddress = "0xB2b22ae8f00476d07C94d200FF934D0DF7996fCF";

// FROM SCRIPT
// async function openBets(duration: string) {
//     const currentBlock = await ethers.provider.getBlock("latest");
//     const tx = await contract.openBets(currentBlock.timestamp + Number(duration));
//     const receipt = await tx.wait();
//     console.log(`Bets opened (${receipt.transactionHash})`);
//   }
//
// FROM SC
// function openBets(uint256 closingTime) public onlyOwner whenBetsClosed {
//     require(
//         closingTime > block.timestamp,
//         "Closing time must be in the future"
//     );
//     betsClosingTime = closingTime;
//     betsOpen = true;
// }
//

function ClosedLotto() {
  const [duration, setDuration] = useState(0);

  async function handleOpenBet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, lottery.abi, signer);
      const currentBlock = await provider.getBlock("latest");
      try {
        const tx = await contract.openBets(
          currentBlock.timestamp + Number(duration)
        );
        const receipt = await tx.wait();
        console.log(`Bets opened (${receipt.transactionHash})`);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  return (
    <div>
      <div>
        <h2>Open a new bet 👇</h2>
        <p>Enter bet duration:</p>
        <input
          type="number"
          placeholder="Duration in seconds"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <p>Set bet to end in {duration} Seconds</p>
        <button onClick={handleOpenBet}>Open new bet</button>
      </div>
    </div>
  );
}

export default ClosedLotto;
