export function getVaccinationDriveDetails() {
    return fetch("http://localhost:3000/vaccineData").then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

export function addVaccinationDrive(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch('http://localhost:3000/vaccineData', requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}

export function editVaccinationDrive(requestBody) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch(`http://localhost:3000/vaccineData/${requestBody.id}`, requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}
