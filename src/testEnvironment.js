module.exports = () => {
    let environment
    switch (process.env.SCOWINTESTENV) {
        case 'prod':
            environment = '9090'
            break
        case 'stag':
            environment = '8090'
            break
        default:
            environment = '3000'
    }
    return `http://127.0.0.1:${environment}`
}