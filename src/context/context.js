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
    loading: false
  };

  componentDidMount () {
    // from contentful items

    this.setProducts(items);
  }

  // set products
  setProducts = (products) => {
    let storeProducts = products.map(item => {
      const {id} = item.sys;
      const image = item.fields.image.fields.file.url
      const product = {id,...item.fields, image };
      return product;
    });
    // featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true);
    this.setState({
    // storeProducts : storeProducts
    // ES6
    storeProducts,
    filteredProducts : storeProducts,
    featuredProducts,
    cart: this.getStorageCart(),
    singleProduct: this.getStorageProduct(),
    loading: false
  });
};

  // get cart from local storage
  getStorageCart = () => {
    return []
  };
  // get product from local storage
  getStorageProduct = () => {
    return []
  };
  // get totals
  getTotals = () => {};
  // add totals
  addTotals = () => {};
  //  sync storage
  syncStorage = () => {};
  
  //  add to cart
  addToCart = id => {
    // console.log(`add to cart ${id}`);
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    // filter throuw the tempCart if item have the id that match the passed id
    let tempItem = tempCart.find(item => item.id === id);
    // if item NOT already in the cart
    if (!tempItem) {
      // find the item in the products
      tempItem = tempProducts.find(item => item.id === id );
      // total match the (the 1st) price 
      let total = tempItem.price;
      // add 1 item to the cart -> get all the props + a count +total
      let cartItem = {...tempItem, count:1, total};
      // get the item u currently have and add the new one
      tempCart = [...tempCart, cartItem]
    } 
    // if item already in the cart
    else {
      // if item in already in cart just add 1
      tempItem.count++;
      // multiply price per the amount of items(same)
      tempItem.total = tempItem.price * tempItem.count;
      // set fix value 2 number behind comma (for the price)
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    // 
    this.setState(()=>{
      return {cart:tempCart}
    }, ()=> {
      this.addTotals()
      this.syncStorage()
      this.openCart()
    })
  };

  //  set single product
  setSingleProduct = (id) => {
    console.log(`set single product ${id}`);
  }

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
          openCart: this.openCart,
          addToCart: this.addToCart,
          setSingleProduct : this.setSingleProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };