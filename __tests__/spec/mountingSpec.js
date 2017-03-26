import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Text } from 'react-native';

describe('Component mounting into jsdom', () => {

  var TestComponent, didMount = jest.fn(), wasPressed = jest.fn();

  beforeEach(() => {
    TestComponent = React.createClass({
      componentDidMount: didMount,
      render: function() {
        return <Text onPress={wasPressed}>{this.props.name}</Text>;
      }
    });
  });


  it('should get jsdom document', () => {

    // when
    const element = document.createElement('div');

    // then
    expect(element).not.toBeNull();
  })


  it('should have props', () => {

    // when
    var c = mount(<TestComponent name="Otto" />);

    // then
    expect(c.props()).toEqual({ name: 'Otto' });

  });


  it('should call componentDidMount', () => {

    // when
    var c = mount(<TestComponent name="Otto" />);

    // then
    expect(didMount).toHaveBeenCalled();
  });


  it('should call onPress', () => {

    // given
    var c = shallow(<TestComponent name="Otto" />);

    // when
    c.simulate('press');

    // then
    expect(wasPressed).toHaveBeenCalled();

  });


  it('should render component into dom', () => {

    // when
    var c = mount(<TestComponent name="Otto" />);

    // then
    expect(c.text()).toBe('Otto');
  });

});
