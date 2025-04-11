import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-6">Bem-vindo, {{ userName }}</h1>
      <pre>
          {{ allInfo | json }}
        </pre
      >
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userName = '';
  allInfo: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.allInfo = user;
    user.then((userData) => {
      if (userData) {
        this.userName = userData.profile.name ?? 'Usuário';
      } else {
        this.userName = 'Usuário Desconhecido';
      }
    });
  }
}
