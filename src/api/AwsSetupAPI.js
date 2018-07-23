// import req from './req.js';

let AwsSetupAPI = {
    
    createServer(payload) {
        // console.log(payload)
       return new Promise((resolve, reject)=>{
            throw new Error("Not Implemented - See /react/src/api/ServersAPI.js for details");
        })
        // return req.post('/api/aws/server/create', payload);
    },
};

export default AwsSetupAPI;