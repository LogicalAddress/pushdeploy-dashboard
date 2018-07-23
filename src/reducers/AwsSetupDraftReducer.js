
import constants from '../Constants';

let initialState = {
  template: 'nodejs',
  template_variation: 'v8.9.3',
  app_repository: '',
  provider: 'aws',
  accessKeyId: null,
  secretAccessKey: null,
  ImageId: "ami-0def3275",
  region: "us-west-2",
  InstanceType: "t2.micro",
  volumeSize: 8,
};

const initialAction = { type: 'initial state'}

const AwsSetupDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_AWS_SETUP_DRAFT:
      return {...state, ...action.payload}
    case constants.FETCH_USER_CREDENTIALS_SUCCESS:
      //We are restricted to one connected AWS Account. Ask me why?
      var credentials = action.payload.response.body.data;
      if(credentials.aws_secret_key && credentials.aws_access_key){
        return {...state, ...{accessKeyId: credentials.aws_access_key, 
          secretAccessKey: credentials.aws_secret_key}}
      }
      return state;
    default:
      return state;
  }
}

export default AwsSetupDraft;