/**
 * Config
 */

import * as vscode from 'vscode';
class Config {

    private static _baiduApiConfig = vscode.workspace.getConfiguration('leoTranslator').get('baiduApi');
    private static _youdaoApiConfig = vscode.workspace.getConfiguration('leoTranslator').get('youdaoApi');

    public static readonly BaiduApi = {
        APP_ID: Config._baiduApiConfig['appId'] as string,
        KEY: Config._baiduApiConfig['key'] as string
    }

    public static readonly YoudaoApi = {
        KEY: Config._youdaoApiConfig['key'] as string,
        KEY_FROM: Config._youdaoApiConfig['keyFrom'] as string
    }
}

export { Config };