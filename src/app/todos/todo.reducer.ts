import { Action, createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, deleteAll } from './todo.action';
import { Todo } from './models/todo.model';


const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del capitan america')
];

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, { texto }) => [...state, new Todo( texto )] ),

    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),

    on(toggle, (state, { id }) => {
      return state.map( todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completado: !todo.completado
            };
          } else {

            return todo;
          }
      });
    }),

    on(editar, (state, { id, texto }) => {
      return state.map( todo => {
          if (todo.id === id) {
            return {
              ...todo,
              texto
            };
          } else {

            return todo;
          }
      });
    }),

    on(toggleAll, (state, { completado }) => {

      return state.map(( todo ) => {

          return {
            ...todo,
            completado
          };

      });

    }),

    on( deleteAll, state => {

      return state.filter(( todo ) => !todo.completado );

    }),
  );



export function todoReducer(state, action: Action) {
    return _todoReducer(state, action);
  }