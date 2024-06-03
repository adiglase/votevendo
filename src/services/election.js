import { contractInstance } from '.'
import { getAccounts } from './account'

async function getElections() {
    const accounts = await getAccounts()
    const elections = await contractInstance.methods.getElections().call({ from: accounts[0] })

    return elections
}

export { getElections }
