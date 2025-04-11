import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  template: `
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">SICO - Sistema de Informação dos Certificados de Óbito</h1>
          <button (click)="logout()" class="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md">
            Sair
          </button>
        </div>
      </header>

      <main class="flex-grow container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-gray-100 p-4 border-t">
        <div class="container mx-auto text-center text-gray-600 text-sm">
          © 2025 Ministério da Saúde - Todos os direitos reservados
        </div>
      </footer>
    </div>
  `,
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logoutAndClearSession();
  }
}
