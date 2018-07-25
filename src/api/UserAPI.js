import req from './req.js';

let UserAPI = {
    
    fetchUser() {
        return req.get('/v1/user');
    },
    
    login(payload) {
        return req.post('/v1/user/login', payload);
    },
    
    register(payload) {
        return req.post('/v1/user/register', payload);
    },
};

export default UserAPI;