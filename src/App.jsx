/*
  App.jsx

  Bo Ericsson 2021
*/

import React from 'react';
import PropTypes from 'prop-types';

import ApiTest from './ApiTest';
import BabelTest from './BabelTest';
import D3Test from './D3Test';

const App = ({ title }) => (
  <>
    <div>
      <h3>{title}</h3>
    </div>
    <BabelTest />
    <D3Test />
    <ApiTest />
  </>
);

App.propTypes = {
  title: PropTypes.string,
};

export default App;
