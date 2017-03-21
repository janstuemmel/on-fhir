import { Store } from 'reflux'

import DeviceActions from '../actions/device';

class DeviceStore extends Store {

  constructor() {
    super();
    this.state = { samples: [], fetching: true, err: null };
    this.listenables = DeviceActions;
  }

  onGetCompleted(samples) {
    this.setState({ samples: samples, fetching: false })
  }

  onGetFailed(err) {
    this.setState({ fetching: false, err: err })
    console.log(err);
  }
}

module.exports = DeviceStore;
