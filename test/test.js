/* global describe it */
const occKey = require('../src/index')
const assert = require('chai').assert
const expect = require('chai').expect

const privateKey = '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460'
const publicKey = occKey.publicKeyFromPrivateKey(privateKey)
// let address = occKey.publicKeyToAddress(publicKey)

const hash = occKey.hash('foobar')
const encrypted = occKey.encryptWithPublicKey(
  publicKey, // publicKey
  'foodbar' // data
)
describe('createPrivateKey', function () {
  it('should generate a OCC PrivateKey', () => {
    occKey.createPrivateKey(function (value) {
      expect(value).to.equal('2400238629a674a372694567f949c94847b76607de151433587c20547aa90460')
    })
  })
})

describe('publicKeyFromPrivateKey', function () {
  it('should generate a OCC publicKey', () => {
    assert.equal(occKey.publicKeyFromPrivateKey(privateKey), '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b')
  })
})

describe('publicKeyToAddress', function () {
  it('should generate a OCC Address', () => {
    assert.equal(occKey.publicKeyToAddress(publicKey), '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a')
  })
})

describe('signature1', function () {
  it('should generate a OCC signature', function () {
    assert.equal(occKey.signHash(privateKey, hash), 'bea5efe042ca20f530daf4353e826d3f13351d3aa8adb50e65d6f8949808308c48c7cbf0871b5f7f4a201eae74bc6c52d2167939e1db705d129883fb88627a9f')
  })
})

describe('verifySignature', function () {
  it('verify a OCC signature', function () {
    let signature = occKey.signHash(privateKey, hash)
    assert.equal(occKey.verifyHashSignature(publicKey, hash, signature), true)
  })
})

describe('encryptWithPublicKey', function () {
  it('encryptWithPublicKey', function () {
    assert.equal(occKey.encryptWithPublicKey(publicKey, 'foodbar'), '0333eec583d04a55ce0aba9dbfb04035e8c6de4f501ecc9b26c08fa501a5ec1507ea1a2c31b25a9bf099a83b998848cd4116df01b8c92c18da147c950fcf81ff99059f532d9b7cfa89338e96fa7a1d98c6dea2746c743b0726e33427ccee5eb237')
  })
})

describe('decryptWithPrivateKey', function () {
  it('decryptWithPrivateKey', function () {
    let message = occKey.decryptWithPrivateKey(
      privateKey, // privateKey
      encrypted // encrypted-data
    )
    assert.equal(message, 'foodbar')
  })
})
