import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KrpanTrailer } from '../../models/krpan-trailer';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-krpan-trailer-information',
  standalone: true,
  imports: [TrailerDataItemComponent, GalleriaModule, ImageModule, YouTubePlayerModule],
  templateUrl: './krpan-trailer-information.component.html',
  styleUrl: './krpan-trailer-information.component.css'
})
export class KrpanTrailerInformationComponent implements OnInit, AfterViewInit {
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  galleryContainerStyle: any = { 'max-width': '50%' };
  @Input({required: true}) trailer!: KrpanTrailer
  @Output() craneSelected = new EventEmitter<number>();
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

  getCranes(){
    return this.trailer.krpanCrane.map(krpanCrane => ({ id: krpanCrane.id, name: krpanCrane.name }));
  }

  craneSelectedEmit(craneId: number){
    this.craneSelected.emit(craneId)
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
        itemImageSrc: this.trailer.imgUrls[0],
        thumbnailImageSrc:  this.trailer.imgUrls[0],
        alt: 'Description for trailer image 1',
        title: 'Trailer image 1'
      },
      {
        itemImageSrc: this.trailer.imgUrls[1],
        thumbnailImageSrc:  this.trailer.imgUrls[1],
        alt: 'Description for trailer image 2',
        title: 'Trailer image 2'
      }
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
