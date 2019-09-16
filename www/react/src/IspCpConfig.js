export default new class IspCpConfig {
    ApiProtocol = "http";
    ApiHost = "localhost";
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
        if (path.indexOf("?") == -1) {
            return this.ApiRequest(path + "?role=99999999999&passwd=secret")
        } else {
            return this.ApiRequest(path + "&role=99999999999&passwd=secret")
        }
    }
}

export class IspCpHelper {
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
