module.exports = () => {
    let environment
    switch (process.env.SCOWINENV) {
        case 'prod':
            environment = '8000'
            break
        case 'stag':
            environment = '8000'
            break
        default:
            environment = '8000'
    }
    return `http://127.0.0.1:${environment}`
}