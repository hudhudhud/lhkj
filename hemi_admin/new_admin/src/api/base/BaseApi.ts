export default class BaseApi {

    /**
     * 替换PathVariable
     */
    public replacePathVariable(url: string, param: any): string {
        for (const x in param) {
            if (url.indexOf(`{${x}}`) > -1) {
                url = url.replace(`{${x}}`, param[x]);
                delete param[x];
            }
        }
        return url;
    }

    /**
     * 替换queryString
     */
    public fixQueryString(url: string, param: any): string {
        for (const x in param) {
            if (url.indexOf("?") > -1) {
                url = url + "&" + x + "=" + param[x];
            } else {
                url = url + "?" + x + "=" + param[x];
            }
        }
        return url;
    }

}
