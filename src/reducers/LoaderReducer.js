import constants from '../Constants';

const initialState = {
  loading: false
}
 
const Loader = (state = initialState, action) => {
    switch (action.type) {
      case constants.ISWORKING:
        return Object.assign({},initialState,{loading:true});
      case constants.ISDONEWORKING:
        return Object.assign({},initialState,{loading:false});
      default:
        return state;
    }
}
 
export default Loader;