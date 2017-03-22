jest.mock('react-native-apple-healthkit', () => {
  return {
    getWeightSamples: jest.fn((opt, cb) => {
      cb(null, [
        { value: '123', startDate: new Date(2017,1,1).toISOString() },
        { value: '321', startDate: new Date(2017,1,1).toISOString() },
      ]);
    })
  }
});

import React from 'react';

import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import HealthKit from 'react-native-apple-healthkit';

import Detail from '../../../app/components/detail';

describe('DetailSpec', () => {

  it('should initialize Detail', () => {

    // given
    const wrapper = shallow(
      <Detail
        label="Weight"
        identifier="weight"
        unit="gram"
        normalize={(val) => val}
      />
    );

    // when
    wrapper.instance().componentDidMount();

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();

  });


  it('should initialize Detail with items', () => {

    // given
    const wrapper = shallow(
      <Detail
        label="Weight"
        identifier="weight"
        unit="gram"
        normalize={(val) => val}
      />
    );

    // when
    wrapper.instance().componentDidMount();

    // then
    expect(enzymeToJson(wrapper.find('Item'))).toMatchSnapshot();

  });


  it('should initialize Detail without items', () => {

    // given
    HealthKit.getWeightSamples.mockImplementationOnce((opt, cb) => cb(null, []))
    const wrapper = shallow(
      <Detail
        label="Weight"
        identifier="weight"
        unit="gram"
        normalize={(val) => val}
      />
    );

    // when
    wrapper.instance().componentDidMount();

    // then
    expect(enzymeToJson(wrapper.find('Item'))).toMatchSnapshot();

  });

});
