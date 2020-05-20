// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// 开发环境
export const environment = {
  production: false,
  config_global: true, // 是否启用全局变量。全局变量在app.config.ts中配置。
  // apiUrl: 'http://api-dev.xrlj.com:5555'
  apiUrl: 'http://localhost:5555'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
