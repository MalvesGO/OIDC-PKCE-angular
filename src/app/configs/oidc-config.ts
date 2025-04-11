export const oidcConfig = {
  authority: "https://iam-oam-dev.min-saude.pt",
  client_id: "iam_sico_dev_client",
  redirect_uri: "http://localhost:4200/callback",
  response_type: "code",
  scope: "openid devresserver.scope1",
  post_logout_redirect_uri: "http://localhost:4200/login",
  logoutUrl: 'https://iam-oam-dev.min-saude.pt/oam/server/logout',
  domain: "OAADomain"
};
