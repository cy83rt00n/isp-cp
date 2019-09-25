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
}