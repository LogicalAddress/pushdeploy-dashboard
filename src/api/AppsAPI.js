import req from './req.js';

let AppsAPI = {
    fetchApps() {
        return req.get('/v1/apps');
    },
};

export default AppsAPI;