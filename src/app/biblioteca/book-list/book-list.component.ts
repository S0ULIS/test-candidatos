import { Component, OnInit } from '@angular/core';
import { Libro } from '../model';
import { Observable } from 'rxjs';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  libros: Libro[] = [];
  libros$: Observable<Libro[]> | undefined;

  searchText : string = "";

  constructor(private bibliotecaservice: BibliotecaService) { }

  ngOnInit(): void {
    // Subscribe to Observable
    this.libros = this.bibliotecaservice.initBooks();
    this.libros$ = this.bibliotecaservice.getBooks();
    this.libros$.subscribe(libros => this.libros = libros);
  }


 showAddBook(): void {
    this.bibliotecaservice.setAction("add");
    this.bibliotecaservice.setLibro({
      id :  0,
      title : "",
      autor : "",
      editorial : ""
    });
    this.bibliotecaservice.setFormTitle("Nuevo Libro");
    this.bibliotecaservice.setShow(true);
  
 }

 showEditBook(libroId : number): void {
    this.bibliotecaservice.setAction("edit");
    this.bibliotecaservice.setFormTitle("Editar Libro");
    this.bibliotecaservice.setLibro(this.libros.filter(x => x.id==libroId)[0]);
    this.bibliotecaservice.setShow(true);
 }

}


