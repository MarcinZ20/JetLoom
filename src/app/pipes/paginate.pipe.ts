import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(trips: Trip[], currentPage: number, tripsPerPage: number): Trip[] {
    currentPage = Number(currentPage);
    tripsPerPage = Number(tripsPerPage);
    const startIndex = (currentPage - 1) * tripsPerPage;
    const endIndex = startIndex + tripsPerPage;
    console.log('Paginate pipe: ', currentPage, tripsPerPage, startIndex, endIndex)
    return trips.slice(startIndex, endIndex);
  }

}
