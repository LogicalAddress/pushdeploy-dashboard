import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileAction from '../../actions/ProfileAction.js';

class Profile extends React.Component {
    
    render() {
      return (
         <div>
            <div className="white panel">
                <div className="row">
                    <div className="column">
                       <h3>Update Profile</h3>
                    </div>
                </div>
                <div className="row upspace">
                    <div className="column">
                       <form className="credit_card">
                          <div className="form-group">
                            <label htmlFor="currencyField">Preferred Currency</label>
                            <select disabled type="text" id="currencyField" value={this.props.profile.currency}>
                                <option value="NGN">NGN</option>
                                <option value="USD">USD</option>
                            </select>
                          </div>
                            <div className="row">
                                <div className="column">
                                    <button disabled className="button" onClick={ () => console.log("Not Implemented Yet") }>Update Profile</button>
                                </div>
                            </div>
                       </form>
                    </div>
                </div>
            </div>
         </div>
      )
   }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileDraft: PropTypes.object,
  updateProfileDraft: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
}

const mapStoreToProps = (storeState) => (
    {
        profile: storeState.profile,
        profileDraft: storeState.profileDraft,
    }
)
    
const mapDispatchToProps = (dispatch) => (
      {
        updateProfileDraft: (field, value) => dispatch(ProfileAction.updateProfileDraft(field, value)),
        updateProfile: (profile, profileDraft) => dispatch(ProfileAction.updateProfile(profile, profileDraft)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Profile)