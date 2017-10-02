import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 150;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { inProp: false };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ inProp: true }); }, 10);
  }

  render() {
    const { message } = this.props;
    const { inProp } = this.state;

    return (
      <div className={ `messagecontainer ${ message.from } `}>
        <Transition in={ inProp } timeout={ duration }>
          {(state) => (
            <span
              style={{ ...defaultStyle, ...transitionStyles[ state ] }}
              className={ `message ${ message.from } `}
            >{ message.body }</span>
          )}
        </Transition>
      </div>
    );
  }
}

export default Message;
