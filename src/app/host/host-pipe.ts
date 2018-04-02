import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'hostPipe'})
export class HostPipe implements PipeTransform {
  transform(hosts: any, searchText: any): any {
    if(searchText == null) {return hosts;}

    return hosts.filter(function(host){
      return host.hostname.toLowerCase().indexOf(searchText) > -1;
    });
  }
}
