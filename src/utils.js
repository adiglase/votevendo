function isMetamaskInstalled() {
    if (!window.ethereum) {
        return false
    }
    return true
}

function regularDateTimeToEpoch(regularDateTime) {
    return Math.floor(new Date(regularDateTime) / 1000)
}

function epochDateTimeToRegular(epochDateTime) {
    return new Date(epochDateTime * 1000).toLocaleString()
}

export { isMetamaskInstalled, regularDateTimeToEpoch, epochDateTimeToRegular }
