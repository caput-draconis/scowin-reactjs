// To get all the student vaccination data
export function getStudentsVaccinationMetadata() {
    return fetch("http://127.0.0.1:8000/student-vaccination-metadata").then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

