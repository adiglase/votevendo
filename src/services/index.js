import { Web3 } from 'web3'
import contractABI from '@/abi/main.json'
import { contractAddress } from '../env'

const web3 = new Web3(window.ethereum)

const contractInstance = new web3.eth.Contract(contractABI, contractAddress)

export { web3, contractInstance }
