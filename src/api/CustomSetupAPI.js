// import req from './req.js';

let CustomSetupAPI = {
    
    createServer(payload) {
        return new Promise((resolve, reject)=>{
            throw new Error("Not Implemented - See /react/src/api/ServersAPI.js for details");
        })
        
        // console.log(payload)
        // return req.post('/api/custom/server/create', payload);
    },
};

export default CustomSetupAPI;