// To get all the student vaccination data
export function getStudentsVaccinationDetails() {
    return fetch("http://127.0.0.1:8000/student-vaccination").then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

