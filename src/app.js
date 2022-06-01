import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filter';
import getVisibleExpense from './selectors/expenseSelector';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Router } from 'react-router-dom';
import history from './history';

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));


const state = store.getState();
const visibleExpenses = getVisibleExpense(state.expenses, state.filters)
console.log(visibleExpenses);


const jsx = (
    <Router history={history}>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </Router>
);

ReactDOM.render(jsx, document.getElementById('app'));
