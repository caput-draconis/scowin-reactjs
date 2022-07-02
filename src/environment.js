module.exports = () => {
    let environment
    console.log("process env => ", process.env)
    switch (process.env.REACT_APP_ENV) {
        case 'production':
            return `http://3.87.66.79:8000`
        case 'staging':
            environment = '8000'
            break
        default:
            environment = '8000'
    }
    return `http://127.0.0.1:${environment}`
}