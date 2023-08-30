// Button.jsx

import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const {
    id = null,
    section = false,
    onClick = null,
    children = '',
  } = props;
  const buttonClasses = `${onClick === null ? 'not-allowed' : ''} ${section ? 'section' : ''}`;

  return (
    <div className='buttonContainer'>
      <button id={id} type='button' className={buttonClasses} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  section: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
