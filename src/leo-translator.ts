/**
 * LeoTranslator
 */
import { ITranslator } from './interfaces';

/**
 * LeoTranslator
 */
class LeoTranslator {
  constructor(private translatorApi: ITranslator) {
  }

  public async Translate(text: string, options?) {
    return this.translatorApi.Translate(text, options);
  }
}

export { LeoTranslator };
