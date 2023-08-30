/*
  HooksState
*/

/* eslint-disable no-console, no-bitwise */

import React, {
  useState, useEffect, useLayoutEffect, useInsertionEffect, useReducer, useMemo,
} from 'react';
import Button from './Button';

export function HooksState() {
  const [count, setCount] = useState(0);
  const buttonText = `useState: Click count: ${count}`;

  return (
    <>
      <Button id='stateButton' onClick= {() => setCount(count + 1)}>
        {buttonText}
      </Button>
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
      <Button onClick={() => setCount(count + 1)}>
        {buttonText}
      </Button>
    </>
  );
}

export function HooksLayoutEffect() {
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
  });
  return (
    <Button>
      useLayoutEffect: Watch the console
    </Button>
  );
}

export function HooksInsertionEffect() {
  useInsertionEffect(() => {
    console.log('useInsertionEffect triggered');
  });
  return (
    <Button>
      useInsertionEffect: Watch the console
    </Button>
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
      <Button onClick={clickHandler}>
        {`useReducer: State: ${state}`}
      </Button>
    </>
  );
}
