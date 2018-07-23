import constants from '../Constants';

const initialState = {
	"uid": "",
	"linode_token": "",
	"digitalocean_token": "",
	"bitbucket_token": "",
	"bitbucket_username": "",
	"github_token": "",
	"github_username": "",
	"aws_secret_key": "",
	"aws_access_key": "",
	"aws_KeyFingerprint": "",
	"aws_KeyMaterial": "",
	"aws_key_name": "",
	"aws_SecurityGroupId": "",
	"custom_private_key": "",
	"custom_public_key": "",
	"created_at": "",
	"updated_at": ""
};
 
const credentials = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_USER_CREDENTIALS_SUCCESS:
        return {...state, ...action.payload.response.body.data}
      case constants.FETCH_USER_CREDENTIALS_ERROR:
        return state
      default:
        return state;
    }
}
 
export default credentials;