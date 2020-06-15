import React, { Component } from 'react';


const ProductContext = React.createContext();

class ProductProvider extends Component{
   state = {
      sidebarOpen: false,
      cartOpen: false,
      cartItems: 0
   }

   handleCart= () => {
      this.setState({CartOpen: !this.state.sidebarOpen})
   }

   handleCart= () => {
      this.setState({sideOpen: !this.state.sidebarOpen})
   }
   // close cart
   closeCart= () => {
      this.setState({cartOpen: false})
   }
   // open
   openCart= () => {
      this.setState({cartOpen: true})
   }

   render(){
      return (
         <ProductContext.Provider value={{
            // sidebarOpen: this.state.sidebarOpen,
            ...this.state,
            handleSidebar: this.handleSidebar,
            handleCart: this.handleCart,
            closeCart: this.closeCart,
            openCart: this.openCart
            }}
         >
         {this.props.children}
         </ProductContext.Provider>
      )   
   }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };