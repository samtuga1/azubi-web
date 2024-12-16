import { Fragment } from "react";
import shopImage from "../../assets/shop.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>AzubiStore</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={shopImage} alt="Store with products" />
      </div>
    </Fragment>
  );
};

export default Header;
