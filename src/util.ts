import { IResult } from './interfaces';
import * as request from 'request';

/**
 * Util
 */
class Util {
    /**
     * GetHttpBuildQuery
     * @param params 
     */
    public static GetHttpBuildQuery(params): string {
        let httpBuildQuery = "";
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                let value = params[key];
                httpBuildQuery += key + '=' + value + '&';
            }
        }
        httpBuildQuery = httpBuildQuery.substr(0, httpBuildQuery.length - 1);
        return httpBuildQuery;
    }

    /**
     * GetApiResponse
     * @param apiUrl 
     * @param responseParser 
     * @param params 
     */
    public static async GetApiResponse(apiUrl: string, responseParser: (res: string) => IResult, params?) {
        let requestUrl = apiUrl + '?' + Util.GetHttpBuildQuery(params);
        let response = await new Promise((resolve: (value: IResult) => void, reject) => {
            let httpRequest = request;
            httpRequest.get(requestUrl, function (error, res: request.RequestResponse, body) {
                if (!error) {
                    resolve(responseParser(body));
                } else {
                    reject(error);
                }
            });
        });
        return response;
    }
}

export { Util };