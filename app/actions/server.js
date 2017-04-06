import { createActions } from 'reflux';

const config = require('../config.json');

let Actions = createActions({
  'add': { children: [ 'completed', 'failed' ] }
});

Actions.add.listen((data) => {

  const url = [ config.endpoint, data.resourceType ].join('/');

  // console.log(1);
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then((response) => {
    return response.json();
  })
  .then(res => {
    Actions.add.completed(res);
  })
  .catch(err => {
    Actions.add.failed(err);
  });

});

module.exports = Actions;
