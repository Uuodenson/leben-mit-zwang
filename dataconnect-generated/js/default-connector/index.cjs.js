const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'leben-mit-zwang',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

