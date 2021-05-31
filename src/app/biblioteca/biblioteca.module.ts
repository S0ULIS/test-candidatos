import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { BookListComponent } from './book-list/book-list.component';
import { BibliotecaService } from './biblioteca.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './book-form/book-form.component';



@NgModule({
  declarations: [
    FilterPipe,
    BookListComponent,
    BookFormComponent
  ],
  exports: [
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    BibliotecaService
  ]
})
export class BibliotecaModule { }
