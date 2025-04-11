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

  private performLogoutAndRedirect(): void {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://iam-oam-dev.min-saude.pt/oam/server/logout?returnUrl=' + encodeURIComponent(window.location.origin + '/login');
    document.body.appendChild(iframe);

    // Após o logout, redireciona para a página de login
    this.router.navigate(['/login']);
  }
}
