function isMetamaskInstalled() {
    if (!window.ethereum) {
        return false
    }
    return true
}

export { isMetamaskInstalled }
