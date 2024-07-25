import { Component } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PiHandbagSimpleFill } from 'react-icons/pi';
import { IoCartOutline } from 'react-icons/io5';
import { AppContext } from '../context';
import { categories, categories as dummyCategories } from '../data';
import Cart from './cartOverlay/Cart';
import fetchFunc from '../services/config';
import { AllCategories } from '../services/queries';

function withSearchParams(WrappedComponent) {
  return (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <WrappedComponent
        {...props}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
  };
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      currCategory: this.props.searchParams.get('category') ?? categories[0],
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.fetchCategories();

    this.prevContext = this.context;
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchParams, setSearchParams } = this.props;
    const { setCurrCategory } = this.context;

    if (prevState.categories.length !== this.state.categories.length) {
      if (!searchParams.get('category')) {
        setSearchParams({ category: this.state.categories[0] });
        setCurrCategory(this.state.categories[0]);
      } else {
        setCurrCategory(searchParams.get('category'));
      }
    }

    // *Handle SearchParams Changed
    if (
      prevProps.searchParams.get('category') !==
      this.props.searchParams.get('category')
    ) {
      const categ = this.props.searchParams.get('category');
      categ && this.setState({ currCategory: categ });
    }
    if (prevState.currCategory !== this.state.currCategory) {
      this.context.setCurrCategory(this.state.currCategory);
    }
  }

  handleParams = (category) => {
    this.props.setSearchParams({
      category,
    });
  };

  fetchCategories = async () => {
    const result = await fetchFunc(AllCategories);
    this.setState({ categories: result.categories });
  };

  render() {
    const categParams = this.context.currCategory;
    const { cart, setIsCartOpen, isCartOpen } = this.context;
    const cartCount = cart.reduce((acc, item) => {
      return acc + item.orderInfo.qty;
    }, 0);

    return (
      <header id='header'>
        <div className='center_sect'>
          <div className='categories'>
            {this.state.categories.map((category) => (
              <a
                href={`/${category}`}
                className={`categ_btn ${
                  categParams === category ? 'active' : ''
                }`}
                key={category}
                onClick={(e) => {
                  e.preventDefault();
                  this.handleParams(category);
                }}
                data-testid={
                  categParams === category
                    ? 'active-category-link'
                    : 'category-link '
                }
              >
                {category}
              </a>
            ))}
          </div>

          <span className='bag_icon'>
            <PiHandbagSimpleFill />
          </span>

          <button
            className='cart_btn'
            data-testid='cart-btn'
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <IoCartOutline />

            {cart.length >= 1 && (
              <span className='cart_items_count'>{cartCount}</span>
            )}
          </button>
        </div>

        <Cart />
      </header>
    );
  }
}

export default withSearchParams(Header);
