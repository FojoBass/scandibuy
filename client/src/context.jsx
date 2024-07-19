import { Component, createContext } from 'react';

export const AppContext = createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currCategory: '',
      cart: [],
    };
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) {
      console.log('Change in context: ', this.state.cart);
    }
  }

  setCurrCategory = (category) => {
    this.setState({ currCategory: category });
  };

  setCart = (cart) => {
    this.setState({ cart: cart });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          currCategory: this.state.currCategory,
          setCurrCategory: this.setCurrCategory,
          setCart: this.setCart,
          cart: this.state.cart,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
