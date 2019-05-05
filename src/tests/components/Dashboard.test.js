import React from 'react';
import { shallow } from 'enzyme';

import ExpenseDashBoardPage from '../../components/Dashboard'

test('should render dashboard component', ()=> {
    const wrapper = shallow(<ExpenseDashBoardPage />)
    expect(wrapper).toMatchSnapshot()
})