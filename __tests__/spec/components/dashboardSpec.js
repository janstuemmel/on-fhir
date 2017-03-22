import React from 'react';

import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import App from '../../../app/components/dashboard';

describe('DashboardSpec', () => {

  it('should initialize Dashboard', () => {

    // given
    const wrapper = shallow(<App />);

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });
});
