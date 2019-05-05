import authReducer from "../../reducers/authReducer";

test('Should set authReducer default state', () => {
    const state = authReducer(undefined,{type: "@@INIT"})
    expect(state).toEqual({})
})


test('Should set uid for login', () => {
    const uid = "12345"
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer({}, action)

    expect(state.uid).toEqual(action.uid)
})

test('Should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: '123456'}, action)

    expect(state).toEqual({})
})