var madlibs = require('./')
var assert = require('assert')

Object.keys(madlibs).forEach(test)

function test(fnn) {
  var val = madlibs[fnn]()
  print(fnn, val)
  assert.ok(val.length > 0)
}

function print(name, val) {
  var str = [
     Array(30 - name.length).join(' '),
    name,
    ' - ',
    val
  ].join('')
  console.log(str)
}
