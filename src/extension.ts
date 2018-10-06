'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BaiduTranslatorApi } from './baidu-translator-api';
import { ApiType, Config } from './config';
import { LeoTranslator } from './leo-translator';
import { YoudaoTranslatorApi } from './youdao-translator-api';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // tslint:disable-next-line:no-console
  console.log('Congratulations, your extension "leo-translator" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const translateAndInsertDisposable = vscode.commands.registerCommand('extension.translateAndInsert', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const inputText = await vscode.window.showInputBox();
      const options = await translate(inputText);
      if (options) {
        const item = await vscode.window.showQuickPick(options);
        if (item) {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.insert(editor.selection.start, item);
          });
        }
      }
    }
  });

  const translateAndReplaceDisposable = vscode.commands.registerTextEditorCommand(
    'extension.translateAndReplace',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        const options = await translate(selectedText);
        if (!options) {
          return;
        }
        const item = await vscode.window.showQuickPick(options);
        if (item) {
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.replace(editor.selection, item);
          });
        }
      }
    }
  );

  context.subscriptions.push(translateAndInsertDisposable);
  context.subscriptions.push(translateAndReplaceDisposable);
}

async function translate(text: string | undefined) {
  let leoTranslator: LeoTranslator;
  switch (Config.ApiType) {
    case ApiType[ApiType.baidu]:
      leoTranslator = new LeoTranslator(new BaiduTranslatorApi(Config.BaiduApi.APP_ID, Config.BaiduApi.KEY));
      break;
    case ApiType[ApiType.youdao]:
      leoTranslator = new LeoTranslator(new YoudaoTranslatorApi(Config.YoudaoApi.KEY, Config.YoudaoApi.KEY_FROM));
      break;
    default:
      leoTranslator = new LeoTranslator(new YoudaoTranslatorApi(Config.YoudaoApi.KEY, Config.YoudaoApi.KEY_FROM));
      break;
  }
  return await leoTranslator.Translate(text);
}

// this method is called when your extension is deactivated
export function deactivate() {
  //
}
