const environment = process.env.REACT_APP_ENV_TYPE;

let apiEndpoint = '';

switch (environment) {
  case 'local':
    apiEndpoint = 'http://localhost:8081';
    break;
  case 'development':
    apiEndpoint = 'https://api-luisgpt.onrender.com';
    break;
  case 'staging':
    apiEndpoint = 'https://api-luisgpt.onrender.com';
    break;
  case 'production':
    apiEndpoint = 'https://api-luisgpt.onrender.com';
    break;
  default:
    apiEndpoint = 'https://api-luisgpt.onrender.com';
    break;
}

console.log("               ");
console.log("               ");
console.log("***************");
console.log("###############");
console.log("API Luis GPT");
console.log(apiEndpoint);
console.log("###############");
console.log("***************");
console.log("               ");
console.log("               ");

export default apiEndpoint;