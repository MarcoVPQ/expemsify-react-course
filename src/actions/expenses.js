import database from '../firebase/firebase'


//ADD_EXPENSE
 export const addExpense = (expense) =>({
        type : 'ADD_EXPENSE',
        expense
    })

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const { 
            description = '', 
            amount = 0, 
            createdAt = 0,
            note = ''
        } = expenseData;

        const expense = { description, amount, createdAt, note }

        return database.collection(`users/${uid}/expenses`)
        .add(expense)
        .then(docRef => {
            dispatch(addExpense({
                id: docRef.id,
                ...expense
            }))
        })
    }
}


///SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
})

export const startSetExpenses =() =>{
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.collection(`users/${uid}/expenses`)
        .get()
        .then( querySnapshot => {
            const expenses = []
            querySnapshot.forEach( doc => {
                expenses.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            dispatch(setExpenses(expenses))
        })
    }
};


//REMOVE_EXPENSE

export const removeExpense =( { id } = {} )=>({
    type: 'REMOVE_EXPENSE',
    id
})

export const startRemoveExpense =({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.doc(`users/${uid}/expenses/${id}`)
              .delete()
              .then(() => {
                dispatch(removeExpense({id}))
              })
        
    }
}
//EDIT_EXPENSE

export const editExpense = (id, updates = {}) =>({
    type: "EDIT_EXPENSE",
    id,
    updates
})


export const startEditExpense = (id, updates = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.doc(`users/${uid}/expenses/${id}`)
                        .update(updates)
                        .then(() => {
                            dispatch(editExpense(id, updates))
                        })
    }
}