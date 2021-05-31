import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../biblioteca.service';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { Libro } from '../model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  libros : Libro[] = [];
  private libros$ : Observable<Libro[]> | undefined;

  private libro$ : Observable<Libro> | undefined;
  id : number = 0;
  title : string = "";
  autor : string = "";
  editorial : string = "";

  formTitle : string = "Nuevo Libro";
  formTitle$ : Observable<string> | undefined;

  showForm : Boolean = false;
  private showForm$ : Observable<Boolean> | undefined;

  constructor(private bibliotecaservice: BibliotecaService) { }

  

  ngOnInit(): void {

    //Subscribe to all Observables

    this.libros = this.bibliotecaservice.initBooks();
    this.showForm$ = this.bibliotecaservice.getShowForm();
    this.showForm$.subscribe(showForm => this.showForm = showForm);
    this.libros$ = this.bibliotecaservice.getBooks();
    this.libros$.subscribe(libros => this.libros = libros);
    this.libro$ = this.bibliotecaservice.getLibro$();
    this.libro$.subscribe(libro => {
      this.autor = libro.autor;
      this.id = libro.id;
      this.title = libro.title;
      this.editorial = libro.editorial;
    });
    this.formTitle$ = this.bibliotecaservice.getFormTitle$();
    this.formTitle$.subscribe( title => this.formTitle=title);

    
  }

  
  addBtn(): void{
    let l : Libro = {
      id: this.libros.length+1,
      autor: this.autor,
      title: this.title,
      editorial: this.editorial
    };
    this.bibliotecaservice.addBook(l);
    this.autor = "";
    this.editorial = "";
    this.title = "";
    this.bibliotecaservice.setShow(false);
  }


}
