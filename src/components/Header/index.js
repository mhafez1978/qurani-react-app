import React from 'react';
import Logo from '../Logo'
import Menu from '../Menu';

const Header = () => {
  return (
    <div className="header">
      <div className=" container header_container">
        <Logo/>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
