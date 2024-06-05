import { Web3 } from 'web3'
import contractABI from '@/abi/main.json'

const web3 = new Web3(window.ethereum)

const contractAddress = '0x7aa99654d3F06c540d69833701a1A6CF229052DD'
const contractInstance = new web3.eth.Contract(contractABI, contractAddress)

export { web3, contractAddress, contractInstance }
