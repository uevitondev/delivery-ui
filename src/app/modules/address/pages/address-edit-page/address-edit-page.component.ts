import { Component } from '@angular/core';
import { AddressFormComponent } from '../../components/address-form/address-form.component';

@Component({
  selector: 'app-address-edit-page',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './address-edit-page.component.html',
  styleUrl: './address-edit-page.component.scss'
})
export class AddressEditPageComponent {

}
