import 'babel-polyfill';
import constants from './Constants';

/**
 * This does the async request and provides Redux thunk feedback 
 */
export function dispatchAsync(fn, dispatch, types, payload, blocking = true) {

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
			return;
		}
		throw new Error("Unexpected response returned from the server");
	})
	.catch( (error) => {
		console.log("DEBUG", error);
		dispatch({
			type: failure,
			success: false,
			payload: Object.assign({}, payload, {
				error
			})
		});
		if(blocking && dispatch({ type: constants.ISDONEWORKING }));
		
	});
	
};