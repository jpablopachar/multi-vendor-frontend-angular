/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CarouselConfig {
  loop?: boolean;
  margin?: number;
  mouseDrag?: boolean;
  touchDrag?: boolean;
  pullDrag?: boolean;
  dots?: boolean;
  smartSpeed?: number;
  navSpeed?: number;
  navText?: string[];
  responsive?: { [key: number]: { items: number } };
  nav?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  autoplayHoverPause?: boolean;
  [key: string]: any;
}
