/**
 * Config
 */

import * as vscode from 'vscode';
class Config {

    public static get BaiduApi() {
        let baiduApiConfig = vscode.workspace.getConfiguration('leoTranslator').get('baiduApi');
        return {
            APP_ID: baiduApiConfig['appId'] as string,
            KEY: baiduApiConfig['key'] as string
        };
    }

    public static get YoudaoApi() {
        let youdaoApiConfig = vscode.workspace.getConfiguration('leoTranslator').get('youdaoApi');
        return {
            KEY: youdaoApiConfig['key'] as string,
            KEY_FROM: youdaoApiConfig['keyFrom'] as string
        };
    }

    public static get ApiType() {
        return vscode.workspace.getConfiguration('leoTranslator').get('apiType');
    }

}

enum ApiType {
    baidu,
    youdao
}
export { Config, ApiType };