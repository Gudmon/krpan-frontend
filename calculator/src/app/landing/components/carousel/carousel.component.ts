import { GalleriaModule } from 'primeng/galleria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;
  position: string = 'bottom';
  showIndicatorsOnItem: boolean = false;
  positionOptions: any[] | undefined = [];


  ngOnInit(): void {
    this.setImages();
    this.setResponsiveOptions();
    this.setPositionOptions();
  }

  setImages(): void {

    this.images = [
      { 
        itemImageSrc: '../../../../assets/palms_default.png',
        thumbnailImageSrc: '../../../../assets/palms_default.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default12.png',
        thumbnailImageSrc: '../../../../assets/palms_default12.png',
        alt: 'Description for Image 3',
        title: 'Title 3'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default3.png',
        thumbnailImageSrc: '../../../../assets/palms_default3.png',
        alt: 'Description for Image 3',
        title: 'Title 3'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default6.png',
        thumbnailImageSrc: '../../../../assets/palms_default6.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default7.png',
        thumbnailImageSrc: '../../../../assets/palms_default7.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default8.png',
        thumbnailImageSrc: '../../../../assets/palms_default.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/palms_default14.png',
        thumbnailImageSrc: '../../../../assets/palms_default14.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
    ];
  }

  setResponsiveOptions(){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
    ];
  }

  setPositionOptions(){
    this.positionOptions = [
      {
          label: 'Bottom',
          value: 'bottom'
      },
      {
          label: 'Top',
          value: 'top'
      },
      {
          label: 'Left',
          value: 'left'
      },
      {
          label: 'Right',
          value: 'right'
      }
  ];
  }
}
