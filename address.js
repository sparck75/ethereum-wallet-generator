let todayCnt = 0;
const fs = require("fs");
const ethers = require("ethers");
const crypto = require("crypto");
const generate = () => {
  let id = crypto.randomBytes(32).toString("hex");
  let privateKey = "0x" + id;
  console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

  let wallet = new ethers.Wallet(privateKey);
  console.log("Address: " + wallet.address);
  const keyObj = {}
  keyObj.privateKey = privateKey
  keyObj.publicKey = wallet.address
  fs.appendFile('walletCollection.txt', JSON.stringify(keyObj) + "\n", (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
})
  balanceCheck(wallet.address);
};

const balanceCheck = async (address) => {
  const Web3 = require("web3");

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/c2a270f132de404daadfa050951c3bd4"
    )
  );

  await web3.eth.getBalance(address, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (web3.utils.fromWei(result, "ether") > 0) {
        console.log(web3.utils.fromWei(result, "ether") + " ETH");
      } else {
        todayCnt++;
        console.log("today Generate Count : ", todayCnt);
        generate();
      }
    }
  });
};

generate();
