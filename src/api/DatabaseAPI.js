import req from './req.js';

let DatabaseAPI = {
    
    createDatabase(payload) {
        return req.post('/v1/database', payload);
    },
    
    fetchDatbases(payload) {
        return req.get('/v1/database/' + payload);
    }
};

export default DatabaseAPI;