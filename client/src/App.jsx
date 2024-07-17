import { Component } from 'react';
import { AppContext } from './context';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Error from './pages/Error';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = AppContext;

  render() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<Root />} errorElement={<Error />}>
          <Route index element={<Products />} />
          <Route path='/:id' element={<SingleProduct />} />
        </Route>
      )
    );
    return <RouterProvider router={router} />;
  }
}

export default App;

class Root extends Component {
  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}
