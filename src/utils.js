import Web3 from 'web3'

const web3 = new Web3(window.ethereum)

function isMetamaskInstalled() {
    if (!window.ethereum) {
        return false
    }
    return true
}

function getAccounts() {
    return web3.eth.getAccounts()
}

function requestAccounts() {
    return web3.eth.requestAccounts()
}

export { web3, isMetamaskInstalled, getAccounts, requestAccounts }
