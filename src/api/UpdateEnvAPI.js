import req from './req.js';

let UpdateEnvAPI = {
    
    updateEnv(payload) {
        return req.post('/v1/app/env', payload);
    },
};

export default UpdateEnvAPI;