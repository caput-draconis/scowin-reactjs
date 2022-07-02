module.exports = () => {
    let environment
    switch (process.env.REACT_APP_ENV) {
        case 'production':
            return `http://107.21.157.147:8000`
        case 'staging':
            environment = '8000'
            break
        default:
            environment = '8000'
    }
    return `http://127.0.0.1:${environment}`
}