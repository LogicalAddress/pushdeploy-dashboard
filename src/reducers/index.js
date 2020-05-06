import { combineReducers } from 'redux';
import profile from './ProfileReducer';
import profileDraft from './ProfileDraftReducer';
import user from './UserReducer';
import server from './ServerReducer';
import servers from './ServersReducer';
import app from './AppReducer';
import apps from './AppsReducer';
import app_setting from './AppSettingReducer';
import loading from './LoaderReducer';
import awsSetupDraft from './AwsSetupDraftReducer';
import linodeSetupDraft from './LinodeSetupDraftReducer';
import customSetupDraft from './CustomSetupDraftReducer';
import subscription from './SubscriptionReducer';
import credentials from './CredentialsReducer';
import database from './DatabaseReducer';

const reducers = combineReducers({
  profile,
  profileDraft,
  user,
  app_setting,
  server,
  servers,
  app,
  apps,
  loading,
  awsSetupDraft,
  linodeSetupDraft,
  customSetupDraft,
  subscription,
  credentials,
  database,
});

export default reducers;