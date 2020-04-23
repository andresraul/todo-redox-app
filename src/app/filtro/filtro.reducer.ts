import { Action, createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';



const estadoInicial: filtrosValidos = 'todos';

const _filtroReducer = createReducer(
      estadoInicial,
      on(setFiltro, (state, { filtro }) => filtro ),
  );


export function filtroReducer(state, action: Action) {
      return _filtroReducer(state, action);
    }
