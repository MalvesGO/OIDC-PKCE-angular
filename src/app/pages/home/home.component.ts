import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-6">Bem-vindo, {{ userName }}</h1>
      <pre><code>{{ formattedInfo }}</code></pre>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userName = '';
  formattedInfo = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    user.then((userData) => {
      if (userData) {
        this.userName = userData.profile.name ?? 'Usuário';
        this.formattedInfo = JSON.stringify(userData, null, 2);
      } else {
        this.userName = 'Usuário Desconhecido';
      }
    });
  }
}
