// To get details of vaccination drive
const getURL = require('../environment')
export function getVaccinationDriveDetails() {
    return fetch(`${getURL()}/vaccination-drive`).then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

// To add new vaccination drive
export function addVaccinationDrive(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch(`${getURL()}/vaccination-drive`, requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}

// To edit details of vaccination drive
export function editVaccinationDrive(requestBody) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch(`${getURL()}/vaccination-drive/${requestBody.id}`, requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}
