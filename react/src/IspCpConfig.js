
import axios from "axios";

class IspCpConfig {
    ApiProtocol = "http";
    ApiHost = "ctn.onedext.ru";
    ApiPort = 8080;
    ApiUrlPrefix = "/api";
    LoggedIn = false;

    constructor(props) {
        axios.get(this.ApiRequest("/users/login")).then(
            (response) => {
                this.setLoggedIn(response.data);
            });
    }

    setLoggedIn(value)
    {
        this.LoggedIn = value;
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

export default new IspCpConfig();