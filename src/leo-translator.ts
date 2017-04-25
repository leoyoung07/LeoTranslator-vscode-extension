/**
 * LeoTranslator
 */
import {ITranslator, IResult} from './interfaces';

/**
 * LeoTranslator
 */
class LeoTranslator {
    private _translatorApi: ITranslator;
    constructor(translatorApi: ITranslator) {
        this._translatorApi = translatorApi;
    }

    public async Translate(text: string, options?) {
        return this._translatorApi.Translate(text, options);
    }
}

export { LeoTranslator };