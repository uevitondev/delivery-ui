import { Component, inject } from '@angular/core';
import { StoreListComponent } from '../../store/store-list/store-list.component';
import { StorageService } from '../../services/storage.service';
import { NavBarComponent } from "../../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { CnavbarComponent } from "../../cnavbar/cnavbar.component";

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, CnavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  storageService = inject(StorageService);

  ngOnInit(): void { }
}
