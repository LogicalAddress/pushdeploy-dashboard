export default {
  API_URL: process.env.REACT_APP_API_URL || "https://api.pushdeploy.io",
  DASHBOARD_URL: process.env.REACT_APP_DASHBOARD_URL || "https://dashboard.pushdeploy.io",

  FETCH_PROFILE: 'fetch profile',
  FETCH_PROFILE_SUCCESS: 'fetch profile success',
  FETCH_PROFILE_ERROR: 'fetch profile error',
  
  SET_LOGGEDIN_USER: 'set logged in user',
  
  LOGIN_USER: 'login user',
  LOGIN_USER_SUCCESS: 'login user success',
  LOGIN_USER_ERROR: 'login user error',
  
  DATABASE_UPDATE_DRAFT: 'update the mysql create wizard',
  CREATE_DATABASE: 'create a mysql database with the default user',
  CREATE_DATABASE_SUCCESS: 'create mysql database success',
  CREATE_DATABASE_ERROR: 'create mysql database failed',
  DATABASE_APPEND_DATABASE: 'append database object to database set',
  FETCH_DATABASE: 'fetch all database existing in a server',
  FETCH_DATABASE_SUCCESS: 'fetch database existing in a server success',
  FETCH_DATABASE_ERROR: 'fetch database existing in a server error',
  
  
  REGISTER_USER: 'register user',
  REGISTER_USER_SUCCESS: 'register user success',
  REGISTER_USER_ERROR: 'register user error',
  
  FETCH_SERVERS: 'fetch servers',
  FETCH_SERVERS_SUCCESS: 'fetch servers success',
  FETCH_SERVERS_ERROR: 'fetch servers error',

  FETCH_SERVER: 'fetch server',
  FETCH_SERVER_SUCCESS: 'fetch server success',
  FETCH_SERVER_ERROR: 'fetch server error',

  FETCH_APP_SETTING: 'fetch app setting',
  FETCH_APP_SETTING_SUCCESS: 'fetch app setting success',
  FETCH_APP_SETTING_ERROR: 'fetch app setting error',
  
  
  UPDATE_PROFILE_DRAFT: 'update profile draft',
  UPDATE_PROFILE: 'update profile',
  
  ISWORKING: "A blocking request is in progress",
  ISDONEWORKING: "A blocking request did finish",
  
  UPDATE_AWS_SETUP_DRAFT: "update the aws setup draft",
  UPDATE_LINODE_SETUP_DRAFT: "update the linode setup draft",
  UPDATE_CUSTOM_SETUP_DRAFT: "update the custom setup draft",
  
  CREATE_PROJECT: "create Function",
  // CREATE_CUSTOM_SERVER_RUNNING: "creating custom server is in progress",
  // CREATE_CUSTOM_SERVER_ERROR: "error creating custom server",
  // UPDATE_CUSTOM_SETUP_DRAFT: "update the custom setup draft",
  
  CONNECT_LINODE_OAUTH: "connect linode oauth",
  
  CREATE_APP: "create Any App",
  CREATE_APP_RUNNING: "creating app on the selected server is in progress",
  CREATE_APP_ERROR: "error creating app on selected server",
  UPDATE_APP_SETUP_DRAFT: "update the app setup draft",

  FETCH_APPS: 'fetch apps',
  FETCH_APPS_SUCCESS: 'fetch apps success',
  FETCH_APPS_ERROR: 'fetch apps error',
  

  FETCH_APP: 'fetch app',
  FETCH_APP_SUCCESS: 'fetch app success',
  FETCH_APP_ERROR: 'fetch app error',
  
  SUBSCRIBE_PLAN: 'subscribe user to the selected plan',
  SUBSCRIBE_PLAN_SUCCESS: 'subscribe user to plan success',
  SUBSCRIBE_PLAN_ERROR: 'subscribe user to plan error',
  
  CHANGE_PLAN: 'change user plan',
  CHANGE_PLAN_SUCCESS: 'change plan for user success',
  CHANGE_PLAN_ERROR: 'change user plan error',
  
  CREATE_SERVER: 'create any server',
  CREATE_SERVER_RUNNING: 'creating server on the selected provider is in progress',
  CREATE_SERVER_ERROR: 'error creating server on selected provider',
  CREATE_SERVER_FINISHED: 'finished creating server',
  
  FETCH_USER_CREDENTIALS: 'fetch all users oauth2 credentials',
  FETCH_USER_CREDENTIALS_SUCCESS: 'fetch all users oauth2 credentials success',
  FETCH_USER_CREDENTIALS_ERROR: 'fetch all users oauth2 credentials failure',
  
  FETCH_SUBSCRIPTION: 'fetch current subscription if available',
  FETCH_SUBSCRIPTION_SUCCESS: 'fetching subscription is successful',
  FETCH_SUBSCRIPTION_ERROR: 'fetching subscription failed',
  
  UPDATE_PLAN: 'update plan on the ui',
  
  UPDATE_ENV: 'update app\'s environment variables',
  UPDATE_ENV_SUCCESS: 'update env successful',
  UPDATE_ENV_ERROR: 'updating env failed',
  
  UPDATE_APP_FIELD: "update a field in app",
  
  TOGGLE_AUTO_DEPLOY: 'to toggle auto deploy for authenticated accounts',
  TOGGLE_AUTO_DEPLOY_SUCCESS: 'toggling auto deploy succeed',
  TOGGLE_AUTO_DEPLOY_ERROR: 'toggling auto deploy failed',

  DELETE_SERVER: 'delete server',
  DELETE_SERVER_SUCCESS: 'delete server success',
  DELETE_SERVER_ERROR: 'delete server failed',

  DELETE_APP: 'delete app',
  DELETE_APP_SUCCESS: 'delete app success',
  DELETE_APP_ERROR: 'delete app failed',

  CREATE_DNS_ZONE: 'CREATE_DNS_ZONE',
  CREATE_DNS_ZONE_SUCCESS: 'CREATE_DNS_ZONE_SUCCESS',
  CREATE_DNS_ZONE_ERROR: 'CREATE_DNS_ZONE_ERROR',

  FETCH_DNS_ZONES: 'FETCH_DNS_ZONES',
  FETCH_DNS_ZONES_SUCCESS: 'FETCH_DNS_ZONES_SUCCESS',
  FETCH_DNS_ZONES_ERROR: 'FETCH_DNS_ZONES_ERROR',

  CREATE_DNS_RECORD: 'CREATE_DNS_RECORD',
  CREATE_DNS_RECORD_SUCCESS: 'CREATE_DNS_RECORD_SUCCESS',
  CREATE_DNS_RECORD_ERROR: 'CREATE_DNS_RECORD_ERROR',

  FETCH_DNS_RECORDS: 'FETCH_DNS_RECORDS',
  FETCH_DNS_RECORDS_SUCCESS: 'FETCH_DNS_RECORDS_SUCCESS',
  FETCH_DNS_RECORDS_ERROR: 'FETCH_DNS_RECORDS_ERROR',

  DELETE_DNS_ZONE: 'DELETE_DNS_ZONE',
  DELETE_DNS_ZONE_SUCCESS: 'DELETE_DNS_ZONE_SUCCESS',
  DELETE_DNS_ZONE_ERROR: 'DELETE_DNS_ZONE_ERROR',

  DELETE_DNS_RECORD: 'DELETE_DNS_RECORD',
  DELETE_DNS_RECORD_SUCCESS: 'DELETE_DNS_RECORD_SUCCESS',
  DELETE_DNS_RECORD_ERROR: 'DELETE_DNS_RECORD_ERROR',

  CREATE_DNS_ZONE_RECORD: 'CREATE_DNS_ZONE_RECORD',
  CREATE_DNS_ZONE_RECORD_SUCCESS: 'CREATE_DNS_ZONE_RECORD_SUCCESS',
  CREATE_DNS_ZONE_RECORD_ERROR: 'CREATE_DNS_ZONE_RECORD_ERROR',

  FETCH_DNS_ZONE: 'FETCH_DNS_ZONE',
  FETCH_DNS_ZONE_SUCCESS: 'FETCH_DNS_ZONE_SUCCESS',
  FETCH_DNS_ZONE_ERROR: 'FETCH_DNS_ZONE_ERROR',

  FETCH_DNS_PASS_FLAG: 'FETCH_DNS_PASS_FLAG',
  FETCH_DNS_PASS_FLAG_SUCCESS: 'FETCH_DNS_PASS_FLAG_SUCCESS',
  FETCH_DNS_PASS_FLAG_ERROR: 'FETCH_DNS_PASS_FLAG_ERROR'
  
};