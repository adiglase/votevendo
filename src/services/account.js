import { web3 } from '.'

function getAccounts() {
    return web3.eth.getAccounts()
}

function requestAccounts() {
    return web3.eth.requestAccounts()
}

export { getAccounts, requestAccounts }
