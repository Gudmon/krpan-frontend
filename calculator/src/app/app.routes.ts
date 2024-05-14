import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PalmsOverviewComponent } from './components/calculator/palms/shared/components/palms-overview/palms-overview.component';
import { PalmsCranePageComponent } from './components/calculator/palms/cranes/components/palms-crane-page/palms-crane-page.component';
import { PalmsTrailerPageComponent } from './components/calculator/palms/trailers/components/palms-trailer-page/palms-trailer-page.component';
import { CustomerMapComponent } from './components/customer-map/customer-map.component';
import { UsefulReadingComponent } from './components/useful-reading/useful-reading/useful-reading.component';
import { ChooseTrailerComponent } from './components/useful-reading/choose-trailer/choose-trailer.component';
import { ChooseCraneComponent } from './components/useful-reading/choose-crane/choose-crane.component';
import { ChooseSupportLegComponent } from './components/useful-reading/choose-support-leg/choose-support-leg.component';
import { ChooseGrappleComponent } from './components/useful-reading/choose-grapple/choose-grapple.component';
import { ImportantComponent } from './components/useful-reading/important/important.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/palms', component: PalmsOverviewComponent},
    {path: 'calculator/palms/trailers/:id', component: PalmsTrailerPageComponent},
    {path: 'calculator/palms/cranes/:id', component: PalmsCranePageComponent},
    {path: 'customer-map', component: CustomerMapComponent},
    {path: 'useful-reading', component: UsefulReadingComponent},
    {path: 'useful-reading/choose-trailer', component: ChooseTrailerComponent},
    {path: 'useful-reading/choose-crane', component: ChooseCraneComponent},
    {path: 'useful-reading/choose-support-leg', component: ChooseSupportLegComponent},
    {path: 'useful-reading/choose-grapple', component: ChooseGrappleComponent},
    {path: 'useful-reading/important', component: ImportantComponent},
    {path: 'not-found', component: NotFoundComponent },
    {path: '**', redirectTo: '/not-found' } 
];
