import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from './model';



@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(books: Libro[], searchText: string): any[] {

    if (!books) {
      return [];
    }
    if (!searchText) {
      return books;
    }
    searchText = searchText.toLocaleLowerCase();

    return books.filter(book => {
      let title = book.title.toLocaleLowerCase();
      let id = book.id.toString().toLocaleLowerCase();
      let autor = book.autor.toLocaleLowerCase();
      let editorial = book.editorial.toLocaleLowerCase();
      return title.includes(searchText) || id.includes(searchText) || autor.includes(searchText) || editorial.includes(searchText);
    });
  }
}
