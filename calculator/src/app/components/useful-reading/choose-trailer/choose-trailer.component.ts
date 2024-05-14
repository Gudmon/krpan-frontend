import { Component } from '@angular/core';
import { NavigationComponent } from "../../navigation/navigation.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { PalmsTrailerOverviewHintsComponent } from "../../calculator/palms/trailers/components/palms-trailer-overview-hints/palms-trailer-overview-hints.component";

@Component({
    selector: 'app-choose-trailer',
    standalone: true,
    templateUrl: './choose-trailer.component.html',
    styleUrl: './choose-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, PalmsTrailerOverviewHintsComponent]
})
export class ChooseTrailerComponent {
    constructor(private readonly router: Router){}

    navigateToCalculation(){
        this.router.navigate(['calculator/palms']);
    }
}
