import {stringSplice} from './helpers';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

it('stringSplice correctly splices stuff', () => {
  expect(stringSplice('', 0, 1, '')).toEqual('');
  expect(stringSplice(ALPHABET, 5, 5, 'yaya')).toEqual('abcdeyayaklmnopqrstuvwxyz');
  expect(stringSplice(ALPHABET, 5, 0, 'yaya')).toEqual('abcdeyayafghijklmnopqrstuvwxyz');
  expect(stringSplice(ALPHABET, -1, 1, 'nono')).toEqual('abcdefghijklmnopqrstuvwxynono');
});
