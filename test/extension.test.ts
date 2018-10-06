//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import assert from 'assert';

import { BaiduTranslatorApi } from '../src/baidu-translator-api';
import { Config } from '../src/config';
import { LeoTranslator } from '../src/leo-translator';
import { YoudaoTranslatorApi } from '../src/youdao-translator-api';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
  let leoTranslator = new LeoTranslator(new BaiduTranslatorApi(Config.BaiduApi.APP_ID, Config.BaiduApi.KEY));
  tests(leoTranslator, 'Baidu API');
  leoTranslator = new LeoTranslator(new YoudaoTranslatorApi(Config.YoudaoApi.KEY, Config.YoudaoApi.KEY_FROM));
  tests(leoTranslator, 'Youdao API');
});

function tests(leoTranslator: LeoTranslator, apiName: string) {
  // Defines a Mocha unit test
  test(`${apiName}: translate to English`, async () => {
    const value = await leoTranslator.Translate('苹果');
    assert.equal('apple', value[0].toLowerCase());
  });

  test(`${apiName}: translate to Chinese`, async () => {
    const value = await leoTranslator.Translate('apple');
    assert.equal('苹果', value[0]);
  });

  test(`${apiName}: empty input`, async () => {
    const test = undefined;
    let value = await leoTranslator.Translate(test);
    assert.equal('', value[0]);
    value = await leoTranslator.Translate(' ');
    assert.equal('', value[0]);
  });
}
