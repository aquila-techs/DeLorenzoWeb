// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://api.myfitspot.com/api",
  //baseUrl: "http://localhost:3003/api",
  //imgUrl:"http://localhost:3003/",
  imgUrl: "https://api.myfitspot.com/",
  // baseUrl: "http://140.82.50.108:3003/api",
  liveUrl: "https://partner.myfitspot.com",
  testUrl:"http://localhost:4200",
  translateApiKey:"AIzaSyDUlOJSnK06FvTPbmhFULblL0DKZktfk8Y",
  translateUrl:'https://translation.googleapis.com/language/translate/v2?key=',
  recaptchaKey:"6LcKMfoUAAAAAGNwUB77MiCNdwNeGvY_cy6lwSIC"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
