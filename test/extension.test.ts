//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { LeoTranslator, IResult } from '../src/leo-translator';
import { Config } from '../src/config';


// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {
    let leoTranslator = new LeoTranslator(Config.APP_ID, Config.KEY);
    // Defines a Mocha unit test
    test("translate to English", () => {
        leoTranslator.Translate('苹果').then((value: IResult) => {
            assert.equal("apple", value.dict[0].toLowerCase());
        });
    });

    test("translate to Chinese", () => {
        leoTranslator.Translate('apple').then((value: IResult) => {
            assert.equal('苹果', value.dict[0]);
        })
    });

    test("empty input", () => {
        let test;
        leoTranslator.Translate(test).then((value: IResult) => {
            assert.equal("", value.dict[0]);
        });
        leoTranslator.Translate(" ").then((value: IResult) => {
            assert.equal("", value.dict[0]);
        });
    });
});