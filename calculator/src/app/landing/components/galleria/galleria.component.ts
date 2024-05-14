import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-galleria',
  standalone: true,
  imports: [GalleriaModule, CommonModule, ReactiveFormsModule],
  templateUrl: './galleria.component.html',
  styleUrl: './galleria.component.css'
})
export class GalleriaComponent implements OnInit {
  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  images: any[] | undefined;

  responsiveOptions: any[] = [
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

  constructor() {}

  ngOnInit() {
      this.images = [
        {
          itemImageSrc: '../../../../assets/palms_default5.png',
          thumbnailImageSrc: '../../../../assets/palms_default5_min.png',
          alt: 'Description for Image 2',
          title: 'Title 2'
        },
        {
          itemImageSrc: '../../../../assets/palms_default9.png',
          thumbnailImageSrc: '../../../../assets/palms_default9_min.png',
          alt: 'Description for Image 3',
          title: 'Title 3'
        },
        {
          itemImageSrc: '../../../../assets/palms_default10.png',
          thumbnailImageSrc: '../../../../assets/palms_default10_min.png',
          alt: 'Description for Image 4',
          title: 'Title 4'
        },
        {
          itemImageSrc: '../../../../assets/palms_default8.png',
          thumbnailImageSrc: '../../../../assets/palms_default8_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default6.png',
          thumbnailImageSrc: '../../../../assets/palms_default6_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default7.png',
          thumbnailImageSrc: '../../../../assets/palms_default7_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default11.png',
          thumbnailImageSrc: '../../../../assets/palms_default11_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default12.png',
          thumbnailImageSrc: '../../../../assets/palms_default12_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default13.png',
          thumbnailImageSrc: '../../../../assets/palms_default13_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/palms_default14.png',
          thumbnailImageSrc: '../../../../assets/palms_default14_min.png',
          alt: 'Description for Image 5',
          title: 'Title 5'
        },
      ];
  }

  imageClick(index: number) {
      this.activeIndex = index;
      this.displayCustom = true;
  }
}
