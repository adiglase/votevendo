import { Web3 } from 'web3'
import contractABI from '@/abi/main.json'

const web3 = new Web3(window.ethereum)

const contractAddress = '0x599D028C0c2f1DBcD5eA2a4895Bcbb9f84Ba7a72'
const contractInstance = new web3.eth.Contract(contractABI, contractAddress)

export { web3, contractAddress, contractInstance }
