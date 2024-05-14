import { Component, DestroyRef, OnInit } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CarouselComponent } from "./components/carousel/carousel.component";
import { ActivitiesComponent } from "./components/activities/activities.component";
import { CalculatorComponent } from "./components/calculator/calculator.component";
import { HighlightsComponent } from "./components/highlights/highlights.component";
import { GoogleMapsModule } from '@angular/google-maps'
import { MapsComponent } from "./components/maps/maps.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CatalogComponent } from "./components/catalog/catalog.component";
import { FeaturesComponent } from "./components/features/features.component";
import { GalleriaComponent } from "./components/galleria/galleria.component";
import { CustomerMapFeatureComponent } from "./components/customer-map-feature/customer-map-feature.component";

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    providers: [HttpClient],
    imports: [NavigationComponent, GoogleMapsModule, CarouselComponent, HttpClientModule, ActivitiesComponent, CalculatorComponent, HighlightsComponent, FooterComponent, MapsComponent, CatalogComponent, FeaturesComponent, GalleriaComponent, CustomerMapFeatureComponent]
})
export class LandingComponent implements OnInit{
    constructor(private readonly httpService: HttpClient){}
    tyreIds: any[] = [];

    ngOnInit(): void {
        
    }

    
}
function takeuntilDestroyed(): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Function not implemented.');
}

