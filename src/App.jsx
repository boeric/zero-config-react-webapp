/*
  App.jsx
*/

import React from 'react';
import PropTypes from 'prop-types';

import ApiDemo from './ApiDemo';
import BabelTest from './BabelTest';
import D3Demo from './D3Demo';

const App = ({ title }) => (
  <>
    <div>
      <h3>{title}</h3>
    </div>
    <BabelTest />
    <D3Demo />
    <ApiDemo />
  </>
);

App.propTypes = {
  title: PropTypes.string,
};

export default App;
