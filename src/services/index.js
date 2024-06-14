import { Web3 } from 'web3'
import contractABI from '@/abi/main.json'

const web3 = new Web3(window.ethereum)

const contractAddress = '0xE5425Fd7725945cdD338CE045c629Bf6CFF7360A'
const contractInstance = new web3.eth.Contract(contractABI, contractAddress)

export { web3, contractAddress, contractInstance }
