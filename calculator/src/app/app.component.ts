import { Component, OnDestroy, OnInit  } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api/menuitem';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LandingComponent } from "./landing/landing.component";
import { FooterComponent } from './components/footer/footer.component';
import { LoadingService } from './services/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

declare var cookieconsent: any;
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProgressSpinnerModule, ProductListComponent, MenubarModule, NavigationComponent, LandingComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  readonly loading$ = this.loadingService.status$;

  private clarityScriptLoaded: boolean = false;
  private clarityScriptTag: HTMLScriptElement | null = null;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router){}
    private scriptLoaded = false;
    
    initialize() {
        if (typeof cookieconsent !== 'undefined') {
          cookieconsent.run({
            "notice_banner_type": "simple",
            "consent_type": "express",
            "palette": "dark",
            "language": "hu",
            "page_load_consent_levels": ["strictly-necessary"],
            "notice_banner_reject_button_hide": false,
            "preferences_center_close_button_hide": false,
            "page_refresh_confirmation_buttons": false,
            "website_name": "https://victorious-island-03de76e03.5.azurestaticapps.net/",
            "callbacks": {
                "notice_banner_loaded": () => {
                },
                "i_agree_button_clicked": (consent: any) => {     
                    //this.loadClarityScript("mcs330ykus")
                },
                "i_decline_button_clicked": () => {
                },
                "change_my_preferences_button_clicked": () => {
                },
                "scripts_all_loaded": () => {
                },
                "user_consent_saved": (consent: Consent) => {
                    // this.removeClarityScript("mcs330ykus");
                    // if(consent.tracking) {
                    //     this.loadClarityScript("mcs330ykus");
                    // } 
                },
                "scripts_specific_loaded": (level: any) => {
                    switch(level) {
                        case 'strictly-necessary':
                            break;
                        case 'functionality':
                            break;
                        case 'tracking':
                            this.loadClarityScript("mcs330ykus");
                            break;
                        case 'targeting':
                            break;
                    }
                }
            },
            "callbacks_force": true
          });
        } else {
          console.error('Cookie Consent script not loaded.');
        }
    }
    
    loadClarityScript(tagId: string): void {
        (function(c: any, l: any, a: string, r: string, i: string, t: any, y: any){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          t.charset = 'UTF-8';
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", tagId, document.createElement('script'), undefined);
    }

    removeClarityScript(tagId: string): void {
        const clarityScriptElement = document.getElementById(tagId);
        if (clarityScriptElement && clarityScriptElement.parentNode) {
          clarityScriptElement.parentNode.removeChild(clarityScriptElement);
        }
      }
      
    private loadScript(url: string, callback?: (ev: Event) => any): void {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = true;
    
    if (callback) {
        script.onload = callback.bind(this);
    }
    document.head.appendChild(script);
    }

    ngOnInit() {
        this.loadScript('https://www.termsfeed.com/public/cookie-consent/4.1.0/cookie-consent.js', this.initialize);

        this.router.events.subscribe((event) => { 
            if (!(event instanceof NavigationEnd)) { 
                return; 
            }  
            window.scrollTo(0, 0) 
        }); 

    }
}


interface Consent{
    "functionality": boolean,
    "strictly-necessary": boolean,
    "targeting": boolean,
    "tracking": boolean
}