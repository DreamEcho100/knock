import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { initState } from './initialState';
import { reducer } from './reducer';

const useMyState = () => useReducer(reducer, initState());

export const {
	Provider: SharedCustomerStateProvider,
	useTracked: useSharedCustomerState,
} = createContainer(useMyState);
