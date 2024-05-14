import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { BrowserModule } from "@angular/platform-browser"; 
import { BrowserAnimationsModule }  
    from "@angular/platform-browser/animations"; 
import { TooltipModule } from "primeng/tooltip";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonModule, TooltipModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();
  constructor(readonly router: Router) {}

  ngOnInit(): void {}

  navigateToUsedCars(){
    this.router.navigate(['https://www.hasznaltauto.hu/partner/clear-globe_kft-11488'])
  }
}
