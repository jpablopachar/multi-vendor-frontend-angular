import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'appDiscount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discount: number): number {
    return price - Math.floor((price * discount) / 100);
  }
}
