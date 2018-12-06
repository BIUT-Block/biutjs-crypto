/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

// import {
//   errors as bitcoreErrors
// } from 'bitcore-lib';
const bitcoreErrors = require('bitcore-lib').errors
const spec = {
  name: 'ECIES',
  message: 'Internal Error on bitcore-ecies Module {0}',
  errors: [{
    name: 'InvalidPadding',
    message: 'Invalid padding: {0}'
  }]
}

// export default bitcoreErrors.extend(spec)
module.exports = bitcoreErrors.extend(spec)
