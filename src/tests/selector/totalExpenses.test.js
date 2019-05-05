import totalExpenses from '../../selectors/totalExpenses'
import expenses from '../fixtures/expenses'


test('should correctly add up multiple expenses', () => {
    const total = totalExpenses(expenses)
    expect(total).toBe(1099695)
})

test('should add up a single expense', () => {
    const total = totalExpenses([expenses[0]])
    expect(total).toBe(195)
})

test('should retun 0 on empty array', () => {
    const expenses = []
    const total = totalExpenses(expenses)
    expect(total).toBe(0)
})