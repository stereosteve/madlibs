var _ = require('underscore')
var fs = require('fs')

fs.readdirSync(__dirname + '/dict').forEach(defineFn)

function defineFn(name) {
  name = name.replace('.js', '')
  exports[name] = function() {
    return pick(require('./dict/' + name))
  }
}

exports.fullName = function() {
  return [
    heads() ? exports.namePrefix() : '',
    exports.firstName(),
    exports.lastName(),
    heads() ? exports.nameSuffix() : '',
  ].join(' ').trim()
}

exports.username = function() {
  return slug(exports.firstName() + ' ' + exports.lastName()).toLowerCase()
}

exports.email = function() {
  return exports.username() + '@' + exports.domainName()
}

exports.gender = function() {
  return heads() ? 'Male' : 'Female'
}

exports.genderLetter = function() {
  return heads() ? 'm' : 'f'
}

exports.streetName = function() {
  return firstOrLastName() + ' ' + exports.streetSuffix()
}

exports.address = function() {
  return _.random(1200) + ' ' + exports.streetName()
}

exports.address2 = function() {
  return heads() ? 'Apt.' : 'Suite' + ' ' + _.random(999)
}

exports.city = function() {
  return [
    heads() ? exports.cityPrefix() : '',
    firstOrLastName(),
    heads() ? exports.citySuffix() : '',
  ].join(' ').trim()
}

exports.zipCode = function() {
  if (heads())
    return numberString('#####')
  else
    return numberString('#####-####')
}

exports.latitude = function() {
  return (_.random(180 * 10000) / 10000.0 - 90.0).toFixed(4);
}

exports.longitude = function() {
  return (_.random(360 * 10000) / 10000.0 - 180.0).toFixed(4);
}

exports.company = function() {
  if (heads())
    return exports.lastName() + ' ' + exports.companySuffix()
  else
    return exports.lastName() + ', ' + exports.lastName() + ' and ' + exports.lastName()
}

exports.domainName = function() {
  return firstOrLastName().toLowerCase() + '.' + exports.tld()
}

exports.ip = function() {
  var result = []
  for (var i=0; i<4; i++) {
    result.push(_.random(255))
  }
  return result.join('.')
}


exports.ip6 = function() {
  var result = []
  _.times(8, function() {
    result.push(group())
  })
  return result.join(':')

  function digit() {
    return _.random(15).toString(16)
  }

  function group() {
    var result = [];
    _.times(4, function() {
      result.push(digit());
    })
    return result.join('')
  }
}


exports.phoneNumber = function() {
  var fmt = pick([
    '###-###-####',
    '(###)###-####',
    '1-###-###-####',
    '###.###.####',
    '###-###-####',
    '(###)###-####',
    '1-###-###-####',
    '###.###.####',
    '###-###-#### x###',
    '(###)###-#### x###',
    '1-###-###-#### x###',
    '###.###.#### x###',
    '###-###-#### x####',
    '(###)###-#### x####',
    '1-###-###-#### x####',
    '###.###.#### x####',
    '###-###-#### x#####',
    '(###)###-#### x#####',
    '1-###-###-#### x#####',
    '###.###.#### x#####'
  ])
  return numberString(fmt)
}

exports.ssn = function() {
  return numberString('###-##-####')
}

exports.creditCard = function() {
  return numberString('####-####-####-####')
}



//////////////// helpers

function numberString(fmt) {
  var result = []
  for(var i=0; i<fmt.length; i++) {
    if (fmt.charAt(i) === '#')
      result.push(_.random(9))
    else
      result.push(fmt.charAt(i))
  }
  return result.join('')
}

function pick(arr) {
  return arr[_.random(arr.length - 1)]
}

function heads() {
  return _.random(1) === 1
}

function slug(str) {
  return str.replace(/ /g, '-').replace(/[^\w\-]+/g, '');
}

function firstOrLastName() {
  return heads() ? exports.firstName() : exports.lastName()
}

