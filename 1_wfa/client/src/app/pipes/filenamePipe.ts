import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const pathSegments = value.split('/');
      return pathSegments[pathSegments.length - 1];
    }
    return '';
  }
}