/**
 * make sure that the given obj is a buffer
 * @param {string|Buffer} bufferOrString
 * @return {Buffer}
 */
function ensureBuffer (bufferOrString) {
  // make sure its a buffer
  if (typeof bufferOrString === 'string')
    return Buffer.from(bufferOrString, 'hex')
  else
    return bufferOrString
}

/**
 * Prepair Ethereum address for either raw transactions or browser storage.
 */
function formatAddress (addr) {
  const format = 'hex'
  /*        if (addr.substr(0, 2) == '0x' && format == 'raw') {
              addr = addr.substr(2);
          }*/
  if (addr.substr(0, 2) !== '0x' && format === 'hex')
    addr = '0x' + addr

  return addr
}

module.exports.ensureBuffer = ensureBuffer
module.exports.formatAddress = formatAddress
