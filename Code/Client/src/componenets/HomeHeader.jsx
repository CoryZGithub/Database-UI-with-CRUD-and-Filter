import React, { useState } from "react";
import "../navbar.css";
import { useNavigate } from "react-router-dom";

// const Header = () => {
//   return (
//     <div><h1 className='font-weight-light display-1 text-center'>Edit Member Panel</h1></div>
//     <div>
//       <nav className="nav"><a href="" className="brand">herdoy</a></nav>
//     </div>
//   )
// }
const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const navigation = useNavigate();
  const handleLoginClick = () => {
    navigation(`/login`);
  };
  const handlehomeClick = () => {
    navigation(`/`);
  };

  const handleEmployeeClick = () => {
    navigation(`/allemployees`);
  };

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className='nav'>
      <a href={0} className='nav__brand'>
        Home
      </a>
      <ul className={active}>
        <li className='nav__item nav_link'>About us</li>
        <li className='nav__item nav__link'>Amenities</li>
        <li
          onClick={handleLoginClick}
          className='nav__item nav__link'
        >
          Log In
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  );
};

export default Header;
