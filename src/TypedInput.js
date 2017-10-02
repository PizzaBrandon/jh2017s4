import React, { Component } from 'react';

class TypedInput extends Component {
  constructor(props) {
    super(props);

    this._typeMessage = this._typeMessage.bind(this);
    this._interval = null;

    this.state = {
      message: props.message || null,
      inputText: ''
    };
  }

  componentDidMount() {
    if (this.state.message) {
      this._typeMessage();
    }
  }

  componentWillReceiveProps(newProps) {

    if (this._interval) {
      clearTimeout(this._interval);
      this._interval = null;
    }

    this.setState({
      message: newProps.message,
      inputText: ''
    },
    () => {
      if (newProps.message) {
        this._typeMessage();
      }
    });
  }

  _typeMessage() {
    const { sendMessage } = this.props;
    const { message, inputText } = this.state;

    if (message.body === inputText) {
      if (message.complete) {
        setTimeout(() => {
          this.setState({
            message: null,
            inputText: ''
          },
          () => sendMessage(message));
        }, 150);
      }

      return;
    }

    const newText = `${ inputText }${ message.body.charAt(inputText.length) }`;

    this.setState({
      inputText: newText
    },
    () => {
      this._interval = setTimeout(this._typeMessage, Math.random() * 60 + 40);
    });
  }

  render() {
    const { inputText } = this.state;

    const cursor = inputText.length ? (<span className='blinker'></span>) : null;

    return (
      <div className='keyboard-input'>
        <div className='typed-input'>{ inputText }{ cursor }</div>
      </div>
    );
  }
}

export default TypedInput
