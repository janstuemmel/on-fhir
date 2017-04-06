jest.mock('react-native-apple-healthkit', () => {
  return {
    getWeightSamples: jest.fn()
  }
});

import React from 'react';

import { shallow, mount } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import HealthKit from 'react-native-apple-healthkit';

import Detail from '../../../app/components/detail';

const TEST_SAMPLES = [
  { value: '123', startDate: new Date(2017,1,1).toISOString() },
  { value: '321', startDate: new Date(2017,1,1).toISOString() },
];

describe('DetailSpec', () => {

  // afterEach(() => {
  //   jest.resetModules();
  //   jest.resetAllMocks();
  //   jest.resetAllMocks();
  // });

  it('should call componentDidMount', () => {

    // given
    var spy = jest.spyOn(Detail.prototype, 'componentDidMount');

    // when
    const wrapper = mount(
      <Detail
        label="Weight"
        identifier="weight"
        unit="gram"
        normalize={(val) => val}
      />
    );

    // then
    expect(spy).toHaveBeenCalled();

    // after
    spy.mockReset();
    spy.mockRestore();
  });

  it('should have called getWeightSamples', () => {

      // when
      const wrapper = mount(
        <Detail
          label="Weight"
          identifier="weight"
          unit="gram"
          normalize={(val) => val}
        />
      );

      // then
      expect(HealthKit.getWeightSamples).toHaveBeenCalledWith(expect.objectContaining({
          startDate: expect.any(String),
          unit: expect.any(String)
        }),
        expect.any(Function)
      );
  });


  it('should have state with samples', () => {

      // given
      HealthKit.getWeightSamples.mockImplementationOnce((opt, cb) => {
        cb(null, TEST_SAMPLES);
      });

      // when
      const wrapper = mount(
        <Detail
          label="Weight"
          identifier="weight"
          unit="gram"
          normalize={(val) => val}
        />
      );

      // then
      expect(wrapper.state()).toMatchObject({ samples: TEST_SAMPLES });
  });


  it('should have state with error', () => {

      // given
      HealthKit.getWeightSamples.mockImplementationOnce((opt, cb) => {
        cb(true, null);
      });

      // when
      const wrapper = mount(
        <Detail
          label="Weight"
          identifier="weight"
          unit="gram"
          normalize={(val) => val}
        />
      );

      // then
      expect(wrapper.state()).toMatchObject({ err: true });
  });


  it('should render items', () => {

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
      wrapper.setState({ samples: TEST_SAMPLES, err: null, fetching: false });

      // then
      expect(enzymeToJson(wrapper)).toMatchSnapshot()
  });


  it('should render: data error', () => {

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
    wrapper.setState({ samples: [], err: true, fetching: false });

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });


  it('should render: data unavailable', () => {

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
    wrapper.setState({ samples: [], err: null, fetching: false });

    // then
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

});
