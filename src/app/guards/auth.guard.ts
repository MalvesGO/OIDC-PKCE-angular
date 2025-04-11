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

    // Se não estiver autenticado, tenta obter o usuário da sessão
    const sessionUser = await this.authService.getUser();

    if (sessionUser && !sessionUser.expired) {
      return true;
    }

    // Se não houver usuário autenticado, redireciona para o login
    this.router.navigate(['/login']);
    return false;
  }
}
