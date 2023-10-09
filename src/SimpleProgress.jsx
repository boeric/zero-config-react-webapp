/*
  SimpleProgress.jsx
*/

/* eslint-disable no-console, no-bitwise */

import React from 'react';

export default class SimpleProgress extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <>
        <div>Hi 1</div>
      </>
    );
  }
}
