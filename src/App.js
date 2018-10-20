import React, { Component } from 'react';
import { listen, stop } from './keyboard';
import './App.css';
import script from './script.json';
import Message from './Message';
import TypedInput from './TypedInput';
import { audio } from './audio';

class App extends Component {

  constructor(props) {
    super(props);

    this._handleInput = this._handleInput.bind(this);
    this._advanceScript = this._advanceScript.bind(this);
    this._sendMessage = this._sendMessage.bind(this);

    this.state = {
      messages: [],
      currentMessage: null,
      position: -1,
      show: false
    };
  }

  componentWillMount() {
    listen(this._handleInput);
  }

  componentWillUnmount() {
    stop();
  }

  _handleInput(key) {
    switch(key) {
      case 'KeyC':
        audio.crash();
        return;

      case 'KeyS':
        return this.setState({
          show: true
        });

      case 'KeyR':
        return this.setState({
          show: false,
          currentMessage: null,
          position: -1,
          messages: []
        });

      case 'Space':
        return this._advanceScript();

      default:
        // noop
        return;
    }
  }


  _advanceScript() {

    const { show, position } = this.state;

    if (!show) {
      return;
    }

    const newPosition = position + 1;

    if (newPosition >= script.length) {
      // Prevent overflow
      return;
    }

    const message = script[newPosition];

    this.setState({
      position: newPosition
    }, () => {
      if (message.from === 'me') {
        return this.setState({
          currentMessage: message
        });
      }

      return this._sendMessage(message);
    });
  }


  _sendMessage(message) {
    const { messages, currentMessage } = this.state;

    const newMessages = [ ...messages, message ];

    const update = {
      messages: newMessages
    };

    if (message === currentMessage) {
      update.currentMessage = null;
    }

    if (message.from === 'me') {
      audio.sendMessage();
    } else {
      audio.receiveMessage();
    }

    this.setState(update);
  }

  render() {
    const { messages, currentMessage, show } = this.state;

    const style = {
      opacity: show ? 1 : 0
    };

    const messageDisplay = messages.map((message, i) => {
      return (
        <Message key={ i } message={ message } />
      );
    });

    return (
      <div className="container" style={ style }>
        <div className="header">Kate</div>
        <div className="messagewindow">
          <div className="messagelist">
            { messageDisplay }
          </div>
        </div>
        <TypedInput message={ currentMessage } sendMessage={ this._sendMessage } />
      </div>
    );
  }
}

export default App;
