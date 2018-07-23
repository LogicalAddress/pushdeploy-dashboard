import req from './req.js';

let CredentialsAPI = {
    
    fetchCredentials() {
        return req.get('/v1/user/credentials');
    },
};

export default CredentialsAPI;