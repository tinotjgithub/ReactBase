import React from 'react';
import { NavLink } from 'react-router-dom';

export let Home = (props) => {

console.log(props);
  return (
    <React.Fragment>
      <h1>Hello {props.location.state ? props.location.state.usernames : "anonymous"}</h1>
      <NavLink to="/about">About</NavLink>
    </React.Fragment>
  );
};