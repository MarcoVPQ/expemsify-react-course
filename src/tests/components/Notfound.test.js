import React from 'react';
import { shallow } from 'enzyme';

import Notfound from '../../components/NotFound'

test('should render not Found component', ()=> {
    const wrapper = shallow(<Notfound />)
    expect(wrapper).toMatchSnapshot()
})