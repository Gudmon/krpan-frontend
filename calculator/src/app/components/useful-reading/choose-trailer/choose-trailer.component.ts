import { Component } from '@angular/core';
import { NavigationComponent } from "../../navigation/navigation.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { KrpanTrailerOverviewHintsComponent } from "../../calculator/palms/trailers/components/krpan-trailer-overview-hints/krpan-trailer-overview-hints.component";

@Component({
    selector: 'app-choose-trailer',
    standalone: true,
    templateUrl: './choose-trailer.component.html',
    styleUrl: './choose-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, KrpanTrailerOverviewHintsComponent]
})
export class ChooseTrailerComponent {
    constructor(private readonly router: Router){}

    navigateToCalculation(){
        this.router.navigate(['calculator/palms']);
    }
}
