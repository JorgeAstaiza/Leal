import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'shell';
  constructor(
    public commonsLibService: CommonsLibService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ruta = this.activeRouter.url.subscribe((url) => {
      console.log('url', url);
    });
  }
}
