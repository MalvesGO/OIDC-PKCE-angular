import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.performLogoutAndRedirect();
  }

  private async performLogoutAndRedirect(): Promise<void> {
    const logoutUrl = 'https://iam-oam-dev.min-saude.pt/oam/server/logout';

    try {
      // Usando Fetch API com timeout através de AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      await fetch(logoutUrl, {
        method: 'GET',
        credentials: 'include', // Equivalente a withCredentials: true
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (error) {
      // Captura erros de rede, timeout ou outros
      console.log('Logout error:', error);
    } finally {
      // Redireciona independentemente do resultado
      this.router.navigate(['/login']);
    }
  }
}
