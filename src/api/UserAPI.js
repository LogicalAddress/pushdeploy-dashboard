import req from './req.js';

let UserAPI = {
    
    fetchUser() {
        return req.get('/v1/user');
    },
};

export default UserAPI;