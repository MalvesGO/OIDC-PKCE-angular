import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-6">Painel Principal</h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Bem-vindo, {{ userName }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div class="bg-blue-50 p-6 rounded-md border border-blue-100">
            <h3 class="font-medium text-blue-700 mb-2">Certificados</h3>
            <p class="text-gray-600">Gerencie os certificados de óbito</p>
            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Acessar
            </button>
          </div>

          <div class="bg-green-50 p-6 rounded-md border border-green-100">
            <h3 class="font-medium text-green-700 mb-2">Relatórios</h3>
            <p class="text-gray-600">Visualize e exporte relatórios</p>
            <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Acessar
            </button>
          </div>

          <div class="bg-purple-50 p-6 rounded-md border border-purple-100">
            <h3 class="font-medium text-purple-700 mb-2">Administração</h3>
            <p class="text-gray-600">Gerencie usuários e permissões</p>
            <button class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Acessar
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userState = this.authService.getUserState();
    if (userState) {
      this.userName = userState.nome || 'Usuário';
    }
  }
}
