import * as request from 'request';
import { IResult } from './interfaces';

/**
 * Util
 */
class Util {
  /**
   * GetHttpBuildQuery
   * @param params
   */
  public static GetHttpBuildQuery(params: { [key: string]: string }): string {
    let httpBuildQuery = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
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
  public static async GetApiResponse(
    apiUrl: string,
    responseParser: (res: string) => IResult,
    params: { [key: string]: string }
  ) {
    const requestUrl = apiUrl + '?' + Util.GetHttpBuildQuery(params);
    const response = await new Promise((resolve: (value: IResult) => void, reject) => {
      const httpRequest = request;
      httpRequest.get(requestUrl, (error, res: request.RequestResponse, body) => {
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
