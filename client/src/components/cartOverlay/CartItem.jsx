import { Component } from 'react';
import { AppContext } from '../../context';
import { kebabFormatter } from '../../helpers';

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
        orderInfo: { attributes, imgUrl, name, price, qty, selectedAttributes },
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

    const checkAttribute = (attrId, item) => {
      let checker = false;
      selectedAttributes.forEach((attr) => {
        if (attr.id === attrId) checker = item.id === attr.selItem.id;
      });
      return checker;
    };

    return (
      <div className='cart_item'>
        <div className='item_info'>
          <p className='name'>{name}</p>
          <h6 className='price'>{price}</h6>
          {attributes.map((attr) =>
            attr.id.toLowerCase() === 'color' ? (
              <div
                className='clr_attr'
                key={attr.id}
                data-testid={`cart-item-attribute-${kebabFormatter(attr.name)}`}
              >
                <p>{attr.name}:</p>
                <div className='wrapper'>
                  {attr.items.map((item, index) => (
                    <span
                      className={`clr_opt ${
                        checkAttribute(attr.id, item) ? 'active' : ''
                      }`}
                      key={item.value}
                      data-testid={`cart-item-attribute ${kebabFormatter(
                        attr.name
                      )}-${item.displayValue}${
                        checkAttribute(attr.id, item) ? '-selected' : ''
                      }`}
                    >
                      <span
                        className='clr_carrier'
                        style={{ backgroundColor: item.value }}
                      ></span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className='attr'
                key={attr.id}
                data-testid={`cart-item-attribute-${kebabFormatter(attr.name)}`}
              >
                <p>{attr.name}:</p>
                <div className='wrapper'>
                  {attr.items.map((item, index) => (
                    <span
                      className={`attr_opt ${
                        checkAttribute(attr.id, item) ? 'active' : ''
                      }`}
                      key={item.value}
                      data-testid={`cart-item-attribute ${kebabFormatter(
                        attr.name
                      )}-${item.displayValue}${
                        checkAttribute(attr.id, item) ? '-selected' : ''
                      }`}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )
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
