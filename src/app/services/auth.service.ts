import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { oidcConfig } from '../configs/oidc-config';
import { RestapiService } from '../restapi.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userManager: UserManager;
  private userState: any = null;

  constructor(private restApiService: RestapiService) {
    this.userManager = new UserManager({
      ...oidcConfig,
      metadata: {
        issuer: oidcConfig.authority,
        authorization_endpoint: `${oidcConfig.authority}/oauth2/rest/authorize`,
        token_endpoint: `${oidcConfig.authority}/oauth2/rest/token`,
      },
    });
    this.userState = JSON.parse(localStorage.getItem('sico_user') ?? 'null');
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
      localStorage.setItem('token', user.access_token);
      const utilizador = await this.restApiService.getRandomPokemon().toPromise();
      console.log('utilizador', utilizador);
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

  // Retorna o usuário salvo do banco
  getUserState(): any {
    return this.userState;
  }

  clearSession = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.userState = null;
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
