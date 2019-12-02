// interface Callback {
//
//   /**
//    * 发起请求之前。通常显示请求等待对话框的UI。
//    */
//   start(): any;
//
//   /**
//    * 按预期请求成功回到。
//    */
//   ok(data: any): void;
//
//   /**
//    * 请求错误回调。错误处理。
//    * @param status 错误状态码。两种，一种是系统错误，一种是业务错误。可以根据不同状态码做页面逻辑跳转。
//    * @param msg 错误信息提醒。
//    */
//   fail(status: number, msg: string): void;
//
//   /**
//    * 请求完成后回调。通常做请求等待对话框关闭动作。
//    */
//   finally(): void;
//
// }
