import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('cakra / pengkal and e vs é', () => {
  it('writes CrV as consonant + cakra, not pangkon + ra', () => {
    assert.strictEqual(toHonocoroko('kra'), 'ꦏꦿ');
    assert.ok(!toHonocoroko('kra').includes('꧀'));
    assert.strictEqual(toHonocoroko('sri'), 'ꦱꦿꦶ');
  });

  it('writes CyV as consonant + pengkal', () => {
    assert.strictEqual(toHonocoroko('kya'), 'ꦏꦾ');
    assert.strictEqual(toHonocoroko('kyai'), 'ꦏꦾꦆ');
  });

  it('keeps nya as Aksara Nya, not n + pengkal', () => {
    assert.strictEqual(toHonocoroko('nya'), 'ꦚ');
  });

  it('treats e as pepet and é/è as taling', () => {
    assert.strictEqual(toHonocoroko('be'), 'ꦧꦼ');
    assert.strictEqual(toHonocoroko('bé'), 'ꦧꦺ');
    assert.strictEqual(toHonocoroko('bè'), 'ꦧꦺ');
  });

  it('round-trips kra and sri', () => {
    assert.strictEqual(fromHonocoroko(toHonocoroko('kra')), 'kra');
    assert.strictEqual(fromHonocoroko(toHonocoroko('sri')), 'sri');
    assert.strictEqual(fromHonocoroko('ꦏꦿ'), 'kra');
  });
});
