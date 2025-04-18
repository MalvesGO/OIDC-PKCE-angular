import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager } from 'oidc-client-ts';
import { oidcConfig } from '../configs/oidc-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userManager: UserManager;

  constructor(private readonly router: Router) {
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
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const user = await this.userManager.signinRedirectCallback();
      localStorage.setItem('app-token', user.access_token);
      this.router.navigate(['/']);
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

  logout = () => {
    // Redireciona o usuário para a rota de logout
    this.router.navigateByUrl('/logout');
  };

  logoutAndClearSession = () => {
    this.clearSession();
    this.logout();
  };
}
