import { Component } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { kebabFormatter, isProductInCart } from "../helpers";
import fetchFunc from "../services/config";
import { GetProduct } from "../services/queries";
import { withRouter } from "../withRouter";
import Error from "./Error";

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true,
            selectedImg: 0,
            selectedAttributes: [],
            isAddToCart: false,
        };
        this.prevContext = this.context;
    }

    static contextType = AppContext;

    componentDidMount() {
        this.fetchProduct(this.props.params.id);
    }

    fetchProduct = async (id) => {
        let fetchedProduct = {};
        const modAttrs = [];
        try {
            this.setState({ loading: true });
            const result = await fetchFunc(GetProduct, { id });
            fetchedProduct = {
                ...result.product,
                gallery: JSON.parse(result.product.gallery),
                prices: JSON.parse(result.product.prices),
                attributes: [
                    ...JSON.parse(result.product.attributes.attributes),
                ],
            };
            this.setState({ product: fetchedProduct });
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ loading: false });
        }
    };

    setSelectedImg = (index) => {
        this.setState({ selectedImg: index });
    };

    setSelectedAttributes = (id, item) => {
        const isAttr = this.state.selectedAttributes.some(
            (attr) => attr.id === id
        );
        const selAttr = isAttr
            ? this.state.selectedAttributes.map((attr) =>
                  attr.id === id ? { ...attr, selItem: item } : attr
              )
            : [...this.state.selectedAttributes, { id: id, selItem: item }];
        this.setState({ selectedAttributes: selAttr });

        this.checkSelAttributes(selAttr);
    };

    checkSelAttributes = (selAttrs) => {
        const {
            product: { attributes },
        } = this.state;
        let isAttrSel = true;

        for (let i = 0; i < attributes.length; i++) {
            isAttrSel = selAttrs.some(
                (selAttr) => selAttr.id === attributes[i].id
            );
            if (!isAttrSel) break;
        }

        this.setState({ isAddToCart: isAttrSel });
    };

    render() {
        const {
            product,
            loading,
            selectedImg,
            selectedAttributes,
            isAddToCart,
        } = this.state;
        const currImg = product?.gallery.find(
            (_, ind) => ind === this.state.selectedImg
        );
        const desc = DOMPurify.sanitize(product?.description ?? "");
        const { cart, setCart } = this.context;

        const handleControl = (dir) => {
            if (dir === "increase") {
                if (selectedImg === product.gallery.length - 1) {
                    this.setSelectedImg(0);
                } else {
                    this.setSelectedImg(selectedImg + 1);
                }
            }

            if (dir === "decrease") {
                if (selectedImg === 0) {
                    this.setSelectedImg(product.gallery.length - 1);
                } else {
                    this.setSelectedImg(selectedImg - 1);
                }
            }
        };

        const handleAddCart = () => {
            const id = Math.random();
            const orderInfo = {
                imgUrl: product.gallery[0],
                name: product.name,
                price: `${product.prices[0].currency.symbol}${product.prices[0].amount}`,
                selectedAttributes,
                attributes: product.attributes,
                qty: 1,
            };
            const cartItem = {
                id,
                orderInfo,
                product,
            };

            let modCart = cart;
            const cartItemId = isProductInCart(cartItem, cart);
            if (cartItemId) {
                modCart = modCart.map((item) =>
                    item.id === cartItemId
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
        };

        const dummyProd = {
            gallery: [1, 2, 3],
        };

        const checkAttribute = (attrId, item) => {
            let checker = false;
            selectedAttributes.forEach((attr) => {
                if (attr.id === attrId) checker = item.id === attr.selItem.id;
            });
            return checker;
        };

        return (
            <section id="single_product">
                <div className="center_sect">
                    <Link className="back_btn" to="/">
                        <FaArrowLeftLong />
                    </Link>
                    {loading ? (
                        <>
                            <div className="left_side skel">
                                <div className="img_selector_wrapper">
                                    {dummyProd.gallery.map((img) => (
                                        <div
                                            className="img_selector"
                                            key={img}
                                        ></div>
                                    ))}
                                </div>

                                <div className="main_img"></div>
                            </div>

                            <div className="right_side skel">
                                <h3 className="name"></h3>

                                <div className="attributes_wrapper"></div>

                                <div className="attributes_wrapper"></div>

                                <div className="skel_add"></div>
                            </div>
                        </>
                    ) : (
                        <>
                            {!product ? (
                                <Error message={"Product not found"} />
                            ) : (
                                <>
                                    <div className="left_side">
                                        <div
                                            className="img_selector_wrapper"
                                            data-testid="product-gallery"
                                        >
                                            {product.gallery.map(
                                                (url, index) => (
                                                    <button
                                                        className={`img_selector ${
                                                            index ===
                                                            selectedImg
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        key={url}
                                                        onClick={() =>
                                                            this.setSelectedImg(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={url}
                                                            alt={product.name}
                                                        />
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <div className="main_img">
                                            <img
                                                src={currImg}
                                                alt={product.name}
                                            />
                                            <button
                                                className="prev_btn"
                                                onClick={() =>
                                                    handleControl("decrease")
                                                }
                                            >
                                                <MdOutlineKeyboardArrowLeft />
                                            </button>

                                            <button
                                                className="next_btn"
                                                onClick={() =>
                                                    handleControl("increase")
                                                }
                                            >
                                                <MdOutlineKeyboardArrowRight />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="right_side">
                                        <h3 className="name">{product.name}</h3>

                                        <div className="attributes_wrapper">
                                            {product.attributes.map((attr) => (
                                                <div
                                                    className="attribute"
                                                    key={attr.id}
                                                    data-testid={`product-attribute-${kebabFormatter(
                                                        attr.name
                                                    )}`}
                                                >
                                                    <h4 className="title">
                                                        {attr.name}
                                                    </h4>
                                                    <div className="attr_opts">
                                                        {attr.items.map(
                                                            (item) =>
                                                                attr.id.toLowerCase() ===
                                                                "color" ? (
                                                                    <button
                                                                        className={`sel_clr_btn ${
                                                                            selectedAttributes.some(
                                                                                (
                                                                                    attr
                                                                                ) =>
                                                                                    attr
                                                                                        .selItem
                                                                                        .value ===
                                                                                    item.value
                                                                            )
                                                                                ? "active"
                                                                                : ""
                                                                        }`}
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            this.setSelectedAttributes(
                                                                                attr.id,
                                                                                item
                                                                            )
                                                                        }
                                                                        data-testid={`product-attribute-${kebabFormatter(
                                                                            attr.name
                                                                        )}-${
                                                                            item.displayValue
                                                                        }${
                                                                            checkAttribute(
                                                                                attr.id,
                                                                                item
                                                                            )
                                                                                ? "-selected"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <span
                                                                            className="clr"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    item.value,
                                                                            }}
                                                                        ></span>
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className={`sel_attr_btn ${
                                                                            selectedAttributes.some(
                                                                                (
                                                                                    selAttr
                                                                                ) =>
                                                                                    selAttr
                                                                                        .selItem
                                                                                        .value ===
                                                                                        item.value &&
                                                                                    selAttr.id ===
                                                                                        attr.id
                                                                            )
                                                                                ? "active"
                                                                                : ""
                                                                        }`}
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            this.setSelectedAttributes(
                                                                                attr.id,
                                                                                item
                                                                            )
                                                                        }
                                                                        data-testid={`product-attribute-${kebabFormatter(
                                                                            attr.name
                                                                        )}-${
                                                                            item.displayValue
                                                                        }${
                                                                            checkAttribute(
                                                                                attr.id,
                                                                                item
                                                                            )
                                                                                ? "-selected"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        {
                                                                            item.value
                                                                        }
                                                                    </button>
                                                                )
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="attribute">
                                                <h4 className="title">Price</h4>
                                                <h4 className="price">
                                                    {
                                                        product.prices[0]
                                                            .currency.symbol
                                                    }
                                                    {product.prices[0].amount}
                                                </h4>
                                            </div>
                                        </div>

                                        <button
                                            className="cart_add"
                                            onClick={handleAddCart}
                                            data-testid="add-to-cart"
                                            disabled={
                                                !product.inStock || !isAddToCart
                                            }
                                        >
                                            ADD TO CART
                                        </button>

                                        <div
                                            className="description"
                                            data-testid="product-description"
                                        >
                                            {parse(desc)}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        );
    }
}

export default withRouter(SingleProduct);
