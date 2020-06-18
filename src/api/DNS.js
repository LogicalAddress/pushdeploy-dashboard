import req from './req.js';

let DNS = {
    
    createDNSZone(payload) {
        return req.post('/v1/dns/zone', payload);
    },
    
    fetchDNSZones() {
        return req.get('/v1/dns/zone');
    },

    fetchZone(payload) {
        return req.get(`/v1/dns/zone/${payload}`);
    },

    getDNSPassFlag(){
        return req.get('/v1/dnspassflag');
    },

    deleteDNSZone(payload) {
        return req.del(`/v1/dns/zone/${payload}`);
    },

    createDNSRecord(payload) {
        return req.post(`/v1/dns/record`, payload);
    },
    
    fetchDNSRecords(payload) {
        return req.get(`/v1/dns/record/${payload}`);
    },

    deleteDNSRecord(payload) {
        return req.del(`/v1/dns/record/${payload}`);
    },

    createZoneAndARecord(payload) {
        return req.post(`/v1/dns/zonerecord`, payload);
    }
};

export default DNS;