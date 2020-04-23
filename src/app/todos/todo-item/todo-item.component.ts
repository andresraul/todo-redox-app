import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../todo.action';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.txtInput = new FormControl( this.todo.texto, Validators.required );
    this.chkCompletado = new FormControl( this.todo.completado );


    this.chkCompletado.valueChanges.subscribe((valor) => {

      this.store.dispatch( actions.toggle({id: this.todo.id }) );
      // console.log( valor );
    });

  }

  editar() {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();

    }, 1);

  }

  terminarEdicion() {
    this.editando = false;

    console.log(this.txtInput.invalid);

    if ( this.txtInput.invalid ) { return; }
    if ( this.txtInput.value === this.todo.texto ) { return; }

    this.store.dispatch( actions.editar({ id: this.todo.id, texto: this.txtInput.value }) );
  }

  borrar() {
    this.store.dispatch( actions.borrar({ id: this.todo.id }) );
  }

}
