export const oktaConfig = {
    clientId: '0oam97moqjb0yGody5d7',
    issuer: 'https://dev-18268144.okta.com/oauth2/default',
    redirectUri: process.env.NODE_ENV === 'production'
    ? 'https://mainavebooks.com/login/callback'
    : process.env.NODE_ENV === 'test'
    ? 'http://localhost:8080/login/callback'
    : 'http://localhost:5173/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}