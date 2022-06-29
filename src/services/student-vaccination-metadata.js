// To get all the student vaccination data

import fetch from 'cross-fetch';
const getURL = require('../environment')
export function getStudentsVaccinationMetadata() {
    return fetch(`${getURL()}/student-vaccination-metadata`).then(res => res.json()).then(result => {
        return result;
    }).catch(console.log);
}

