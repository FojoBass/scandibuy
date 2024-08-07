import { Component } from "react";
import { AppContext } from "../../context";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
import fetchFunc from "../../services/config";
import { CreateOrder } from "../../services/queries";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLoading: false,
        };
        this.prevContext = this.context;
    }

    static contextType = AppContext;

    render() {
        const { cart, isCartOpen, setCart, setIsCartOpen } = this.context;
        const { orderLoading } = this.state;
        const total = cart.reduce((acc, item) => {
            const price = Number(item.orderInfo.price.slice(1));
            const qty = item.orderInfo.qty;

            return acc + qty * price;
        }, 0);
        const curr = cart[0]?.orderInfo.price.slice(0, 1);
        const totalQty = cart.reduce((acc, item) => {
            return acc + item.orderInfo.qty;
        }, 0);

        const handleOrder = async () => {
            try {
                this.setState({ orderLoading: true });
                const orders = cart.map((item) => ({
                    product_id: item.product.id,
                    qty: item.orderInfo.qty,
                    attributes: item.orderInfo.selectedAttributes,
                }));

                await fetchFunc(CreateOrder, { orders });

                toast.success("Order created.");
                setCart([]);
                setIsCartOpen(false);
            } catch (err) {
                // console.error(err);
            } finally {
                this.setState({ orderLoading: false });
            }
        };

        return isCartOpen ? (
            <section
                className={`cart_sect ${isCartOpen ? "active" : ""}`}
                data-testid="cart-overlay"
            >
                <div className="cart_wrapper">
                    <header>
                        <h3>My Bag, </h3>
                        <span>
                            {totalQty} item
                            {(totalQty > 1 || totalQty === 0) && "s"}
                        </span>
                    </header>

                    <div className="cart_items_wrapper">
                        {cart.length ? (
                            cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="empty">Add Item to Cart</p>
                        )}
                    </div>

                    <footer>
                        <div className="total">
                            Total{" "}
                            <span className="amount" data-testid="cart-total">
                                {total ? `${curr} ${total.toFixed(2)}` : `0.00`}
                            </span>
                        </div>

                        <button
                            className="order_btn"
                            disabled={!cart.length || orderLoading}
                            onClick={handleOrder}
                            data-testid="place-order-btn"
                        >
                            place order
                        </button>
                    </footer>
                </div>
            </section>
        ) : (
            ""
        );
    }
}

export default Cart;
