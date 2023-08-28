/*
  HooksState
*/

/* eslint-disable no-console */

import React, {
  useState, useEffect, useLayoutEffect, useInsertionEffect, useReducer,
} from 'react';

export function HooksState() {
  const [count, setCount] = useState(0);
  const buttonText = `useState: Click count: ${count}`;

  return (
    <>
      <button id="stateButton" onClick={() => setCount(count + 1)}>
        {buttonText}
      </button>
    </>
  );
}

export function HooksEffect() {
  const [count, setCount] = useState(0);
  const buttonText = `useEffect: Change useState button ${count % 2 === 1}`;

  useEffect(() => {
    const elem = document.getElementById('stateButton');
    elem.style.backgroundColor = count % 2 !== 0 ? 'lightgray' : 'buttonface';
    return () => {
      console.log('Unmounting effect hook');
    };
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        {buttonText}
      </button>
    </>
  );
}

export function HooksLayoutEffect() {
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
  });
  return (
    <div className='hookDiv'>
      useLayoutEffect: Watch the console
    </div>
  );
}

export function HooksInsertionEffect() {
  useInsertionEffect(() => {
    console.log('useInsertionEffect triggered');
  });
  return (
    <div className='hookDiv'>
      useInsertionEffect: Watch the console
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

const initialState = 0;

export function HooksReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clickHandler = () => {
    dispatch({ type: 'INCREMENT' });
  };

  return (
    <>
      <button onClick={clickHandler}>
        {`useReducer: State: ${state}`}
      </button>
    </>
  );
}
