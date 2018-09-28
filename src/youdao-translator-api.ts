import { ITranslator } from './interfaces';
import { Util } from './util';

/**
 * YoudaoTranslatorApi
 */
class YoudaoTranslatorApi implements ITranslator {
  private readonly KEY: string;
  private readonly KEY_FROM: string;
  private readonly API_URL = 'http://fanyi.youdao.com/openapi.do';

  constructor(key: string, keyFrom: string) {
    this.KEY = key;
    this.KEY_FROM = keyFrom;
  }

  public async Translate(text: string, options?): Promise<string[]> {
    options = Object.assign(
      {
        doctype: 'json',
        type: 'data',
        version: '1.1'
      },
      options
    );
    if (typeof text !== 'string' || text.trim() === '') {
      return [''];
    }
    const params = {
      doctype: options.doctype,
      key: this.KEY,
      keyfrom: this.KEY_FROM,
      q: encodeURIComponent(text),
      type: options.type,
      version: options.version
    };
    const response = await Util.GetApiResponse(
      this.API_URL,
      this.responseParser,
      params
    );
    const translations: string[] = [];
    if (response.dict) {
      response.dict.forEach((item) => {
        translations.push(item);
      });
    }
    if (response.web) {
      response.web.forEach((item) => {
        const key = item.key;
        item.value.forEach((v) => {
          translations.push(`${v}[${key}]`);
        });
      });
    }
    return translations;
  }

  private responseParser(response: string) {
    const result = { dict: [''] };
    const responseObj = JSON.parse(response);
    if (responseObj.errorCode !== 0) {
      // tslint:disable-next-line:no-console
      console.log('error: ' + responseObj.errorCode);
      return result;
    }
    if (responseObj.web) {
      result['web'] = responseObj.web;
      result.dict = result['web'][0]['value'];
    }
    if (responseObj.translation) {
      result.dict = responseObj.translation;
    }
    return result;
  }
}

export { YoudaoTranslatorApi };
