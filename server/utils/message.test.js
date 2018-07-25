var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
  it('Should generate correct object message', () => {
    var from = 'Prajwal';
    var text = 'Hey, there!'
    var res = generateMessage(from, text);
    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});

describe('Generate Location Message', () => {
  it('Should generate correct location', () => {
    var from = 'Prajwal';
    var lat = 15;
    var lng = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var res = generateLocationMessage(from, lat, lng);
    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, url});
  });
});
