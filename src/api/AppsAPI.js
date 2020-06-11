import req from './req.js';

let AppsAPI = {
    fetchApps() {
        return req.get('/v1/apps');
    },

    fetchApp(param){
        return req.get('/v1/apps/' + param)
    },

    deleteApp(payload){
        return req.del('/v1/apps/' + payload);
    }
};

export default AppsAPI;