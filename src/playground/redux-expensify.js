import { createStore, combineReducers } from "redux";
import { addExpense, editExpense, removeExpense } from "../actions/expenses";
import { sortByAmount, sortByDate, setTextFilter, setEndDate, setStartDate } from "../actions/filter";
import { expensesReducer } from "../reducers/expensesReducer";
import { filtersReducer } from "../reducers/filterReducer";
import { getVisibleExpense } from "../selectors/expenseSelector";






store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpense(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100.00, createdAt: -4000 }))

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300.00, createdAt: -5000 }))

// const deleteExpense = store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// console.log(expenseOne);
// console.log(deleteExpense);

// const modifyExpense = store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 })); 

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

const sortAmount = store.dispatch(sortByAmount());
// const sortDate = store.dispatch(sortByDate());

// const startDate = store.dispatch(setStartDate(0));
// const startDate2 = store.dispatch(setStartDate());

// const endDate = store.dispatch(setEndDate(1250));
// const endDate2 = store.dispatch(setEndDate());

const demoState = {
    expenses: [
        {
            id: 'Trsx456894165',
            description: 'Shop 1',
            note: 'This was the final payment for that address',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}