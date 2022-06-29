// To get all the student details

const getURL = require('../environment')

export function getStudentsDetails() {
    return fetch(`${getURL()}/students`).then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

// To add new students
export function addStudent(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch(`${getURL()}/students`, requestOptions)
        .then(response => {
            if (!response.ok && response.status===400) {
                return Promise.reject("Duplicate ID error");
            }
            return response.json();
        })
        .then(data => data);
}

// To edit details of existing students
export function editStudentDetails(requestBody) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    return fetch(`${getURL()}/students/${requestBody.id}`, requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}
