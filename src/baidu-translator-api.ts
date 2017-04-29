import { ITranslator, IResult } from './interfaces';
import * as crypto from 'crypto';
import { Util } from './util';
class BaiduTranslatorApi implements ITranslator {
    constructor(appId: string, key: string) {
        this.APP_ID = appId;
        this.KEY = key;
    }

    private readonly API_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

    private readonly APP_ID: string;

    private readonly KEY: string;

    /**
     * Translate
     * @param text 
     * @param options 
     */
    public async Translate(text: string, options?): Promise<string[]> {
        options = Object.assign({ fromLanguage: 'auto', toLanguage: 'auto' }, options);
        if (typeof text != 'string' || text.trim() == '') {
            return [''];
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
        let response = await Util.GetApiResponse(this.API_URL, this.responseParser, params);
        return response.dict;
    }

    private responseParser(response: string) {
        let result = { dict: [''] };
        let responseObj = JSON.parse(response);
        if (responseObj['trans_result'] && responseObj['trans_result'].length > 0) {
            result = { dict: [responseObj['trans_result'][0]['dst']] };
        }
        return result;
    }
}

export { BaiduTranslatorApi };