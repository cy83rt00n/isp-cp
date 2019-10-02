import axios from "axios";
import IspCpConfig from "./IspCpConfig";

export default class IspCpHelper {
    getUriParams() {
        let params = window.location.search.substr(1).split("&");
        console.log(params);
        let pairs = [];
        params.forEach((param) => {
            pairs.push(param.split("="));
        });
        return pairs;
    }

    callApi = (url,params, callback) => {
        let config = params || {params:axios.defaults.params};
        axios.get(IspCpConfig.ApiRequest(url), config)
            .then(
                response =>  { callback(response) }
            )
    }
}