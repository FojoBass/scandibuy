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
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path='product/:id' element={<SingleProduct />} />
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
        <ToastContainer
          position='top-center'
          closeButton={false}
          transition={Zoom}
          autoClose={3000}
          hideProgressBar={true}
        />
        <Header />
        <Outlet />
      </div>
    );
  }
}
