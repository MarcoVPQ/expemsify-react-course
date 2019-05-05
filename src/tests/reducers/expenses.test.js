import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses';




test('should set default state', () => {
    const state = expensesReducer(undefined,{type: "@@INIT"})
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }

    const state = expensesReducer(expenses,action)

    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }

    const state = expensesReducer(expenses,action)

    expect(state).toEqual(expenses)
})

///should add expenses


test('should add expenses', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Strawberries',
            note: '',
            amount: 250,
            createdAt: 0
        
        }
    }

    const state = expensesReducer(expenses, action)


    expect(state.length).toBe(4)
})

///should edit an expenses

test('should edit an existing expense', () => {

    const id = '1'

    const action = {
        type: 'EDIT_EXPENSE',
        id,
        updates: {
            description : 'Bubble gum'
        }
        
    }

    const state = expensesReducer(expenses,action)
  
    

    expect(state[0].description).toBe('Bubble gum')
})

//should not edit expenses if expense not found

test('should not edit non existing expense', () => {

    const id = '5'

    const action = {
        type: 'EDIT_EXPENSE',
        id,
        updates: {
            description : 'Bubble gum'
        }
        
    }

    const state = expensesReducer(expenses,action)
  
    

    expect(state).toEqual(expenses);
})