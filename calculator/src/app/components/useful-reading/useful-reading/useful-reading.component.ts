import { Component } from '@angular/core';
import { NavigationComponent } from "../../navigation/navigation.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-useful-reading',
    standalone: true,
    templateUrl: './useful-reading.component.html',
    styleUrl: './useful-reading.component.css',
    imports: [NavigationComponent, FooterComponent]
})
export class UsefulReadingComponent {
    constructor(private readonly router: Router){}

    navigateToImportant(){
        this.router.navigate(['useful-reading/important']);
    }

    navigateToChooseTrailer(){
        this.router.navigate(['useful-reading/choose-trailer']);
    }

    navigateToChooseCrane(){
        this.router.navigate(['useful-reading/choose-crane']);
    }

    navigateToChooseSupportLeg(){
        this.router.navigate(['useful-reading/choose-support-leg']);
    }

    navigateToChooseGrapple(){
        this.router.navigate(['useful-reading/choose-grapple']);
    }
}
