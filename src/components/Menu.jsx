import React from 'react';

import './Menu.css';

const Menu = (props) => {
  const {
    items,
  } = props;

  const menuItems = items.map(item =>
    <li key={item.text}
        onClick={item.onClick} >
        {item.text}
    </li>
  );

  return (
    <div className="menu">
      <ul>
        {menuItems}
      </ul>
    </div>
  );
};

export default Menu;
