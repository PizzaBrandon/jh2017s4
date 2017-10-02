const context = new AudioContext();
const req = new XMLHttpRequest();
req.open('GET', './sound.mp3', true);
req.responseType = 'arraybuffer';

let loaded = false;

let getSource = () => ({ start: () => {}});

req.onload = () => {
  context.decodeAudioData(req.response, (buf) => {
    getSource = () => {
      const source = context.createBufferSource();
      source.buffer = buf;
      source.connect(context.destination);
      return source;
    };

    loaded = true;
  }, (e) => {
    console.error('Audio error!', e);
  });
};

req.send();

const audio = {
  sendMessage: () => {
    getSource().start(0, 6.619, 0.562);
  },

  receiveMessage: () => {
    getSource().start(0, 7.653, 0.643);
  },

  crash: () => {
    getSource().start(0, 0, 6.127);
  }
};

module.exports = {
  loaded,
  audio
};
