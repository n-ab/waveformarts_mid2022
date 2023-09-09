import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform {
  transform(obj: any): string {
    console.log('obj in prettyJsonPipe: ', obj);
    return JSON.stringify(obj, null, 3);
  }
}