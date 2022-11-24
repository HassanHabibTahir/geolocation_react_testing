import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './from/formSlice';
 

export const store = configureStore({
    // in this Reducer all root reducer cover which is called using useSelector hooks
reducer:{
    tasks: todoReducer,
}

});