import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startLogout, wrapper;

beforeEach(() => {
    startLogout = jest.fn()
    wrapper = shallow(<Header startLogout={startLogout} />);
})

test('it should render header component', () => {
    expect(wrapper).toMatchSnapshot();   
})
test('Should call startLogout' , () => {
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})