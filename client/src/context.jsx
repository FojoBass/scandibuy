import { Component, createContext } from 'react';
import { categories as dummyCategories } from './data';
import { useSearchParams } from 'react-router-dom';

export const AppContext = createContext();

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

class AppProvider extends Component {
  constructor(props) {
    super(props);
    const dummyCategs = dummyCategories.map((category) => category.name);
    this.state = {
      // !Change to the real categories later
      categories: dummyCategs,
      currCategory: this.props.searchParams.get('category') ?? dummyCategs[0],
    };
  }

  componentDidMount() {
    const { searchParams, setSearchParams } = this.props;
    if (!searchParams.get('category')) {
      setSearchParams({ category: this.state.categories[0] });
      this.setCurrCategory(this.state.categories[0]);
    } else {
      this.setCurrCategory(searchParams.get('category'));
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) {
      // console.log('Change in context');
    }
  }

  setCurrCategory = (category) => {
    this.setState({ currCategory: category });
  };

  // updateValue = (newValue) => {
  //   this.setState({ value: newValue });
  // };

  render() {
    return (
      <AppContext.Provider
        // value={{ state: this.state, updateValue: this.updateValue }}
        value={{
          currCategory: this.state.currCategory,
          setCurrCategory: this.setCurrCategory,
          categories: this.state.categories,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withSearchParams(AppProvider);
