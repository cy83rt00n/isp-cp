class IspCpConfig {
    ApiProtocol = "http";
    ApiHost = "loc.onedext.ru";
    ApiPort = 8080;
    ApiUrlPrefix = "/api";

    constructor(props) {
    }

    ApiRequest(path) {
        return this.ApiProtocol + "://" +
            this.ApiHost +
            (this.ApiPort ? ":" + this.ApiPort : '') +
            this.ApiUrlPrefix +
            path;
    }

    ApiRootRequest(path) {
        if (path.indexOf("?") === -1) {
            return this.ApiRequest(path + "?role=99999999999&passwd=secret")
        } else {
            return this.ApiRequest(path + "&role=99999999999&passwd=secret")
        }
    }
}

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
}

export default new IspCpConfig();

let config = new IspCpConfig();
let helper = new IspCpHelper();

export {config as IspCpConfig};
export {helper as IspCpHelper};