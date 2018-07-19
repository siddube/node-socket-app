var expect = require('expect');
var { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('Should generate correct object message', () => {
    var from = 'Prajwal';
    var text = 'Hey, there!'
    var res = generateMessage(from, text);
    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});
