// import req from './req.js';

let SubscriptionAPI = {
    
    subscribe(payload) {
        // console.log(payload)
        throw new Error("Not Implemented");
        // return req.post('/plam/create', payload);
    },
    
    changePlan(payload) {
        // console.log(payload)
        throw new Error("Not Implemented");
        // return req.post('/plam/change', payload);
    },
    
    fetchSubscription(){
        throw new Error("Not Implemented");
        // return req.get('/api/subscription');
    }
};

export default SubscriptionAPI;