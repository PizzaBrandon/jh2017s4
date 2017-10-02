const keyboard = [ 'KeyC', 'KeyS', 'Space', 'KeyR' ];

function makeKeyDownListener(keyList, fn) {
  return (e) => {
    if (!keyList.includes(e.code)) {
      return;
    }

    fn(e.code);
  };
}

const listeners = [];

export function listen(keyDownFn, keyList = keyboard) {
  listeners.push(document.addEventListener('keydown', makeKeyDownListener(keyList, keyDownFn), { capture: true }));
}

export function stop() {
  listeners.forEach((listener) => document.removeEventListener('keydown', listener));
  listeners.length = 0;
}
