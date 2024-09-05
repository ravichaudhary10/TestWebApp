import React from "react";
import "./Header.scss";
import logo from "../../assets/icons/AppLogo.svg";
import { AppTitle } from "./Header.constants";

type TitleProps = {
  title?: string | null;
};

const Header: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <div className="header__title">{title ? title : AppTitle}</div>
    </header>
  );
};

export default Header;
