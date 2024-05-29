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
          itemImageSrc: '../../../../assets/krpan_default.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default_min.jpg',
          alt: 'Image 2',
          title: 'Title 2'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default3.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default3_min.jpg',
          alt: 'Image 3',
          title: 'Title 3'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default12.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default12_min.jpg',
          alt: 'Image 4',
          title: 'Title 4'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default10.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default10_min.jpg',
          alt: 'Image 5',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default13.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default13_min.jpg',
          alt: 'Image 6',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default14.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default14_min.jpg',
          alt: 'Image 7',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default15.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default15_min.jpg',
          alt: 'Image 8',
          title: 'Title 5'
        },
        {
          itemImageSrc: '../../../../assets/krpan_default16.jpg',
          thumbnailImageSrc: '../../../../assets/krpan_default16_min.jpg',
          alt: 'Image 9',
          title: 'Title 5'
        },
      ];
  }

  imageClick(index: number) {
      this.activeIndex = index;
      this.displayCustom = true;
  }
}
