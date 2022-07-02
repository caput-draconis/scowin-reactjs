module.exports = () => {
    let environment
    switch (process.env.SCOWINENV) {
        case 'prod':
            return `http://3.87.66.79:8000`
        case 'stag':
            environment = '8000'
            break
        default:
            environment = '8000'
    }
    return `http://127.0.0.1:${environment}`
}