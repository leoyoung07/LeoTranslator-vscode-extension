'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LeoTranslator } from './leo-translator';
import { BaiduTranslatorApi } from './baidu-translator-api';
import { IResult } from './interfaces';
import { Config } from './config';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "leo-translator" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let translateToEnglishDisposable = vscode.commands.registerCommand('extension.translateAndInsert', () => {
        vscode.window.showInputBox().then((inputText) => {
            translate(inputText, (value) => {
                if (!value) {
                    return;
                }
                let editor = vscode.window.activeTextEditor;
                editor.edit((editBuilder: vscode.TextEditorEdit) => {
                    editBuilder.insert(editor.selection.start, value);
                });
            });
        });
    });

    let translateAndReplaceDisposable = vscode.commands.registerTextEditorCommand('extension.translateAndReplace', () => {
        let editor = vscode.window.activeTextEditor;
        let selectedText = editor.document.getText(editor.selection);
        translate(selectedText, (value) => {
            if (!value) {
                return;
            }
            let options = [value];
            vscode.window.showQuickPick(options)
                .then((item) => {
                    editor.edit((editBuilder: vscode.TextEditorEdit) => {
                        editBuilder.replace(editor.selection, item);
                    });
                });

        });
    });

    context.subscriptions.push(translateToEnglishDisposable);
    context.subscriptions.push(translateAndReplaceDisposable);
}

async function translate(text: string, callback: (value: string) => void) {
    let leoTranslator = new LeoTranslator(new BaiduTranslatorApi(Config.BaiduApi.APP_ID, Config.BaiduApi.KEY));
    let result = await leoTranslator.Translate(text);
    if (result) {
        callback(result.dict[0]);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}