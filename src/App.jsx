/*
  App.jsx
*/

import React from 'react';
import PropTypes from 'prop-types';

import HooksDemo from './HooksDemo';
import BabelTest from './BabelTest';
import D3Demo from './D3Demo';
import ApiDemo from './ApiDemo';

const App = ({ title }) => (
  <>
    <div>
      <h3>{title}</h3>
    </div>
    <BabelTest />
    <D3Demo />
    <HooksDemo />
    <ApiDemo />
  </>
);

App.propTypes = {
  title: PropTypes.string,
};

export default App;
