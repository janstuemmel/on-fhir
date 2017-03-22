jest.mock('react-native-apple-healthkit', () => {
  return {
    initHealthKit: jest.fn((options, cb) => {
      cb(null, 1);
    })
  }
});

import React from 'react';

import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import HealthKit from 'react-native-apple-healthkit';

import App from '../../../app/app';

describe('AppSpec', () => {

  it('should initialize App (Router)', () => {

    // given
    const wrapper = shallow(<App />);

    // when
    wrapper.setState({ hkAvailable: true });

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });


  it('should not initialize App (Router), HealthKit unavailable', () => {

    // given
    const wrapper = shallow(<App />);

    // when
    wrapper.setState({ hkAvailable: false });

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });


  it('should initialize healthkit', () => {

    // given
    const wrapper = shallow(<App />);

    // when
    wrapper.instance().componentDidMount();

    // then
    expect(HealthKit.initHealthKit).toHaveBeenCalled();
  });


  it('should set hkAvailable to true', () => {

    // given
    const wrapper = shallow(<App />);

    // when
    wrapper.instance().componentDidMount();

    // then
    expect(wrapper.state().hkAvailable).toBe(true);
  });


  it('should set hkAvailable to false', () => {

    // given
    HealthKit.initHealthKit.mockImplementationOnce((opt, cb) => cb(true, null));

    // when
    const wrapper = shallow(<App />);
    wrapper.instance().componentDidMount();

    // then
    expect(wrapper.state().hkAvailable).toBe(false);
  });
});
