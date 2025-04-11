import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Verifica se o usuário está autenticado
    const userState = this.authService.getUserState();

    if (userState) {
      return true;
    }

    // Se não estiver autenticado, tenta obter o usuário da sessão
    const user = await this.authService.getUser();

    if (user && !user.expired) {
      return true;
    }

    // Se não houver usuário autenticado, redireciona para o login
    this.router.navigate(['/login']);
    return false;
  }
}
