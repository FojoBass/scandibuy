import { Component } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PiHandbagSimpleFill } from 'react-icons/pi';
import { IoCartOutline } from 'react-icons/io5';
import { AppContext } from '../context';
import { categories as dummyCategories } from '../data';
import Cart from './cartOverlay/Cart';

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
    const dummyCategs = dummyCategories.map((category) => category.name);

    this.state = {
      // !Change to the real categories later
      categories: dummyCategs,
      currCategory: this.props.searchParams.get('category') ?? dummyCategs[0],
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    const { searchParams, setSearchParams } = this.props;
    const { setCurrCategory } = this.context;
    if (!searchParams.get('category')) {
      setSearchParams({ category: this.state.categories[0] });
      setCurrCategory(this.state.categories[0]);
    } else {
      setCurrCategory(searchParams.get('category'));
    }

    this.prevContext = this.context;
  }

  componentDidUpdate(prevProps, prevState) {
    // *Handle SearchParams Changed
    if (
      prevProps.searchParams.get('category') !==
      this.props.searchParams.get('category')
    ) {
      this.setState({ currCategory: this.props.searchParams.get('category') });
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

  render() {
    const categParams = this.context.currCategory;
    // console.log('Categories: ', this.context.categories);
    // console.log('Current Categ: ', this.context.currCategory);

    return (
      <header id='header'>
        <div className='center_sect'>
          <div className='categories'>
            {this.state.categories.map((category) => (
              <button
                className={`categ_btn ${
                  categParams === category ? 'active' : ''
                }`}
                key={category}
                onClick={() => this.handleParams(category)}
                data-testid={
                  categParams === category
                    ? 'active-category-link'
                    : 'category-link '
                }
              >
                {category}
              </button>
            ))}
          </div>

          <span className='bag_icon'>
            <PiHandbagSimpleFill />
          </span>

          <button className='cart_btn' data-testid='cart-btn'>
            <IoCartOutline />

            <span className='cart_items_count'>5</span>
          </button>
        </div>

        <Cart />
      </header>
    );
  }
}

export default withSearchParams(Header);
