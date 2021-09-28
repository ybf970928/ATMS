// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import {IAxios} from '../hooks/useFetch';

declare module 'axios' {
  /**
   * @param {code} string
   * @param {msg} number
   * @param {data} any
   */
  export interface AxiosResponse<T = any> extends Promise<IAxios> {}
}
