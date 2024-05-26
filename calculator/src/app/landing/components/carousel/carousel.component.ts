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
        itemImageSrc: '../../../../assets/krpan_default11.jpg',
        thumbnailImageSrc: '../../../../assets/krpan_default11.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/krpan_default6.jpg',
        thumbnailImageSrc: '../../../../assets/krpan_default6.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/krpan_default4.jpg',
        thumbnailImageSrc: '../../../../assetskrpans_default4.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/krpan_default7.jpg',
        thumbnailImageSrc: '../../../../assetskrpans_default7.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/krpan_default9.jpg',
        thumbnailImageSrc: '../../../../assets/krpan_default9.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      { 
        itemImageSrc: '../../../../assets/krpan_default8.jpg',
        thumbnailImageSrc: '../../../../assets/krpan_default8.jpg',
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
