const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

function start() {
  const images = [];
  const requests = [];
  const style = {};
  let tick;
  let interval;
  class Image {
    constructor() {
      this.complete = false;
      this.naturalWidth = 0;
      images.push(this);
    }
    set src(value) { this.url = value; requests.push(value); }
    get src() { return this.url; }
    finish(success = true) {
      this.complete = true;
      this.naturalWidth = success ? 1600 : 0;
      if (success) this.onload();
      else this.onerror();
    }
  }
  vm.runInNewContext(script.slice(0, script.indexOf('const lastImage =')), {
    Image,
    document: { documentElement: { style } },
    window: { setInterval(callback, delay) { tick = callback; interval = delay; } },
  });
  return { images, requests, style, tick, interval };
}

test('loads the first image before requesting later backgrounds', () => {
  const loop = start();
  assert.equal(loop.requests.length, 1);
  assert.equal(loop.images[0].fetchPriority, 'high');
  loop.images[0].finish();
  assert.equal(loop.requests.length, 2);
  assert.equal(loop.images[1].fetchPriority, 'low');
  loop.images[1].finish();
  assert.equal(loop.requests.length, 2);
});

test('rotates the two loaded backgrounds every 20 seconds and wraps around', () => {
  const loop = start();
  loop.images.forEach(image => image.finish());
  assert.equal(loop.interval, 20000);
  for (const number of [2, 1, 2, 1, 2]) {
    loop.tick();
    assert.ok(loop.style.backgroundImage.includes(`/${number}.webp?`));
  }
});

test('keeps the current background while the next downloads or fails', () => {
  const loop = start();
  const first = loop.style.backgroundImage;
  loop.tick();
  assert.equal(loop.style.backgroundImage, first);
  loop.images[0].finish();
  loop.images[1].finish(false);
  assert.equal(loop.requests.length, 2);
  loop.tick();
  assert.equal(loop.style.backgroundImage, first);
});

test('recovers when the first background fails', () => {
  const loop = start();
  loop.images[0].finish(false);
  loop.images[1].finish();
  loop.tick();
  assert.ok(loop.style.backgroundImage.includes('/2.webp?'));
});

test('preload, CSS and JavaScript use the same first-image URL and all assets exist', () => {
  const loop = start();
  const first = loop.requests[0];
  for (const file of ['index.html', 'styles_phone.css', 'styles_laptop.css']) {
    assert.ok(fs.readFileSync(path.join(root, file), 'utf8').includes(first), file);
  }
  loop.images.forEach(image => image.finish());
  for (const url of loop.requests) {
    const data = fs.readFileSync(path.join(root, url.split('?')[0]));
    assert.equal(data.toString('ascii', 0, 4), 'RIFF');
    assert.equal(data.toString('ascii', 8, 12), 'WEBP');
  }
});
