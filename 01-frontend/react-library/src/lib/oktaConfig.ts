export const oktaConfig = {
    clientId: '0oam97moqjb0yGody5d7',
    issuer: 'https://dev-18268144.okta.com/oauth2/default',
    redirectUri: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}