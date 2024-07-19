import { Component } from 'react';
import { AppContext } from '../../context';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.prevContext = this.context;
  }

  static contextType = AppContext;

  render() {
    const { cart } = this.context;
    const total = '$500';

    return (
      <div className='cart_wrapper'>
        <header>
          <h3>My Bag, </h3>{' '}
          <span>
            {cart.length} item{cart.length > 1 && 's'}
          </span>
        </header>

        <div className='cart_items_wrapper'>
          {cart.map((item) => (
            <CartItem item={item} />
          ))}
        </div>

        <footer>
          <div className='total'>
            Total{' '}
            <span className='amount' data-testid='cart-total'>
              {total}
            </span>
          </div>

          <button className='order_btn'>place order</button>
        </footer>
      </div>
    );
  }
}

export default Cart;
