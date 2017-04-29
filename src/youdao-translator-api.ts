import { IResult, ITranslator } from './interfaces';
import { Util } from './util';

/**
 * YoudaoTranslatorApi
 */
class YoudaoTranslatorApi implements ITranslator {
    private readonly KEY: string;
    private readonly KEY_FROM: string;
    private readonly API_URL = 'http://fanyi.youdao.com/openapi.do';

    public async Translate(text: string, options?): Promise<string[]> {
        options = Object.assign({
            type: 'data',
            doctype: 'json',
            version: '1.1'
        }, options);
        if (typeof text != 'string' || text.trim() == '') {
            return [''];
        }
        let params = {
            type: options.type,
            doctype: options.doctype,
            version: options.version,
            key: this.KEY,
            keyfrom: this.KEY_FROM,
            q: encodeURIComponent(text)
        };
        let response = await Util.GetApiResponse(this.API_URL, this.responseParser, params);
        let translations: string[] = [];
        response.dict.forEach((item) => {
            translations.push(item);
        });
        response.web.forEach((item) => {
            let key = item.key;
            item.value.forEach(v => {
                translations.push(`${v}[${key}]`);
            });
        });
        return translations;
    }

    private responseParser(response: string) {
        let result = { dict: [''] };
        let responseObj = JSON.parse(response);
        if (responseObj.errorCode !== 0) {
            console.log('error: ' + responseObj.errorCode);
            return result;
        }
        if (responseObj.web) {
            result['web'] = responseObj.web;
            result.dict = result['web'][0]['value'];
        }
        if(responseObj.translation) {
            result.dict = responseObj.translation;
        }
        return result;
    }

    constructor(key: string, keyFrom: string) {
        this.KEY = key;
        this.KEY_FROM = keyFrom;
    }
}

export { YoudaoTranslatorApi };