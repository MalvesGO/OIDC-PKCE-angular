import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { oidcConfig } from '../configs/oidc-config';
import { RestapiService } from '../restapi.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userManager: UserManager;

  constructor(private restApiService: RestapiService) {
    this.userManager = new UserManager({
      ...oidcConfig,
      metadata: {
        issuer: oidcConfig.authority,
        authorization_endpoint: `${oidcConfig.authority}/oauth2/rest/authorize`,
        token_endpoint: `${oidcConfig.authority}/oauth2/rest/token`,
      },
    });
  }

  // Inicia o login
  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  // Processa o callback após login
  async handleCallback(): Promise<void> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      console.log(user)
      localStorage.setItem('app-token', user.access_token);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao processar o callback de login:', error);
    }
  }

  // Obtém o usuário autenticado
  async getUser(): Promise<User | null> {
    try {
      return await this.userManager.getUser();
    } catch (error) {
      console.error('Erro ao buscar o usuário:', error);
      return null;
    }
  }

  clearSession = () => {
    localStorage.removeItem('app-token');
    sessionStorage.clear();
  };

  logout = async () => {
    // Faz a requisição HTTP para o endpoint de logout
    const logoutUrl = `${oidcConfig.logoutUrl}?post_logout_redirect_uri=${encodeURIComponent(oidcConfig.post_logout_redirect_uri)}`;

    try {
      await fetch(logoutUrl, {
        method: 'POST', // ou 'POST', dependendo da implementação do IAM
        credentials: 'same-origin' // Usado para garantir que cookies de sessão sejam enviados
      });
      // Após a requisição de logout ser feita, o redirecionamento ocorre para o post_logout_redirect_uri
      window.location.href = oidcConfig.post_logout_redirect_uri;
    } catch (error) {
      console.error('Erro ao tentar realizar logout', error);
    }
  };

  logoutAndClearSession = () => {
    this.clearSession();
    this.logout();
  };
}
