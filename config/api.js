const ENV = "development"; //"production"

const BASE_URLS = {
  development: "http://192.168.0.200:8080",
  production: "",
};

export const API_URL = `${BASE_URLS[ENV]}/api`;
