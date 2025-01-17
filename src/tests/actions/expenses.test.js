import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { 
       startAddExpense, 
       removeExpense, 
       editExpense,
       addExpense, 
       setExpenses, 
       startSetExpenses, 
       startRemoveExpense,
       startEditExpense 
     } from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'
import expensesReducer from './../../reducers/expenses';

///JEST FUNCTIONS
//toBe  for simple variables
//toEqual for objects
//expect.any(dynamic data)

const uid = 'thisisthetestui'
const createMockStore = configureMockStore([thunk])
const defaultAuthState = {auth: { uid }}

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt};
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() =>  done())
})

test('Should set up remove xpense action object', () => {
    const action = removeExpense({id: '123abc'});

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expenses from firebase',(done) => {
    const id = expenses[1].id
    const store = createMockStore(defaultAuthState)
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
    })
})
test('should edit an existing expense', () => {
    const action = editExpense('123abc', { note: 'New note'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates:{ 
            note: 'New note'
        }
        
    })
})

test('should edit expense in firebase', (done) => {
    const store =  createMockStore(defaultAuthState)
    const id = expenses[0].id
    const updates = {
       amount: 21045
    }
    
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
       return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done()
    })
   
})

test('should set up add expense with passed values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense : expenses[2]
    })
})


test('Should add expense to database and store', (done) => {
    const store =  createMockStore(defaultAuthState)
    const expensesData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expensesData))
    .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id: expect.any(String),
                ...expensesData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        .then((snapshot)=> {
            expect(snapshot.val()).toEqual(expensesData)
            done();
        })
        
    })
})

test('Should add expense with defaults to database and store', (done) => {
    const store =  createMockStore(defaultAuthState)
    const expense = {}
    const {
        description = '', 
        amount = 0, 
        createdAt = 0,
        note = ''
    } = expense

    const expensesData = {description,amount, createdAt, note}

    store.dispatch(startAddExpense(expensesData))
    .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id: expect.any(String),
                ...expensesData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        .then((snapshot)=> {
            expect(snapshot.val()).toEqual(expensesData)
            done();
        })
        
    })
})


test('Should setup set expenses action object with data', () => {
    const action =  setExpenses(expenses)

    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    })
})

test('should set expenses', () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done()
    })
})

