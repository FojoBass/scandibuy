import { Component } from 'react';
import { AppContext } from '../context';
import { products } from '../data';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedProducts: [],
      loading: true,
    };

    this.prevContext = this.context;
  }

  static contextType = AppContext;

  componentDidMount() {
    console.log(this.context.currCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.prevContext?.currCategory !== this.context.currCategory) {
      this.prevContext = this.context;
    }
  }

  fetchProducts = (category) => {};

  render() {
    const { currCategory } = this.context;
    const { loading, products } = this.state;

    return (
      <section id='products'>
        <div className='center_sect'>
          {currCategory ? (
            <h2>{currCategory}</h2>
          ) : (
            <h2 className='dummy_head'></h2>
          )}
          {loading
            ? 'Loading...'
            : products.length
            ? 'Show Products'
            : 'No Products (Something do off)'}
        </div>
      </section>
    );
  }
}

export default Products;
