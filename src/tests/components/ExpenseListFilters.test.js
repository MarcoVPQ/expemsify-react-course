import  React  from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'

import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'
import { wrap } from 'module';

let setTextFilter, sortByDate, sortByAmount , setStartDate, setEndDate, wrapper;


beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
    <ExpenseListFilters
        filters={filters} 
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
     /> )
})


test('Should render expense list correctly', () => {
    expect(wrapper).toMatchSnapshot()
})


test('should render expenses filters with alt data', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('Should handle text change',() => {
        const value  = 'Gas'
        wrapper.find('input').at(0).simulate('change', {
            target: { value }
        })
        expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should handle sortby date',() => {
    const value = 'date'
    wrapper.find('select').simulate('change',{ 
        target: { value } 
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should handle sortby amount',() => {
    const value = 'amount'
    wrapper.find('select').simulate('change',{ 
        target: { value } 
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes',() => {
    const startDate = moment(0)
    const endDate = moment(0).add(3, 'days')
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate})
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
})

test('Should handle date focus change',() => {
    const calendarFocused = 'startDate'
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})