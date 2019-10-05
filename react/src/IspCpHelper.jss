import axios from "axios";
import IspCpConfig from "./IspCpConfig";

class IspCpHelper {
    getUriParams() {
        let params = window.location.search.substr(1).split("&");
        console.log(params);
        let pairs = [];
        params.forEach((param) => {
            pairs.push(param.split("="));
        });
        return pairs;
    }

    callApi = (url,params) => {
        let config = {params:Object.assign(axios.defaults.params,params)};
        return axios.get(IspCpConfig.ApiRequest(url), config);
    }

    debug = (message) => {
        if (window.location.host == 'ctn.onedext.ru') {
            console.log(message);
        }
    }
}

export default new IspCpHelper();