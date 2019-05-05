import React from 'react'
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSumary'
import expenses from '../fixtures/expenses'


test('should render Component with 1 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} totalExpenses={expenses[0].amount}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render Component with 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0], expenses[1]]} totalExpenses={expenses[0].amount + expenses[1].amount}/>)
    expect(wrapper).toMatchSnapshot()
})