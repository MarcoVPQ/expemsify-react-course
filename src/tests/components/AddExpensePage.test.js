import React from 'react'
import { shallow } from 'enzyme'

import { AddExpensePage } from '../../components/CreateExpense'
import expenses from '../fixtures/expenses'

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn()
     history = { push: jest.fn()}
     wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />)
})

test('Should render add expense correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should handle on Submit', () =>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
})
