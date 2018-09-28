import * as crypto from 'crypto';
import { ITranslator } from './interfaces';
import { Util } from './util';
class BaiduTranslatorApi implements ITranslator {
  private readonly API_URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate';

  private readonly APP_ID: string;

  private readonly KEY: string;
    constructor(appId: string, key: string) {
        this.APP_ID = appId;
        this.KEY = key;
    }

    /**
     * Translate
     * @param text
     * @param options
     */
    public async Translate(text: string, options?): Promise<string[]> {
        options = Object.assign({ fromLanguage: 'auto', toLanguage: 'auto' }, options);
        if (typeof text !== 'string' || text.trim() === '') {
            return [''];
        }
        const salt = (new Date()).getTime();
        const paramsToCheck = this.APP_ID + text + salt + this.KEY;
        const sign = crypto.createHash('md5').update(paramsToCheck).digest('hex');
        text = encodeURIComponent(text);
        const params = {
            appid: this.APP_ID,
            from: options.fromLanguage,
            q: text,
            salt,
            sign,
            to: options.toLanguage,
        };
        const response = await Util.GetApiResponse(this.API_URL, this.responseParser, params);
        return response.dict;
    }

    private responseParser(response: string) {
        let result = { dict: [''] };
        const responseObj = JSON.parse(response);
        if (responseObj.trans_result && responseObj.trans_result.length > 0) {
            result = { dict: [responseObj.trans_result[0].dst] };
        }
        return result;
    }
}

export { BaiduTranslatorApi };
