import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { KrpanOverviewComponent } from './components/calculator/palms/shared/components/krpan-overview/krpan-overview.component';
import { KrpanCranePageComponent } from './components/calculator/palms/cranes/components/krpan-crane-page/krpan-crane-page.component';
import { KrpanTrailerPageComponent } from './components/calculator/palms/trailers/components/krpan-trailer-page/krpan-trailer-page.component';
import { CustomerMapComponent } from './components/customer-map/customer-map.component';
import { UsefulReadingComponent } from './components/useful-reading/useful-reading/useful-reading.component';
import { ChooseTrailerComponent } from './components/useful-reading/choose-trailer/choose-trailer.component';
import { ChooseCraneComponent } from './components/useful-reading/choose-crane/choose-crane.component';
import { ChooseSupportLegComponent } from './components/useful-reading/choose-support-leg/choose-support-leg.component';
import { ChooseGrappleComponent } from './components/useful-reading/choose-grapple/choose-grapple.component';
import { ImportantComponent } from './components/useful-reading/important/important.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/krpan', component: KrpanOverviewComponent},
    {path: 'calculator/krpan/trailers/:id', component: KrpanTrailerPageComponent},
    {path: 'calculator/krpan/cranes/:id', component: KrpanCranePageComponent},
    {path: 'customer-map', component: CustomerMapComponent},
    // {path: 'useful-reading', component: UsefulReadingComponent},
    // {path: 'useful-reading/choose-trailer', component: ChooseTrailerComponent},
    // {path: 'useful-reading/choose-crane', component: ChooseCraneComponent},
    // {path: 'useful-reading/choose-support-leg', component: ChooseSupportLegComponent},
    // {path: 'useful-reading/choose-grapple', component: ChooseGrappleComponent},
    // {path: 'useful-reading/important', component: ImportantComponent},
    {path: 'not-found', component: NotFoundComponent },
    {path: '**', redirectTo: '/not-found' } 
];
