// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

declare module 'axios' {
  /**
   * @param {code} string
   * @param {msg} number
   * @param {data} any
   */
  interface IAxios<D = any> {
    code: number;
    message: number;
    data: D;
  }
  export interface AxiosResponse<T = any> extends Promise<IAxios> {}
}
