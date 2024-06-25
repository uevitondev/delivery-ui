import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-testapi-page',
  standalone: true,
  imports: [],
  templateUrl: './testapi-page.component.html',
  styleUrl: './testapi-page.component.scss'
})
export class TestApiPageComponent implements OnInit {
  authService = inject(AuthService);
  toast = inject(ToastrService);
  resultTestApi: string = "";

  ngOnInit(): void {
    this.testApi();
  }

  testApi() {
    return this.authService.teste().subscribe({
      next: data => {
        this.resultTestApi = data.text;
      },
      error: e => {
        this.toast.error(e.message);
      }
    });

  }




}
