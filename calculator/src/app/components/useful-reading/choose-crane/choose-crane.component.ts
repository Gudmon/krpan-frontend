import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationComponent } from "../../navigation/navigation.component";

@Component({
    selector: 'app-choose-crane',
    standalone: true,
    templateUrl: './choose-crane.component.html',
    styleUrl: './choose-crane.component.css',
    imports: [FooterComponent, NavigationComponent]
})
export class ChooseCraneComponent {
  constructor(private readonly router: Router){}

  navigateToCalculation(){
      this.router.navigate(['calculator/palms']);
  }
}
