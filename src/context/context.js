import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from './socialData';
import { items } from './productData';

const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    // cartItems: 2,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax:0,
    carTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProducts: {},
    loading: true

  };
  // handle sidebar
  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  // hanldle sart
  handleCart = () => {
    this.setState({ cartOpen: !this.state.sidebarOpen });
  };
  //close cart
  closeCart = () => {
    this.setState({ cartOpen: false });
  };
  // open
  openCart = () => {
    this.setState({ cartOpen: true });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleCart: this.handleCart,
          closeCart: this.closeCart,
          openCart: this.openCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };