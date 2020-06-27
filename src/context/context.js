import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from './socialData';
import { items} from './productData';

const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    carTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProducts: {},
    loading: true,
    search: '',
    price: 0,
    min: 0,
    max: 0,
    company: "all",
    shipping: false
  };

  componentDidMount() {
    // from contentful items

    this.setProducts(items);
  }

  // set products
  setProducts = (products) => {
    let storeProducts = products.map(item => {
      const {
        id
      } = item.sys;
      const image = item.fields.image.fields.file.url
      const product = {
        id,
        ...item.fields,
        image
      };
      return product;
    });
    // featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true);

    // get max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price));

    this.setState({
        // ES5 
        // storeProducts : storeProducts
        // ES6
        storeProducts,
        filteredProducts: storeProducts,
        featuredProducts,
        cart: this.getStorageCart(),
        singleProduct: this.getStorageProduct(),
        loading: false,
        price: maxPrice,
        max: maxPrice
      },
      () => {
        this.addTotals();
      }
    );
  };

  // get cart from local storage
  getStorageCart = () => {
    let cart;
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      cart = [];
    }
    return cart;
  };

  // get product from local storage
  getStorageProduct = () => {
    return localStorage.getItem('singleProduct') ?
      JSON.parse(localStorage.getItem('singleProduct')) :
      {};
  };

  // get totals
  getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item => {
      subTotal += item.total;
      cartItems += item.count;
    });
    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));
    return {
      // cartItems : cartItems
      cartItems,
      subTotal,
      tax,
      total
    };
  };

  // add totals
  addTotals = () => {
    const totals = this.getTotals();
    this.setState({
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    });
  };

  //  sync storage
  syncStorage = () => {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  };

  //  add to cart
  addToCart = id => {
    // console.log(`add to cart ${id}`);
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    // filter throw the tempCart if item have the id that match the passed id
    let tempItem = tempCart.find(item => item.id === id);
    // if item NOT already in the cart
    if (!tempItem) {
      // find the item in the products
      tempItem = tempProducts.find(item => item.id === id);
      // total match the (the 1st) price 
      let total = tempItem.price;
      // add 1 item to the cart -> get all the props + a count +total
      let cartItem = {
        ...tempItem,
        count: 1,
        total
      };
      // get the item u currently have and add the new one
      tempCart = [...tempCart, cartItem]
    }
    // if item already in the cart
    else {
      // if item in already in cart just add 1
      tempItem.count++;
      // multiply price per the amount of items(same)
      tempItem.total = tempItem.price * tempItem.count;
      // set fix value, 2 number behind comma (for the price)
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    // 
    this.setState(() => {
      return {
        cart: tempCart
      }
    }, () => {
      this.addTotals()
      this.syncStorage()
      this.openCart()
    })
  };

  //  set single product
  setSingleProduct = (id) => {
    let product = this.state.storeProducts.find(item => item.id === id);
    localStorage.setItem('singleProduct', JSON.stringify(product));
    this.setState({
      singleProduct: {
        ...product
      },
      loading: false
    });
  }

  // handle sidebar
  handleSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  };
  // hanldle sart
  handleCart = () => {
    this.setState({
      cartOpen: !this.state.cartOpen
    });
  };
  //close cart
  closeCart = () => {
    this.setState({
      cartOpen: false
    });
  };
  // open
  openCart = () => {
    this.setState({
      cartOpen: true
    });
  };

  // cart functionnality
  // increment
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    // console.log(cartItem);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    // toFixed return a string, use parseFloat de get a number
    cartItem.total = parseFloat(cartItem.total.toFixed(2))
    // will not render if no setState
    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    },
    // when setState done, run those function to addtotals to the cart and sync change 
    ()=> {
        this.addTotals()
        this.syncStorage()
    })
  };
  // decrement
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);

    cartItem.count = cartItem.count-1;
    if (cartItem.count === 0){
      this.removeItem(id)
    }
    else {
      cartItem.total = cartItem.count * cartItem.price;
      // toFixed return a string, use parseFloat de get a number
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
          this.syncStorage();
        }
      );
    }
  };

  // remove item
  removeItem = (id) => {
    let tempCart = [...this.state.cart];
    //filter -> return only item that don't have the id
    tempCart = tempCart.filter(item => item.id !== id)
    this.setState({
      cart: [...tempCart]
    },
    // to update the cart
    ()=> {
      this.addTotals();
      this.syncStorage();
    }
  );
    // console.log(id);
  }
  // clear cart
  clearCart = () => {
    this.setState({
      cart: []
    },
    ()=> {
      this.addTotals()
      this.syncStorage()
    })
  };

  // handle filtering
  // look for event to check (typing, box selectBox etc...)
  handleChange = (event) => {
    const name = event.target.name;
    const value = 
    // if checked  instead of valu get target cheked
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
        // console.log(`Ǹame : ${name}, value ${value}`);
        this.setState ({
          [name]:value
      },
      this.sortData 
    );
  };

  // sort data
  // 
  sortData = () => {
    // storeProducts unchange store original data
    const { storeProducts, price, company, shipping, search } = this.state;
    let tempProducts = [...storeProducts];

    let tempPrice = parseInt(price);

    // filtering based on price
    tempProducts = tempProducts.filter(item => item.price <= tempPrice);

    // if company != to all then filter the item'company to return the company set in the if statement
    // filtering based on company
    if(company !== "all"){
      tempProducts = tempProducts.filter(item => item.company === company)
    }

    // filtering based on shipping
    if(shipping){
      tempProducts = tempProducts.filter(item => item.freeShipping === true);
    }

    // filtering on search
    if(search.length > 0){
       tempProducts = tempProducts.filter(item =>{
        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    
    this.setState({
      filteredProducts : tempProducts
    });
  };

  render() {
    return ( <
      ProductContext.Provider value = {
        {
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleCart: this.handleCart,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addToCart: this.addToCart,
          setSingleProduct: this.setSingleProduct,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          handleChange: this.handleChange
        }
      } >
      {
        this.props.children
      } 
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {
  ProductProvider,
  ProductConsumer
};