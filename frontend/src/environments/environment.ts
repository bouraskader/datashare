// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  timeStamp: '',
  keycloakUri:
    window['env']['keycloakUri'] || 'http://localhost:8080/auth/',
  keycloakRealm: window['env']['keycloakRealm'] || 'my-realm',
  keycloakClient: window['env']['keycloakClient'] || 'my-client',
  keycloakClientSecret:
    window['env']['keycloakClientSecret'] ||
    '0bafeb60-703e-49e3-bc1c-2c98e72094a5',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
