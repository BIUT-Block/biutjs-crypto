/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

// import {
//     util as bitcoreUtil,
//     crypto as bitcoreCrypto
// } from 'bitcore-lib';

// const $ = bitcoreUtil.preconditions;
// const Random = bitcoreCrypto.Random;
// const Hash = bitcoreCrypto.Hash;

// import * as AES from './aes';
// import CBC from './cbc';

const bitcoreUtil = require('bitcore-lib').util
const bitcoreCrypto = require('bitcore-lib').crypto
const $ = bitcoreUtil.preconditions
const Random = bitcoreCrypto.Random
const Hash = bitcoreCrypto.Hash

const AES = require('./aes')
const CBC = require('./cbc')

// Symmetric encryption with AES and CBC convenience class
const AESCBC = function AESCBC () { }

function encrypt (messagebuf, passwordstr) {
  $.checkArgument(messagebuf)
  $.checkArgument(passwordstr)
  const cipherkeybuf = Hash.sha256(Buffer.from(passwordstr))
  return AESCBC.encryptCipherkey(messagebuf, cipherkeybuf)
}

function decrypt (encbuf, passwordstr) {
  $.checkArgument(encbuf)
  $.checkArgument(passwordstr)
  const cipherkeybuf = Hash.sha256(Buffer.from(passwordstr))
  return AESCBC.decryptCipherkey(encbuf, cipherkeybuf)
}

function encryptCipherkey (messagebuf, cipherkeybuf, ivbuf) {
  $.checkArgument(messagebuf)
  $.checkArgument(cipherkeybuf)
  $.checkArgument(ivbuf)
  ivbuf = ivbuf || Random.getRandomBuffer(128 / 8)
  const ctbuf = CBC.encrypt(messagebuf, ivbuf, AES, cipherkeybuf)
  const encbuf = Buffer.concat([ivbuf, ctbuf])
  return encbuf
}

function decryptCipherkey (encbuf, cipherkeybuf) {
  $.checkArgument(encbuf)
  $.checkArgument(cipherkeybuf)
  const ivbuf = encbuf.slice(0, 128 / 8)
  const ctbuf = encbuf.slice(128 / 8)
  const messagebuf = CBC.decrypt(ctbuf, ivbuf, AES, cipherkeybuf)
  return messagebuf
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
module.exports.encryptCipherkey = encryptCipherkey
module.exports.decryptCipherkey = decryptCipherkey