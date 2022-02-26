
import React from 'react';
import ReactDOM from 'react-dom';

function Car(props) {
  return <h2>I am a {props.color} Car!</h2>;
}

ReactDOM.render(<Car color="red"/>, document.getElementById('root'));