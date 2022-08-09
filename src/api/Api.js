const API = async (url, method=`GET`, obj) => {
	try{
		let options = {
			method: method,
			headers: {
				"Content-type" : "application/json"
			}
		}

		if (obj) options.body = JSON.stringify(obj)

		let request = await fetch(url, options),
			 response = request.json();
			
		return response;
	}
	catch (err) {
		console.log(`In cath ${err}`)
	}
}

export default API;