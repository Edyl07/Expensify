import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})

 
// REMOVE EXPENSE
const removeExpense = ({ id = 0} = {}) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
});


// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
}); 


// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_TEXT_FILTER
const setTextFilter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expense Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.expense.id);
        
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            })
        default:
            return state;
    }
};


// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}


// get visible expense
const  getVisibleExpense = (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : 1;
        }else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}


// Creation store

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

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