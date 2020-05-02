import { combineReducers } from 'redux';
import profile from './ProfileReducer';
import profileDraft from './ProfileDraftReducer';
import user from './UserReducer';
import server from './ServerReducer';
import app from './AppReducer';
import app_setting from './AppSettingReducer';
import loading from './LoaderReducer';
import awsSetupDraft from './AwsSetupDraftReducer';
import linodeSetupDraft from './LinodeSetupDraftReducer';
import customSetupDraft from './CustomSetupDraftReducer';
import appSetupDraft from './AppSetupDraftReducer';
import subscription from './SubscriptionReducer';
import credentials from './CredentialsReducer';
import activeApp from './ActiveApp';
import activeServer from './ActiveServer';
import database from './DatabaseReducer';

const reducers = combineReducers({
  profile,
  profileDraft,
  user,
  app_setting,
  server,
  app,
  loading,
  awsSetupDraft,
  linodeSetupDraft,
  customSetupDraft,
  appSetupDraft,
  subscription,
  credentials,
  activeApp,
  activeServer,
  database,
});

export default reducers;