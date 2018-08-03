var expect = require('expect');

var {isRealString} = require('./validator');

describe('Join Room', () => {
  it('Should reject non string values', () => {
    str = 1;
    var res = isRealString(str);
    expect(res).toBeFalsy();
  });
  it('Should reject empty string values', () => {
    str = '      ';
    var res = isRealString(str);
    expect(res).toBeFalsy();
  });
  it('Should allow non empty string values', () => {
    str = ' Siddu  ';
    var res = isRealString(str);
    expect(res).toBeTruthy();
  });
});