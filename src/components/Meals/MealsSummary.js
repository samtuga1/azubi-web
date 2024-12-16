import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>
        Discover amazing porducts from
        <span style={{ color: "#8a2b06" }}> Azubi </span> Store
      </h2>
      <p>
        Choose your favorite item from our broad selection of available
        products.
      </p>
      <p>All our products are new with faily low prices.</p>
    </section>
  );
};

export default MealsSummary;
