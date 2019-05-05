import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render expense form component', () => {
    const wrapper = (shallow(<ExpenseForm />))
    expect(wrapper).toMatchSnapshot()
});

test('Should render form with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('Should render error for invalid data', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

test('Should set description on input change',() => {
    const value = "New description"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('description')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('Should set note on textarea', () => {
    const value = "Extra description on textarea"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change',{
        target: {value}
    })
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();

})

test('should set amoount on valid input', () => {
    const value = "23.50"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('amount')).toBe(value)
    expect(wrapper).toMatchSnapshot();
})

test('should not set amount on invalid input', () => {
    const value = '12.222'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('amount')).toBe('')
    expect(wrapper).toMatchSnapshot();
    
})

test('Should call onSubmit prop for valid submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })

})

test('Shold set new date onDateChange',() => {
    const now = moment()
    const wrapper =  shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('Shold set calendar on change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
    expect(wrapper.state('calenderFocused')).toBe(focused)

})