// To get all the student vaccination data
const getURL = require('../environment')
export function getStudentsVaccinationDetails() {
    return fetch(`${getURL()}/student-vaccination`).then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

