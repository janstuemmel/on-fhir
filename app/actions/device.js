import { createActions } from 'reflux';

import Provider from '../provider';

let Actions = createActions({
  'get': { children: [ 'completed', 'failed' ] }
});

Actions.get.listen((identifier, date, unit) => {

  let options = { startDate: date, unit: unit };

  Provider[identifier](options, (err, samples) => {
    if (err) {
      Actions.get.failed(err);
    } else {
      Actions.get.completed(samples);
    }
  });
});

module.exports = Actions;
