import req from './req.js';

let AppSetupAPI = {
    
    createApp(payload) {
        return req.post('/v1/app/create', payload);
    },
    
    toggleAutoDeploy(payload) {
        return req.post('/v1/app/toggle_auto_deploy', payload);
    }
};

export default AppSetupAPI;