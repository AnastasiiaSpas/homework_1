import API from './../api/Api';

const JsonPlaceholder = (path, method=`GET`, obj) => API(`https://jsonplaceholder.typicode.com/${path}`,method, obj)


export default JsonPlaceholder;