/*
  HooksDemo.jsx
*/

/* eslint-disable no-console */

import React from 'react';
// import PropTypes from 'prop-types';
import {
  HooksState, HooksEffect, HooksLayoutEffect, HooksReducer, HooksMemo,
} from './Hooks';
import SimpleProgress from './SimpleProgress';
import Button from './Button';

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
          <HooksReducer />
          <HooksMemo />
          <SimpleProgress mode="auto" duration="300"/>
        </div>)
      : null;

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <div>
          <Button onClick={this.clickHandler} section={true}>
            {buttonText}
          </Button>
        </div>
        {content}
      </>
    );
  }
}
