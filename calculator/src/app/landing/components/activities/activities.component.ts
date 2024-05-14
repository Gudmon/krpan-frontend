import { Component } from '@angular/core';
import { TruncatePipe } from "../../../components/pipes/truncate.pipe";
import { Router } from '@angular/router';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
    selector: 'app-activities',
    standalone: true,
    templateUrl: './activities.component.html',
    styleUrl: './activities.component.css',
    imports: [TruncatePipe, AnimateOnScrollModule]
})
export class ActivitiesComponent {
    constructor(private readonly router: Router){}

    navigateToRental(){
        this.router.navigate(['/not-found']);
    }

    navigateToKrpanMachines(){
        this.router.navigate(['/not-found']);
    }

    navigateToPalmsMachines(){
        this.router.navigate(['/not-found']);
    }

    navigateToAdditives(){
        this.router.navigate(['/not-found']);
    }
}
