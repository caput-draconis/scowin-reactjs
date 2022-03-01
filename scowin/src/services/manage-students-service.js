// To get all the student details
export function getStudentsDetails() {
    return fetch("http://127.0.0.1:8000/students").then(res => res.json()).then(result => {
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
    return fetch('http://127.0.0.1:8000/students', requestOptions)
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
    return fetch(`http://127.0.0.1:8000/students/${requestBody.id}`, requestOptions)
        .then(response => response.json())
        .then(data => data).catch(console.log);
}
