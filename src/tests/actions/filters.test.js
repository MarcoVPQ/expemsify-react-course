import { setTextFilter, 
         sortByDate, 
         sortByAmount, 
         setStartDate, 
         setEndDate} from '../../actions/filters'
         
import moment from 'moment'

test('Should generate set start date action generator', () => {
    const action = setStartDate(moment(0))


    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate : moment(0)
    })
   
})


test('Should generate set end date action generator', () => {
    const action = setEndDate(moment(0))

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('it should set up text filter default', () => {
    const action = setTextFilter()

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})


test('it should set up text filter with value', () => {
    const action = setTextFilter('Rent')

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Rent'
    })
})


test('it should set up sortBy date', () => {
    const action = sortByDate()

    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('it should set up amount date', () => {
    const action = sortByAmount()

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})