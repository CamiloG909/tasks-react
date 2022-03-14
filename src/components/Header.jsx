import React from "react";
import Logo from "../assets/img/logo.png";

const Header = () => {
	return (
		<header className="header">
			<img className="header__img" src={Logo} alt="Logo header" />
			<h1 className="header__text">Tasks</h1>
		</header>
	);
};

export default Header;
