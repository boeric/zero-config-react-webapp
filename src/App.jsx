/*
  App.jsx
*/

import React from 'react';
import PropTypes from 'prop-types';

import HooksDemo from './HooksDemo';
import BabelTest from './BabelTest';
import D3Demo from './D3Demo';
import D3DemoFunc from './D3DemoFunc';
import ApiDemo from './ApiDemo';

//    <ApiDemo />
//    <BabelTest />
//    <HooksDemo />

const App = ({ title }) => (
  <>
    <div>
      <h3>{title}</h3>
    </div>

    <D3Demo />
    <D3DemoFunc />
  </>
);

App.propTypes = {
  title: PropTypes.string,
};

export default App;
