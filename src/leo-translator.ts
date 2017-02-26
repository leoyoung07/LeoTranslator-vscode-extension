/**
 * LeoTranslator
 */
import * as crypto from 'crypto';

import * as request from 'request';

class LeoTranslator {
    constructor() {

    }

    private readonly BAIDU_TRANSLATE_API_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

    private readonly APP_ID = "20170225000039853";

    private readonly KEY = "usbSw2CPxPSIwKPDazaZ";

    /**
     * Translate
     */
    public async Translate(text: string, fromLanguage = 'zh', toLanguage = 'en'): Promise<string> {
        let result = '';
        if (typeof text == 'undefined' || text.trim() === '') {
            return result;
        }

        let salt = (new Date()).getTime();
        let paramsToCheck = this.APP_ID + text + salt + this.KEY;
        let sign = crypto.createHash('md5').update(paramsToCheck).digest('hex');
        text = encodeURIComponent(text);
        let params = {
            from: fromLanguage,
            to: toLanguage,
            q: text,
            appid: this.APP_ID,
            salt: salt,
            sign: sign
        };

        let response = await new Promise((resolve: (value: string) => void, reject) => {
            let requestUrl = this.BAIDU_TRANSLATE_API_URL + '?' + this.getHttpBuildQuery(params);
            // let httpRequest = request.defaults({ 'proxy': 'http://127.0.0.1:8888' });
            let httpRequest = request;
            httpRequest.get(requestUrl, function (error, res: request.RequestResponse, body) {
                // console.log('error: ', error);
                // console.log('statusCode: ', response.statusCode);
                // console.log('body: ', body);
                if (!error) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
        return response;
    }

    private getHttpBuildQuery(params): string {
        let httpBuildQuery = "";
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                let value = params[key];
                httpBuildQuery += key + '=' + value + '&';
            }
        }
        httpBuildQuery = httpBuildQuery.substr(0, httpBuildQuery.length - 1);
        return httpBuildQuery;
    }
}

export { LeoTranslator };