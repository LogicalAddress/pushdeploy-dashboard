import req from './req.js';

let DatabaseAPI = {
    
    createMysqlDatabase(payload) {
        return req.post('/v1/database/mysql/create_database', payload);
    },
};

export default DatabaseAPI;