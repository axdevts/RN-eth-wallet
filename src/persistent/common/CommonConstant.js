export const RequestConstant = (request, result) => {
	return {
		type: request,
		data: result,
	};
};

export const ResponseConstant = (success, error, result) => {

	return {
		type: result.success === true ? success : error,
		data: result.data === undefined ? {} : result.data,
	};
};
