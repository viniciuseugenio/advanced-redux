import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Sandals",
    description: "A pair of sandals",
    price: 6,
  },
  {
    id: "p2",
    title: "Throne of Glass",
    description: "A great book",
    price: 12.9,
  },
  {
    id: "p3",
    title: "iCelular",
    description: "The best smartphone",
    price: 159.9,
  },
  {
    id: "p4",
    title: "Keyboard",
    description: "A simple but good keyboard",
    price: 8,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
