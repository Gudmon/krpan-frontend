import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KrpanTrailer } from '../../models/krpan-trailer';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CloudinaryModule } from '@cloudinary/ng';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-krpan-trailer-information',
  standalone: true,
  imports: [TrailerDataItemComponent, GalleriaModule, ImageModule, YouTubePlayerModule, CloudinaryModule],
  templateUrl: './krpan-trailer-information.component.html',
  styleUrl: './krpan-trailer-information.component.css'
})
export class KrpanTrailerInformationComponent implements OnInit, AfterViewInit {
  activeIndex: number = 0;
  thumbnails: CloudinaryImage[] = [];
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  galleryContainerStyle: any = { 'max-width': '50%' };
  @Input({required: true}) trailer!: KrpanTrailer
  @Output() craneSelected = new EventEmitter<number>();
  @ViewChild("youTubePlayer") youTubePlayer!: ElementRef<HTMLDivElement>;

  private cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  @HostListener('document:keyup.escape', ['$event'])
  onKeyup() {
    this.displayBasic = false;
  }

  ngOnInit(): void {
     this.thumbnails = (this.trailer.imageUrls ?? []).map((imgUrl) => this.cld.image(imgUrl).resize(fill().width(300).height(200)));
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

  imageSelected(image: CloudinaryImage, idx: number) {
        this.activeIndex = idx;
        this.displayBasic = true;
  }

  private setImages(){
    this.images = this.trailer.images.map((img) => ({
            itemImageSrc: img.toURL(),
            thumbnailImageSrc: img.toURL(),
            alt: 'Trailer image',
            title: 'Trailer image'
        }));
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
