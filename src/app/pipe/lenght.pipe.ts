import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lenght'
})
export class LenghtPipe implements PipeTransform {

  transform(str: string, lenght: number): string {
		const arr = str.split(' ');
		let result = '';

		for (let i = 0; i < arr.length; i++) {
			if ((result.length + arr[i].length + 1) > lenght) {
				result = result.trim().replace(/[.,?!-'"]$/g,
				'').concat('...');
				break;
			}
			result += ` ${arr[i]}`;
		}
    return result;
  }
}