import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css'
})
export class HighlightsComponent implements OnInit, AfterViewInit  {
  scrollers!: NodeListOf<Element>;

  constructor() {
    // Don't query the DOM in the constructor, wait until ngOnInit or ngAfterViewInit
  }

  ngOnInit(): void {
    // Initialize or fetch data here
  }

  ngAfterViewInit(): void {
    this.scrollers = document.querySelectorAll('.scroller');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.addAnimation();
    }
  }

  addAnimation() {
    // Convert NodeList to an array using Array.from
    Array.from(this.scrollers).forEach((scroller: Element) => {
      scroller.setAttribute('data-animated', 'true');

      const scrollerInner = scroller.querySelector('.scroller__inner');
      const scrollerContent: Node[] = Array.from(scrollerInner!.children);

      scrollerContent.forEach((item: Node) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute('aria-hidden', 'true');
        scrollerInner!.appendChild(duplicatedItem);
      });
    });

    // OR using the spread operator
    // [...this.scrollers].forEach((scroller: Element) => {
    //   scroller.setAttribute('data-animated', 'true');
    // });
  }
}
