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
        var access_token = user ? user.access_token : '';
        return fetch(baseURL + route, { /* global fetch */
          method: 'GET',
          headers: new Headers({ /*global Headers*/
                "Content-Type": "application/json",
                'X-Access-Token': access_token
            }),
        })
    },
    
    post(route, payload, baseURL = null) {
        if(!baseURL) baseURL = constants.API_URL;
        var user = sessionStorage.getItem('user');
        user = (user ? JSON.parse(user) : null);
        var access_token = user ? user.access_token : '';
        return fetch(baseURL + route, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: new Headers({ /*global Headers*/
                "Content-Type": "application/json",
                'X-Access-Token': access_token
            }),
        });
    }
}

export default req;