import { login, logout } from './../../actions/aut';


test('should generate login action', () => {
    const uid = 'AXCFFFFf'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('Should generate logout action', () => {
    const action = logout()

    expect(action).toEqual({
        type: 'LOGOUT'
    })
})