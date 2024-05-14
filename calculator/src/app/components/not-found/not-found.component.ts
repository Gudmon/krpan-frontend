import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
    imports: [NavigationComponent]
})
export class NotFoundComponent {
    constructor(readonly router: Router) {}

    navigateToHome(){
        this.router.navigate(['/']);
    }
}
