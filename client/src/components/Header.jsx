import { Component } from "react";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { AppContext } from "../context";
import Cart from "./cartOverlay/Cart";
import fetchFunc from "../services/config";
import { AllCategories } from "../services/queries";
import { withRouter } from "../withRouter";
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
        this.prevContext = this.context;
    }

    static contextType = AppContext;

    componentDidMount() {
        this.fetchCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        const { params } = this.props;
        const { setCurrentCategory } = this.context;

        if (prevState.categories.length !== this.state.categories.length) {
            if (!params.category) setCurrentCategory(this.state.categories[0]);
            else setCurrentCategory(params.category);
        }

        // *Handle Params Change
        if (prevProps.params.category !== this.props.params.category) {
            const recentCategory = this.props.params.category;
            recentCategory && this.context.setCurrentCategory(recentCategory);
        }

        if (this.prevContext !== this.context) this.prevContext = this.context;
    }

    fetchCategories = async () => {
        const result = await fetchFunc(AllCategories);
        this.setState({ categories: result.categories });
    };

    render() {
        const currentCategory = this.context.currentCategory;
        const { cart, setIsCartOpen, isCartOpen } = this.context;
        const cartCount = cart.reduce((acc, item) => {
            return acc + item.orderInfo.qty;
        }, 0);

        return (
            <header id="header">
                <div className="center_sect">
                    <div className="categories">
                        {this.state.categories.map((category) => (
                            <Link
                                className={`categ_btn ${
                                    currentCategory === category ? "active" : ""
                                }`}
                                to={`/c/${category}`}
                                data-testid={
                                    currentCategory === category
                                        ? "active-category-link"
                                        : "category-link "
                                }
                                key={category}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>

                    <span className="bag_icon">
                        <PiHandbagSimpleFill />
                    </span>

                    <button
                        className="cart_btn"
                        data-testid="cart-btn"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <IoCartOutline />

                        {cart.length >= 1 && (
                            <span
                                className="cart_items_count"
                                data-testid="cart-count-bubble"
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                <Cart />
            </header>
        );
    }
}

export default withRouter(Header);
