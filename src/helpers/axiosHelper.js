import AXIOS from 'axios';
const BASE_HEADERS = "";
let BACKEND_SERVER_PREFIX = "http://10.243.22.169:8081"

class AxiosHelper {
    get(url) {
        url = BACKEND_SERVER_PREFIX + url;
        return AXIOS.get(url)
    }
    post(url, data) {
        url = BACKEND_SERVER_PREFIX + url;
        return AXIOS.post(url, data, { 
            headers: this.getHeaders(false),
            withCredentials: false}
          )
    }
    getHeaders(multipart = false) {
        let defaultHeaders = BASE_HEADERS;
        if (multipart) {
          defaultHeaders = { "Content-Type": "multipart/form-data" };
        }
        return defaultHeaders;
      }
      postFormData(url,data){
        return AXIOS({
          method: "post",
          url,
          data,
          headers:{"Content-Type":"multipart/form-data"}
      })
      }
}
export default AxiosHelper;