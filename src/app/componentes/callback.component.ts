import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  template: `
    <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <h2 class="text-xl font-semibold mb-2">Processando autenticação...</h2>
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  `
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleCallback().catch(error => {
      console.error('Erro ao processar callback:', error);
    });
  }
}
