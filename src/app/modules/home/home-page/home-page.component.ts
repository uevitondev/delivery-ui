import { Component } from '@angular/core';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeLayoutComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
