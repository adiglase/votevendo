import { Web3 } from 'web3'
import contractABI from '@/abi/main.json'

const web3 = new Web3(window.ethereum)

const contractAddress = '0x021ADDE37C0aDA36C4ee395764a87341e4E3Baf7'
const contractInstance = new web3.eth.Contract(contractABI, contractAddress)

export { web3, contractAddress, contractInstance }
