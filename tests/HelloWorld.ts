// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Ballot } from "../typechain-types";

// describe("Hello World", async () => {
//   let helloWorldContract: Ballot;
//   let signers: SignerWithAddress[];

//   beforeEach(async () => {
//     signers = await ethers.getSigners();
//     const contractDeployer = signers[0].address;
//     const helloWorldFactory = await ethers.getContractFactory("HelloWorld");

//     const helloWorldContract = await helloWorldFactory.deploy();
//     await helloWorldContract.deployed();
//   });

//   it("Should set owner to deployer account", async () => {
//     const signers = await ethers.getSigners();
//     const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
//     const helloWorldContract = await helloWorldFactory.deploy();
//     await helloWorldContract.deployed();
//     const owner = await helloWorldContract.owner();
//     const contractDeployer = signers[0].address;
//     expect(owner).to.equal(contractDeployer);
//   });

//   it("Should change the text", async () => {
//     const newText = "New Text";
//     const contractDeployer = signers[0].address;
//     const tx = await helloWorldContract.votePower(contractDeployer);
//     // await tx.wait();
//     const text = await helloWorldContract.winnerName();
//     expect(text).to.equal(newText);
//   });
// });
