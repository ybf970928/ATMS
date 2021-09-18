// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

declare module 'axios' {
  /**
   * { code => 状态码, msg => '响应信息', data => 数据 }
   */
  interface IAxios<D = any> {
    code: number;
    message: number;
    data: D;
  }
  export interface AxiosResponse<T = any> extends Promise<IAxios> {}
}
