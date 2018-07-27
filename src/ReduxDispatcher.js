import 'babel-polyfill';
import constants from './Constants';

/**
 * This does the async request and provides Redux thunk feedback 
 */
export function dispatchAsync(fn, dispatch, types, payload, blocking = true) {
	// return new Promise((resolve, reject) => {
		const { request, success, failure } = types;
		
		dispatch({
			type: request,
			payload: Object.assign({}, payload)
		});
	
		if(blocking && dispatch({ type: constants.ISWORKING }));
		
		fn(payload).then( (response) => {
			return response.json();
		}).then((response)=>{
			if(response.body){
				dispatch({
					type: success,
					success: true,
					payload: Object.assign({}, payload, {
						response
					})
				});
				if(blocking && dispatch({ type: constants.ISDONEWORKING }));
				// resolve(response);
				return;
			}else if(response.status && response.status === 'failure'){
				// throw new Error(response.message);
				dispatch({
					type: failure,
					success: false,
					payload: Object.assign({}, payload, {
						error: response.message
					})
				});
				if(blocking && dispatch({ type: constants.ISDONEWORKING }));
				// reject(response.message);
			}else{
				dispatch({
					type: failure,
					success: false,
					payload: Object.assign({}, payload, {
						error: "An unknown error occured"
					})
				});
				if(blocking && dispatch({ type: constants.ISDONEWORKING }));
				// reject("An unknown error occured");
			}
		})
		.catch( (error) => {
			console.log(error);
			dispatch({
				type: failure,
				success: false,
				payload: Object.assign({}, payload, {
					error: "An undefind error occured"
				})
			});
			if(blocking && dispatch({ type: constants.ISDONEWORKING }));
			// reject(error);
			return;
		});
	// });
};