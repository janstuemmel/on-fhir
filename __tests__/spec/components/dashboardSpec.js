jest.mock('react-native-router-flux', () => {
  return {
    Actions: { Detail: jest.fn() }
  }
});

import React from 'react';

import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import App from '../../../app/components/dashboard';

import Router from 'react-native-router-flux';

describe('DashboardSpec', () => {

  it('should initialize Dashboard', () => {

    // when
    const wrapper = shallow(<App />);

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });


  it('should trigger navigation with props', () => {

    // given
    const wrapper = shallow(<App />);

    // when
    wrapper.find('DashboardItem').at(0).simulate('press');

    // then
    expect(Router.Actions.Detail).toHaveBeenCalledWith(expect.objectContaining({
      label: 'Weight',
      identifier: 'weight',
      unit: 'gram'
    }));
  });

});
