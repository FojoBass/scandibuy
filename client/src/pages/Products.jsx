import { Component } from 'react';
import { AppContext } from '../context';
import { products } from '../data';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { kebabFormatter, productInCart } from '../helpers';
import fetchFunc from '../services/config';
import { AllProducts, CategoryProducts } from '../services/queries';

const ProductsWrapper = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
  return Wrapper;
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
    };

    this.prevContext = this.context;
  }

  static contextType = AppContext;

  componentDidMount() {
    const currCategory = this.context.currCategory;
    if (currCategory) this.fetchProducts(currCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.currCategory !== this.prevContext?.currCategory) {
      this.context.currCategory &&
        this.fetchProducts(this.context.currCategory);

      this.prevContext = this.context;
    }
  }

  fetchProducts = async (category) => {
    let allProducts = [];
    try {
      this.setState({ loading: true });
      if (category === 'all') {
        const result = await fetchFunc(AllProducts);
        allProducts = result.products;
      } else {
        const result = await fetchFunc(CategoryProducts, { categ: category });
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
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { currCategory, setCart } = this.context;
    const { loading, products } = this.state;
    const { navigate } = this.props;
    const skelProducts = [1, 2, 3, 4, 5, 6];

    const handleLinkClick = (e) => {
      e.preventDefault();
      if (e.target.classList.contains('quick_shop_btn')) {
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

        const cartItemId = productInCart(cartItem, this.context.cart);

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
      } else {
        navigate(e.currentTarget.href.split('/').slice(3).join('/'));
      }
    };

    return (
      <section id='products'>
        <div className='center_sect'>
          {currCategory ? (
            <h2>{currCategory}</h2>
          ) : (
            <h2 className='dummy_head'></h2>
          )}
          <div className='products_wrapper'>
            {loading ? (
              skelProducts.map((item) => (
                <div className='product_card skel' key={item}>
                  <div className='img_wrapper skel_anim2'></div>

                  <p className='name skel_anim2'></p>
                  <p className='price skel_anim2'></p>
                </div>
              ))
            ) : products.length ? (
              products.map(({ name, id, gallery, prices, inStock }) => (
                <Link
                  to={`/product/${id}?=${currCategory}`}
                  className={`product_card ${!inStock ? 'disable' : ''}`}
                  key={id}
                  data-testid={`product-${kebabFormatter(name)}`}
                  onClick={handleLinkClick}
                  id={id}
                >
                  <div className='img_wrapper'>
                    <img src={gallery[0]} alt={name} />
                    <button className='quick_shop_btn'>
                      <IoCartOutline />
                    </button>
                    <p className='stock_info'>out of stock</p>
                  </div>

                  <p className='name'>{name}</p>
                  <p className='price'>
                    {prices[0].currency.symbol}
                    {prices[0].amount}
                  </p>
                </Link>
              ))
            ) : (
              <h3 className='error_msg'>Sorry, no Products found!</h3>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default ProductsWrapper(Products);
