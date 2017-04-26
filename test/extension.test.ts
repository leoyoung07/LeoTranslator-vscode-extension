//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { LeoTranslator } from '../src/leo-translator';
import { BaiduTranslatorApi } from '../src/baidu-translator-api';
import { YoudaoTranslatorApi } from '../src/youdao-translator-api'
import { IResult } from '../src/interfaces';
import { Config } from '../src/config';


// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {
    let leoTranslator = new LeoTranslator(new BaiduTranslatorApi(Config.BaiduApi.APP_ID, Config.BaiduApi.KEY));
    tests(leoTranslator, 'Baidu API');
    leoTranslator = new LeoTranslator(new YoudaoTranslatorApi(Config.YoudaoApi.KEY, Config.YoudaoApi.KEY_FROM));
    tests(leoTranslator, 'Youdao API');
});

function tests(leoTranslator: LeoTranslator, apiName: string) {
    // Defines a Mocha unit test
    test(`${apiName}: translate to English`, async () => {
        let value = await leoTranslator.Translate('苹果');
        assert.equal("apple", value.dict[0].toLowerCase());
    });

    test(`${apiName}: translate to Chinese`, async () => {
        let value = await leoTranslator.Translate('apple');
        assert.equal('苹果', value.dict[0]);
    });

    test(`${apiName}: empty input`, async () => {
        let test;
        let value = await leoTranslator.Translate(test);
        assert.equal("", value.dict[0]);
        value = await leoTranslator.Translate(" ");
        assert.equal("", value.dict[0]);
    });
}