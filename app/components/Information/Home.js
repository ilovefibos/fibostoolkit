import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h3>Getting started</h3>
      <h4>You must have <a href="https://foironman.com/" target="new">Ironman</a> installed to safely and securely send transactions to the FO Network.</h4>
      <h4>If you would like to ask us questions are participate in the FO Community, check out our <a href="https://t.me/FIBOSIO" target="new">Telegram</a> group.</h4>
      {/*<h4>Make sure you have read and understand the <NavLink to="/governance">FO Governance</NavLink> prior to using the FO Network.</h4>*/}
    </div>
  );
};

export default Home;
