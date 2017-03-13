/**
 * Config
 */

import * as vscode from 'vscode';
class Config {
    public static readonly APP_ID: string = vscode.workspace.getConfiguration('leoTranslator').get('appId') as string;
    public static readonly KEY: string = vscode.workspace.getConfiguration('leoTranslator').get('key') as string;
}

export { Config };