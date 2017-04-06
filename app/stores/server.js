import { Store } from 'reflux';

import { concat } from 'lodash';

import ServerActions from '../actions/server';

class ServerStore extends Store {

  constructor() {
    super();
    this.state = { resources: [], fetching: false, err: null };
    this.listenables = ServerActions;
  }

  onAddCompleted(data) {
    let resources = this.state.resources;
    resources = concat(resources, [ data ]);
    this.setState({ resources: resources, fetching: false, err: null });
  }

  onAddFailed(err) {
    this.setState({ resources: this.state.resources, fetching: false, err: null });
  }
}

module.exports = ServerStore;
