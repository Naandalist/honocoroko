import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('useMurda / useSwara', () => {
  it('defaults keep Nglegena and Aksara Swara (1.2 behavior)', () => {
    assert.strictEqual(toHonocoroko('Na'), toHonocoroko('na'));
    assert.strictEqual(toHonocoroko('a'), 'ꦄ');
    assert.strictEqual(toHonocoroko('i'), 'ꦆ');
  });

  it('useMurda maps uppercase N/K/T/S/P/G/B onsets to Murda', () => {
    const o = { useMurda: true };
    assert.strictEqual(toHonocoroko('Na', o), 'ꦟ');
    assert.strictEqual(toHonocoroko('Ka', o), 'ꦑ');
    assert.strictEqual(toHonocoroko('Ta', o), 'ꦡ');
    assert.strictEqual(toHonocoroko('Sa', o), 'ꦯ');
    assert.strictEqual(toHonocoroko('Pa', o), 'ꦦ');
    assert.strictEqual(toHonocoroko('Ga', o), 'ꦓ');
    assert.strictEqual(toHonocoroko('Ba', o), 'ꦨ');
    assert.strictEqual(toHonocoroko('Ni', o), 'ꦟꦶ');
    assert.strictEqual(toHonocoroko('na', o), 'ꦤ');
    assert.strictEqual(toHonocoroko('hanacaraka', o), 'ꦲꦤꦕꦫꦏ');
  });

  it('useSwara false writes standalone vowels as ha + sandhangan', () => {
    const o = { useSwara: false };
    assert.strictEqual(toHonocoroko('a', o), 'ꦲ');
    assert.strictEqual(toHonocoroko('i', o), 'ꦲꦶ');
    assert.strictEqual(toHonocoroko('u', o), 'ꦲꦸ');
    assert.strictEqual(toHonocoroko('e', o), 'ꦲꦼ');
    assert.strictEqual(toHonocoroko('o', o), 'ꦲꦺꦴ');
  });

  it('round-trips Murda when useMurda is on', () => {
    const o = { useMurda: true };
    assert.strictEqual(fromHonocoroko(toHonocoroko('Na', o)), 'Na');
    assert.strictEqual(fromHonocoroko(toHonocoroko('Ni', o)), 'Ni');
    assert.strictEqual(fromHonocoroko('ꦟ'), 'Na');
  });
});
