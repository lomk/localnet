import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class SortByPipe implements PipeTransform {


  transform(records: Array<any>, args?: any): any {
if (records !== undefined) {
  return records.sort(function (a, b) {
    if (a[args.property] < b[args.property]) {
      return -1 * args.direction;
    } else if (a[args.property] > b[args.property]) {
      return 1 * args.direction;
    } else {
      return 0;
    }
  });
}
  };

  // transform(array: Array<any>, args: string, order: number): Array<any> {
  //   if (typeof args[0] === 'undefined') {
  //     return array;
  //   }
  //
  //   if (array !== undefined) {
  //     array.sort((a: any, b: any) => {
  //       if (a[args].toLowerCase() > b[args].toLowerCase()) {
  //         if (order == 1) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //       }
  //       if (a.hostname.toLowerCase() < b.hostname.toLowerCase()) {
  //         if (order == 1) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       }
  //       return 0;
  //     });
  //   }
  //   return array;
  // }
}
