import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TrailerDataItemComponent } from "../../../shared/components/machine-data-item/machine-data-item.component";
import { KrpanCrane } from '../../models/krpan-crane';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
    selector: 'app-krpan-crane-information',
    standalone: true,
    templateUrl: './krpan-crane-information.component.html',
    styleUrl: './krpan-crane-information.component.css',
    imports: [TrailerDataItemComponent, ImageModule, GalleriaModule, YouTubePlayerModule]
})
export class KrpanCraneInformationComponent implements OnInit, AfterViewInit {
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  galleryContainerStyle: any = { 'max-width': '50%' };
  @Input({required: true}) crane!: KrpanCrane
  @Output() trailerSelected = new EventEmitter<number>();
  @ViewChild("youTubePlayer") youTubePlayer!: ElementRef<HTMLDivElement>;
  
  constructor(private changeDetectorRef: ChangeDetectorRef){}

  @HostListener('document:keyup.escape', ['$event'])
  onKeyup() {
    this.displayBasic = false;
  }

  ngOnInit(): void {
    this.setResponsiveOptions();
    this.setImages();
    this.resize();
  }

  ngAfterViewInit(): void {
    this.resize();
    //window.addEventListener("resize", this.resize.bind(this));
  }

  resize(): void {
    if(this.youTubePlayer){
      this.videoWidth = Math.min(
        this.youTubePlayer.nativeElement.clientWidth,
        1200
      );
      this.videoHeight = this.videoWidth * 0.6;
      this.changeDetectorRef.detectChanges();
    }
  }
  
  smallScreen(){
    return window.innerWidth < 900;
  }

  getTrailers(): { id: number, name: string }[] {
    return this.crane.trailer.map(trailer => ({ id: trailer.id, name: trailer.name }));
  }

  trailerSelectedEmit(trailerId: number){
    this.trailerSelected.emit(trailerId)
  }

  private updateContainerStyle(): void {
    if (window.innerWidth <= 640) {
      this.galleryContainerStyle = { 'max-width': '100%' };
    } else if (640 < window.innerWidth && window.innerWidth <= 1024) {
      this.galleryContainerStyle = { 'max-width': '75%' };
    } else {
      this.galleryContainerStyle = { 'max-width': '50%' };
    }
  }

  private setImages(){
    this.images = [
      {
        itemImageSrc: this.crane.imgUrls[0],
        thumbnailImageSrc:  this.crane.imgUrls[0],
        alt: 'Description for Crane image 1',
        title: 'Crane image 1'
      },
      {
        itemImageSrc: this.crane.imgUrls[1],
        thumbnailImageSrc:  this.crane.imgUrls[1],
        alt: 'Description for Crane image 2',
        title: 'Crane image 2'
      },
    ]  
  }

  private setResponsiveOptions(){
    this.responsiveOptions = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
    ];
  }
}
