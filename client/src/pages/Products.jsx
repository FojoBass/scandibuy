import { Component } from "react";
import { AppContext } from "../context";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { kebabFormatter, cartChecker } from "../helpers";
import fetchFunc from "../services/config";
import { AllProducts, CategoryProducts } from "../services/queries";
import { withRouter } from "../withRouter";
import Error from "./Error";

const abortMessage = "fetch canceled";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
        };

        this.prevContext = this.context;
        this.fetchController = null;
    }

    static contextType = AppContext;

    componentDidUpdate(prevProps, prevState) {
        if (
            this.context.currentCategory !== this.prevContext?.currentCategory
        ) {
            if (this.context.currentCategory) {
                if (this.fetchController)
                    this.fetchController.abort(abortMessage);

                this.fetchController = new AbortController();
                const signal = this.fetchController.signal;
                this.fetchProducts(this.context.currentCategory, signal);
            }

            this.prevContext = this.context;
        }
    }

    fetchProducts = async (category, signal) => {
        let allProducts = [];
        let isAbort = false;

        try {
            this.setState({ loading: true });
            if (category === "all") {
                const result = await fetchFunc(AllProducts, null, signal);
                allProducts = result.products;
            } else {
                const result = await fetchFunc(
                    CategoryProducts,
                    {
                        categ: category,
                    },
                    signal
                );
                allProducts = result.categProduct;
            }

            allProducts = allProducts.map((product) => ({
                ...product,
                gallery: JSON.parse(product.gallery),
                prices: JSON.parse(product.prices),
                attributes: [...JSON.parse(product.attributes.attributes)],
            }));

            this.setState({ products: allProducts });
        } catch (err) {
            if (err === abortMessage) isAbort = true;
        } finally {
            isAbort || this.setState({ loading: false });
            this.fetchController = null;
            if (isAbort) isAbort = false;
        }
    };

    render() {
        const { currentCategory, setCart } = this.context;
        const { loading, products } = this.state;
        const dummyProducts = [1, 2, 3, 4, 5, 6]; //* This is for skeleton loading

        const handleLinkClick = (e) => {
            if (e.target.classList.contains("quick_shop_btn")) {
                e.preventDefault();
                const id = e.currentTarget.id;

                let modCart = this.context.cart;

                const product = products.find((prod) => prod.id === id);

                const selectedAttributes = product.attributes.map((attr) => ({
                    id: attr.id,
                    selItem: attr.items[0],
                }));
                const cartItem = {
                    product,
                    orderInfo: {
                        qty: 1,
                        name: product.name,
                        price: `${product.prices[0].currency.symbol}${product.prices[0].amount}`,
                        selectedAttributes,
                        imgUrl: product.gallery[0],
                        attributes: product.attributes,
                    },
                    id: Math.random(),
                };

                const checker = cartChecker(cartItem, this.context.cart);

                if (checker.isProductInCart) {
                    modCart = modCart.map((item) =>
                        item.id === checker.orderId
                            ? {
                                  ...item,
                                  orderInfo: {
                                      ...item.orderInfo,
                                      qty: item.orderInfo.qty + 1,
                                  },
                              }
                            : item
                    );
                } else modCart.push(cartItem);

                setCart(modCart);
            }
        };

        return (
            <section id="products">
                <div className="center_sect">
                    {currentCategory ? (
                        <h2>{currentCategory}</h2>
                    ) : (
                        <h2 className="dummy_head"></h2>
                    )}
                    <div className="products_wrapper">
                        {loading ? (
                            dummyProducts.map((item) => (
                                <div className="product_card skel" key={item}>
                                    <div className="img_wrapper skel_anim2"></div>

                                    <p className="name skel_anim2"></p>
                                    <p className="price skel_anim2"></p>
                                </div>
                            ))
                        ) : products.length ? (
                            products.map(
                                ({ name, id, gallery, prices, inStock }) => (
                                    <Link
                                        to={`/product/${id}`}
                                        className={`product_card ${
                                            !inStock ? "disable" : ""
                                        }`}
                                        key={id}
                                        data-testid={`product-${kebabFormatter(
                                            name
                                        )}`}
                                        onClick={handleLinkClick}
                                        id={id}
                                    >
                                        <div className="img_wrapper">
                                            <img src={gallery[0]} alt={name} />
                                            <button className="quick_shop_btn">
                                                <IoCartOutline />
                                            </button>
                                            <p className="stock_info">
                                                out of stock
                                            </p>
                                        </div>

                                        <p className="name">{name}</p>
                                        <p className="price">
                                            {prices[0].currency.symbol}
                                            {prices[0].amount}
                                        </p>
                                    </Link>
                                )
                            )
                        ) : (
                            <Error
                                message={`Category "${currentCategory}" has no products`}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Products);
