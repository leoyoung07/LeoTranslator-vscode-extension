import { IResult, ITranslator } from './interfaces';
import * as request from 'request';

/**
 * YoudaoTranslatorApi
 */
class YoudaoTranslatorApi implements ITranslator {
    private readonly KEY: string;
    private readonly KEY_FROM: string;

    public async Translate(text: string, options?): Promise<IResult> {
        if (!text) {
            return { dict: [''] };
        }

    }

    constructor(key: string, keyFrom: string) {
        this.KEY = key;
        this.KEY_FROM = keyFrom;
    }
}