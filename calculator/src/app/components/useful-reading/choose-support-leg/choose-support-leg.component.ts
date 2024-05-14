import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationComponent } from "../../navigation/navigation.component";

@Component({
    selector: 'app-choose-support-leg',
    standalone: true,
    templateUrl: './choose-support-leg.component.html',
    styleUrl: './choose-support-leg.component.css',
    imports: [FooterComponent, NavigationComponent]
})
export class ChooseSupportLegComponent {
  constructor(private readonly router: Router){}

  navigateToCalculation(){
      this.router.navigate(['calculator/palms']);
  }
}
