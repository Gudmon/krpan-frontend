import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-map-feature',
  standalone: true,
  imports: [],
  templateUrl: './customer-map-feature.component.html',
  styleUrl: './customer-map-feature.component.css'
})
export class CustomerMapFeatureComponent {
  constructor(readonly router: Router){}

  navigateToKrpanCustomerMap(){
    this.router.navigate(['customer-map']);
  }
}
