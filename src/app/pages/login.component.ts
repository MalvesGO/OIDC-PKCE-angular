import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex flex-col justify-center items-center h-screen bg-blue-300">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p class="text-gray-600">Faça login para acessar sua conta</p>
        </div>

        <button
          (click)="login()"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm5 10v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
          Entrar com IAM
        </button>

        <div class="mt-6 text-center text-sm text-gray-500">
          <p>Sistema de autenticação seguro</p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login().catch(error => {
      console.error('Erro ao iniciar login:', error);
    });
  }
}
