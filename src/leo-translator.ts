/**
 * LeoTranslator
 */
import * as crypto from 'crypto';

import * as request from 'request';

class LeoTranslator implements ITranslator {
    constructor(appId: string, key: string) {
        this.APP_ID = appId;
        this.KEY = key;
    }

    private readonly BAIDU_TRANSLATE_API_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

    private APP_ID: string;

    private KEY: string;

    /**
     * Translate
     */
    public async Translate(text: string, options = { fromLanguage: 'auto', toLanguage: 'auto' }): Promise<IResult> {
        let result = { dict: [''] };
        if (typeof text == 'undefined' || text.trim() === '') {
            return result;
        }

        let salt = (new Date()).getTime();
        let paramsToCheck = this.APP_ID + text + salt + this.KEY;
        let sign = crypto.createHash('md5').update(paramsToCheck).digest('hex');
        text = encodeURIComponent(text);
        let params = {
            from: options.fromLanguage,
            to: options.toLanguage,
            q: text,
            appid: this.APP_ID,
            salt: salt,
            sign: sign
        };

        let response = await new Promise((resolve: (value: IResult) => void, reject) => {
            let requestUrl = this.BAIDU_TRANSLATE_API_URL + '?' + this.getHttpBuildQuery(params);
            // let httpRequest = request.defaults({ 'proxy': 'http://127.0.0.1:8888' });
            let httpRequest = request;
            httpRequest.get(requestUrl, function (error, res: request.RequestResponse, body) {
                // console.log('error: ', error);
                // console.log('statusCode: ', response.statusCode);
                // console.log('body: ', body);
                if (!error) {
                    let responseObj = JSON.parse(body);
                    if (responseObj['trans_result'] && responseObj['trans_result'].length > 0) {
                        resolve({ dict: [responseObj['trans_result'][0]['dst']]})
                    } else {
                        resolve({ dict: [''] });
                    }
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

    //TODO add parse response method
}

interface ITranslator {
    Translate(text: string, options?: Object): Promise<IResult>;
}

interface IResult {
    dict: string[];

    web?: string[];
}

export { LeoTranslator, IResult };