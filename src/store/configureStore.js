import { combineReducers, createStore } from "redux";
import { expensesReducer } from "../reducers/expensesReducer";
import { filtersReducer } from "../reducers/filterReducer";

// Creation store
export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }));
    
    return store;
};

