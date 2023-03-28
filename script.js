// Подключаемся к контракту
const contractAddress = "0x951749368582c91cfa73ad7c3fa7fca08a43e426"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_airAddress",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amount",
				"type": "uint256[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
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


