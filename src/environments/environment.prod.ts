export const environment = {
  production: true,
  foo_api: 'http://localhost:8080/foo/',
  weather_api: 'http://localhost:8080/weather',
  authResourceServerConfig: {
    allowedUrls: [
      'http://localhost:8083/weather',
    ],
    sendAccessToken: true
  },
  authConfig: {
    issuer: 'http://localhost:8080/auth/realms/weathermonitoring',
    redirectUri: window.location.origin,
    clientId: 'login-app',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  }
};
