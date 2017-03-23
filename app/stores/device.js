import { Store } from 'reflux'

import DeviceActions from '../actions/device';

class DeviceStore extends Store {

  constructor() {
    super();
    this.state = { samples: [], fetching: false, err: null };
    this.listenables = DeviceActions;
  }

  onGetCompleted(samples) {
    this.setState({ samples: samples, fetching: false, err: null })
  }

  onGetFailed(err) {
    this.setState({ samples: [], fetching: false, err: err })
  }
}

module.exports = DeviceStore;
