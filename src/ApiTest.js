/*
  ApiTest.js

  Bo Ericsson 2021
*/

/*
  eslint-disable class-methods-use-this, no-console, no-underscore-dangle,
  object-curly-spacing, object-curly-newline
*/

import React from 'react';

export default class ApiTest extends React.Component {
  constructor() {
    super();

    const header = 'ApiTest (testing node server passthrough, etc.)';
    this.state = {
      apiAvailable: false,
      apiSchema: '',
      header,
      ip: '',
      ipAddressLoaded: false,
      reflect: '',
      reflectLoaded: false,
      weather: '',
      weatherLoaded: false,
    };

    this._onGetIpAddressClick = this._onGetIpAddressClick.bind(this);
    this._onGetWeatherClick = this._onGetWeatherClick.bind(this);
    this._onGetReflectClick = this._onGetReflectClick.bind(this);
  }

  componentDidMount() {
    fetch('/api')
      .then((d) => d.text())
      .then((apiSchema) => {
        this.setState({ apiAvailable: true, apiSchema});
      })
      .catch((error) => {
        console.log('Api is not available', error);
      });
  }

  render() {
    const {
      apiAvailable,
      apiSchema,
      header,
      ip,
      ipAddressLoaded,
      reflect,
      reflectLoaded,
      weather,
      weatherLoaded,
    } = this.state;
    const displayIp = ipAddressLoaded ? ip : '';
    const displayWeather = weatherLoaded ? JSON.stringify(JSON.parse(weather), null, 2) : '';
    const displayReflect = reflectLoaded ? JSON.stringify(JSON.parse(reflect), null, 2) : '';

    const schemaWrapper = apiAvailable
      ? (<pre style={{marginTop: '5px'}}>{`${JSON.stringify(JSON.parse(apiSchema), null)}`}</pre>)
      : null;

    const schemaText = apiAvailable
      ? (<span>Api is available with schema{schemaWrapper}</span>)
      : 'Api is not available';

    const ipButtonText = ipAddressLoaded ? 'Close' : 'Test IP Address API';
    const weatherButtonText = weatherLoaded ? 'Close' : 'Test Weather API';
    const reflectButtonText = reflectLoaded ? 'Close' : 'Test Reflect API';

    const ipButton = apiAvailable ? (
      <div className='buttonInfoWrapper'>
        <button
          type='button'
          onClick={this._onGetIpAddressClick}
          style={{width: '165px', height: '25px'}}
        >
          {ipButtonText}
        </button>
        <pre>{displayIp}</pre>
      </div>
    ) : null;

    const weatherButton = apiAvailable ? (
      <div className='buttonInfoWrapper'>
        <button
          type='button'
          onClick={this._onGetWeatherClick}
          style={{width: '165px', height: '25px'}}
        >
          {weatherButtonText}
        </button>
        <pre>{displayWeather}</pre>
      </div>
    ) : null;

    const reflectButton = apiAvailable ? (
      <div className='buttonInfoWrapper'>
        <button
          type='button'
          onClick={this._onGetReflectClick}
          style={{width: '165px', height: '25px'}}
        >
          {reflectButtonText}
        </button>
        <pre>{displayReflect}</pre>
      </div>
    ) : null;

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <div className='apiText'><span>{schemaText}</span></div>
        {ipButton}
        {weatherButton}
        {reflectButton}
      </>
    );
  }

  _onGetIpAddressClick() {
    const {ipAddressLoaded} = this.state;

    if (!ipAddressLoaded) {
      fetch('/ip')
        .then((d) => d.text())
        .then((ip) => {
          this.setState({ ip, ipAddressLoaded: true });
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      this.setState({ipAddressLoaded: false });
    }
  }

  _onGetWeatherClick() {
    const {weatherLoaded} = this.state;

    if (!weatherLoaded) {
      fetch('/weather')
        .then((d) => d.text())
        .then((weather) => {
          this.setState({ weather, weatherLoaded: true });
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      this.setState({weatherLoaded: false });
    }
  }

  _onGetReflectClick() {
    const data = {aProp: 'aPropValue'};

    const {reflectLoaded} = this.state;

    if (!reflectLoaded) {
      fetch('/reflect', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })
        .then((d) => d.text())
        .then((reflect) => {
          this.setState({ reflect, reflectLoaded: true });
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      this.setState({reflectLoaded: false });
    }
  }
}
