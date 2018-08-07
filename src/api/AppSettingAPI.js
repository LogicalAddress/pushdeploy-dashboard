import req from './req.js';

let AppSettingAPI = {
    
    fetchAppSetting() {
        return req.get('/client_setting');
    },
};

export default AppSettingAPI;