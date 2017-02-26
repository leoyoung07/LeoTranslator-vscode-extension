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


// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {
    let leoTranslator = new LeoTranslator();
    // Defines a Mocha unit test
    test("translate to English", () => {
        leoTranslator.Translate('苹果').then((value: string) => {
                assert.equal("apple", (JSON.parse(value)['trans_result'][0]['dst'] as string).toLowerCase());
            });
    });

    test("empty input", () => {
        let test;
        leoTranslator.Translate(test).then((value: string) => {
            assert.equal("", value);
        });
        leoTranslator.Translate(" ").then((value: string) => {
            assert.equal("", value);
        });
    });
});