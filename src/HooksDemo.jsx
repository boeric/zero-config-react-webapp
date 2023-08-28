/*
  HooksDemo.jsx
*/

/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import {
  HooksState, HooksEffect, HooksLayoutEffect, HooksInsertionEffect, HooksReducer,
} from './Hooks';

export default class HooksDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      header: 'React Hooks',
      opened: false,
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const opened = !this.state.opened;
    this.setState({ ...this.state, opened });
  }

  render() {
    const { header } = this.state;
    const buttonText = this.state.opened ? 'Close Hooks Section' : 'Show React Hooks Functionality';

    const content = this.state.opened
      ? (
        <div>
          <HooksState />
          <HooksEffect />
          <HooksLayoutEffect />
          <HooksInsertionEffect />
          <HooksReducer />
        </div>)
      : null;

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <Button buttonTitle={buttonText} callback={this.clickHandler}/>
        {content}
      </>
    );
  }
}

function Button(props) {
  const { buttonTitle, callback } = props;
  return (
    <div>
      <button type='button' onClick={callback}>
        {buttonTitle}
      </button>
    </div>
  );
}

Button.propTypes = {
  buttonTitle: PropTypes.string,
  callback: PropTypes.func,
};
