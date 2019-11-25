interface Callback {

  /**
   * http请求发起前。做UI交互。
   */
  pre(): void;

  /**
   * http请求处理中。请求数据处理。
   */
  deal(): any;

  /**
   * 请求错误回调。错误处理。
   */
  error(): any;

  /**
   * 请求完成后回调。
   */
  finally(): void;

}
