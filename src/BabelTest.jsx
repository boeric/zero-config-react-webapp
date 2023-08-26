/*
  BabelTest.jsx
*/

/*
  eslint-disable class-methods-use-this, no-console, no-underscore-dangle,
  object-curly-spacing, object-curly-newline
*/

import React from 'react';
import testBabel from './BabelTestRunner';

export default class BabelTest extends React.Component {
  constructor() {
    super();

    const header = 'Babel ES-6 Compatibility Test';
    const babelTestAvailable = false;
    this.state = {header, babelTestAvailable};

    this._onGetBabelTestClick = this._onGetBabelTestClick.bind(this);
  }

  componentDidMount() {
    this.getBabelResults();
  }

  async getBabelResults() {
    try {
      const results = await testBabel();
      this.setState({results, babelTestAvailable: true});
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {header, results, babelTestAvailable} = this.state;
    const displayResults = results != null ? results.join('\n') : '';
    const babelButtonText = babelTestAvailable ? 'Close' : 'Show Babel Results';
    const babelTestButton = (
      <div className='buttonInfoWrapper'>
        <button
          type='button'
          onClick={this._onGetBabelTestClick}
          style={{width: '165px', height: '25px'}}
        >
          {babelButtonText}
        </button>
      </div>
    );

    const content = babelTestAvailable
      ? (
        <div>
          <pre>
            {displayResults}
          </pre>
        </div>
      )
      : null;

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        {babelTestButton}
        {content}
      </>
    );
  }

  _onGetBabelTestClick() {
    const { babelTestAvailable } = this.state;

    this.setState({babelTestAvailable: !babelTestAvailable});
  }
}
