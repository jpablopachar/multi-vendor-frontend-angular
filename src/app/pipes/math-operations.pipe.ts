import { Pipe, type PipeTransform } from '@angular/core'

type MathOperation = 'simple' | 'division' | 'discount';

@Pipe({
  name: 'appMathOperations',
  standalone: true,
})
export class MathOperationsPipe implements PipeTransform {
  transform(value: number, operation: MathOperation, operand?: number) {
    const operations = {
      simple: (): number => Math.floor(value),
      division: (): number => Math.floor(value / operand!),
      discount: (): number => value - Math.floor((value * operand!) / 100),
    };

    return operations[operation]();
  }
}
