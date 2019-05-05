import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {})=>({
    type : 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1}= {}) =>({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = ()=>({
    type: 'RESET'
});

const setCount = ({count} = {}) =>({
    type: 'SET',
    count
})

const countReducer = ()=>({});
//Reducer
//1. are pure functions do not interact with anything outside its scope
//2. Never change state or action

const store = createStore((state = {count:0}, action)=>{

switch(action.type){
    
    case 'INCREMENT':
    return{
        count: state.count + action.incrementBy
    };

    case 'DECREMENT':

    return{
        count: state.count - action.decrementBy
    };
    case 'RESET':
    return{
        count: 0
    };
    case 'SET':
    return{
        count: action.count
    };

    default:
    return state;
}
    
});

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(resetCount());

store.dispatch(setCount({count: -101}));

///Actions - object that gets sent to the store

//i'like to increment by 1

/*store.dispatch({
    type: "INCREMENT",
    incrementBy: 5
});*/


/*
store.dispatch({
    type: "INCREMENT"
   
});


store.dispatch({
    type: "RESET"
});

store.dispatch({
    type: "DECREMENT"
});

store.dispatch({
    type: "DECREMENT",
    decrementBy : 10
});

store.dispatch({
    type: "SET",
    count : 101
});

*/


