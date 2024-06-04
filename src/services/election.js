import { contractInstance } from '.'
import { getAccounts } from './account'

async function getElections() {
    const accounts = await getAccounts()
    const elections = await contractInstance.methods.getElections().call({ from: accounts[0] })

    return elections
}

async function createElection({ name, startDate, endDate, candidates, voterList }) {
    const accounts = await getAccounts()

    await contractInstance.methods
        .createElection(name, startDate, endDate, voterList, candidates)
        .send({ from: accounts[0] })
}

export { getElections, createElection }
