import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';
import { biblioteca} from './data';
import { Libro } from './model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {


  private libros$ = new Subject<Libro[]>();
  libros : Libro[] = biblioteca;

  private showForm$ = new Subject<Boolean>();
  showForm : Boolean = false;

  private formTitle$ = new Subject<string>();
  formTitle :string = "";

  action : string = "add";
  libro : Libro = {
    id : 0,
    title : "",
    autor : "",
    editorial : ""
  };
  private libro$ = new Subject<Libro>();



  constructor() { }

  getFormTitle$(): Observable<string>{
    return this.formTitle$.asObservable();
  }

  setFormTitle(title : string) : void {
    this.formTitle = title;
    this.formTitle$.next(this.formTitle);
  }

  initBooks(): Libro[] {
    //initial state return
    console.log(this.libros);
    return this.libros;
  }


  pushBook(libro : Libro): void {
    this.libros.push(libro);
    this.libros$.next(this.libros);
  }
  setAction(action : string): void {
    this.action=action;
  }

  setShow(show : Boolean){
    this.showForm = show;
    this.showForm$.next(this.showForm);
  }

  getBooks(): Observable<Libro[]> {
    return this.libros$.asObservable();
  }

  getShowForm(): Observable<Boolean> {
    return this.showForm$.asObservable();
  }

  addBook(libro : Libro): void {
    if (this.action=="add"){
      this.pushBook(libro);
    }else if(this.action=="edit"){
      let libroLocal = this.libros.filter(x => x.id==this.libro.id)[0];
      libroLocal.autor = libro.autor;
      libroLocal.editorial = libro.editorial;
      libroLocal.title = libro.title;
      this.libros$.next(this.libros);
    }
    
  }

  setLibro(l : Libro): void {
    
    this.libro = l;
    this.libro$.next(this.libro);
  }

  getLibro$(): Observable<Libro> {
    return this.libro$.asObservable();
  }

}



