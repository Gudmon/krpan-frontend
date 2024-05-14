import { Component, HostListener, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationComponent } from "../../navigation/navigation.component";
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-important',
    standalone: true,
    templateUrl: './important.component.html',
    styleUrl: './important.component.css',
    imports: [FooterComponent, NavigationComponent, TableModule]
})
export class ImportantComponent implements OnInit {
    products: any
    public getScreenWidth: any;
    public getScreenHeight: any;

    smallScreen(){
        return this.getScreenWidth < 645;
    }

    ngOnInit() {
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;
    }
}
