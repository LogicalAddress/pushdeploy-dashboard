// import axios from "axios";
import 'whatwg-fetch'
import constants from '../Constants';

/*
const req = axios.create({
    baseURL: constants.API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
    }
});
*/

let req = {
    
    get(route, baseURL = null) {
        if(!baseURL) baseURL = constants.API_URL;
        var user = sessionStorage.getItem('user');
        user = (user ? JSON.parse(user) : null);
        return fetch(baseURL + route, { /* global fetch */
          credentials: 'same-origin',
          headers: {
                // 'Content-Type': 'application/json', //don't uncomment
                'x-access-token': user ? user.access_token: ""
            },
        })
    },
    
    post(route, payload, baseURL = null) {
        if(!baseURL) baseURL = constants.API_URL;
        var user = sessionStorage.getItem('user');
        user = (user ? JSON.parse(user) : null);
        if(!user) return console.log("Unresponsive Mode");
        return fetch(baseURL + route, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: new Headers({ /*global Headers*/
                "Content-Type": "application/json",
                'X-Access-Token': user.access_token
            }),
        });
    }

}

export default req;