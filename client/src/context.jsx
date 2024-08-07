import { Component, createContext } from "react";

export const AppContext = createContext();

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currCategory: "",
            cart: [],
            isCartOpen: false,
        };
    }

    componentDidMount() {
        let storageCart = sessionStorage.getItem("scandibuy_cart") ?? null;
        storageCart = storageCart ? JSON.parse(storageCart) : [];
        this.setCart(storageCart);
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState !== this.state) {
            sessionStorage.setItem(
                "scandibuy_cart",
                JSON.stringify(this.state.cart)
            );
        }
    }

    setCurrCategory = (category) => {
        this.setState({ currCategory: category });
    };

    setCart = (cart) => {
        this.setState({ cart: cart });
    };

    setIsCartOpen = (val) => {
        this.setState({ isCartOpen: val });
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    currCategory: this.state.currCategory,
                    setCurrCategory: this.setCurrCategory,
                    setCart: this.setCart,
                    cart: this.state.cart,
                    isCartOpen: this.state.isCartOpen,
                    setIsCartOpen: this.setIsCartOpen,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
