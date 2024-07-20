import { Component } from 'react';
import { AppContext } from '../../context';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.prevContext = this.context;
  }

  static contextType = AppContext;

  componentDidUpdate() {
    if (this.prevContext?.cart !== this.context.cart) {
      this.prevContext = this.context;
    }
  }

  render() {
    const {
      item: {
        orderInfo: { color, imgUrl, name, price, qty, size },
        product,
        id,
      },
    } = this.props;
    const { cart, setCart } = this.context;

    const handleIncrement = () => {
      let modCart = cart;
      modCart = modCart.map((cart) =>
        cart.id === id
          ? {
              ...cart,
              orderInfo: { ...cart.orderInfo, qty: cart.orderInfo.qty + 1 },
            }
          : cart
      );
      setCart(modCart);
    };

    const handleDecrement = () => {
      let modCart = cart;
      if (qty <= 1) {
        modCart = modCart.filter((cart) => cart.id !== id);
      } else {
        modCart = modCart.map((cart) =>
          cart.id === id
            ? {
                ...cart,
                orderInfo: { ...cart.orderInfo, qty: cart.orderInfo.qty - 1 },
              }
            : cart
        );
      }
      setCart(modCart);
    };

    return (
      <div className='cart_item'>
        <div className='item_info'>
          <p className='name'>{name}</p>
          <h6 className='price'>{price}</h6>
          {size && (
            <div className='size'>
              <p>Size:</p>
              <div className='wrapper' data-testid='cart-item-attribute-size'>
                {product.attributes
                  .find((attr) => attr.id.toLowerCase() === 'size')
                  .items.map((em) => (
                    <span
                      className={`size_opt ${
                        em.value === size.value ? 'active' : ''
                      }`}
                      key={em.value}
                      data-testid={`cart-item-attribute-size-${
                        em.value === size.value
                          ? `${em.displayValue
                              .toLowerCase()
                              .split(' ')
                              .join('-')}-selected`
                          : em.displayValue.toLowerCase().split(' ').join('-')
                      }`}
                    >
                      {em.value}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {color && (
            <div className='color'>
              <p>Color:</p>
              <div className='wrapper' data-testid='cart-item-attribute-color'>
                {product.attributes
                  .find((attr) => attr.id.toLowerCase() === 'color')
                  .items.map((em) => (
                    <span
                      className={`clr_opt ${
                        em.value === color.value ? 'active' : ''
                      }`}
                      key={em.value}
                      data-testid={`cart-item-attribute-color-${
                        em.value === color.value
                          ? `${em.displayValue
                              .toLowerCase()
                              .split(' ')
                              .join('-')}-selected`
                          : em.displayValue.toLowerCase().split(' ').join('-')
                      }`}
                    >
                      <span
                        className='clr_carrier'
                        style={{ backgroundColor: em.value }}
                      ></span>
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className='btns_wrapper'>
          <button
            className='op_btn add_btn'
            onClick={handleIncrement}
            data-testid='cart-item-amount-increase'
          >
            +
          </button>
          <h5 className='qty' data-testid='cart-item-amount'>
            {qty}
          </h5>
          <button
            className='op_btn minus_btn'
            onClick={handleDecrement}
            data-testid='cart-item-amount-decrease'
          >
            -
          </button>
        </div>

        <div className='img_wrapper'>
          <img src={imgUrl} alt={name} />
        </div>
      </div>
    );
  }
}

export default CartItem;
