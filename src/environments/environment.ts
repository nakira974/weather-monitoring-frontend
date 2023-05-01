export const environment = {
  production: false,
  foo_api: 'https://monitor.lkh.coffee:8083/weather',
  weather_api: 'https://monitor.lkh.coffee:8083/weather',
  authResourceServerConfig: {
    allowedUrls: [
      'https://monitor.lkh.coffee:8083/weather',
    ],
    sendAccessToken: true
  },
  authConfig: {
    issuer: 'https://monitor.lkh.coffee:8443/auth/realms/weathermonitoring',
    redirectUri: window.location.origin,
    clientId: 'login-app',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  }
};