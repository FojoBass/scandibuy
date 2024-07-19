import { Component } from 'react';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='cart_item'>This is a cart item</div>;
  }
}

export default CartItem;
