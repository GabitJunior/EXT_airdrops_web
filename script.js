// Подключаемся к контракту
const contractAddress = "0x3c01b1d509E6A435770FfbC98F69E89F6DC22d7D"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "setNote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;


//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

//Вызываем exec_airdrop() в смарт-контракте
async function exec_airdrop() {
  const addr_list = document.getElementById("addrlist").value;
  const send_token = await contract.setNote(addr_list);
}


