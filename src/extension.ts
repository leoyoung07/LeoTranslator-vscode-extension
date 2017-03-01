'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { LeoTranslator } from './leo-translator';

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
            let leoTranslator = new LeoTranslator();
            leoTranslator.Translate(inputText).then((value: string) => {
                if (value) {
                    let translateResult = JSON.parse(value)['trans_result'][0]['dst'];
                    if (!translateResult) {
                        return;
                    }
                    let editor = vscode.window.activeTextEditor;
                    editor.edit((editBuilder: vscode.TextEditorEdit) => {
                        editBuilder.insert(editor.selection.start, translateResult);
                    });
                }
            });
        });
    });

    let translateAndReplaceDisposable = vscode.commands.registerTextEditorCommand('extension.translateAndReplace', () => {
        translateSelection((editor, value) => {
            let translateResult = JSON.parse(value)['trans_result'][0]['dst'];
            if (!translateResult) {
                return;
            }
            let options = [translateResult as string];
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

function translateSelection(callback: (editor: vscode.TextEditor, value: string) => void) {
    let editor = vscode.window.activeTextEditor;
    let selectedText = editor.document.getText(editor.selection);
    let leoTranslator = new LeoTranslator();
    leoTranslator.Translate(selectedText).then((value: string) => {
        if (value) {
            callback(editor, value);
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}