import { Component } from 'react';

// todo There is issue with params
// todo Save params once set from Header to local storage
// todo Once in this page, make checks in header to confirm we are here, then set current categ from localStorage
// todo God speed

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <section id='single_product'>Product</section>;
  }
}

export default SingleProduct;
