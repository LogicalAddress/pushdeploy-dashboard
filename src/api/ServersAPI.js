import req from './req.js';

let ServersAPI = {
    
    fetchServers() {
        return req.get('/v1/servers');
    },
    
    createServer(payload){
        return req.post('/v1/' + payload.provider + '/instances', payload);
    }
};

export default ServersAPI;