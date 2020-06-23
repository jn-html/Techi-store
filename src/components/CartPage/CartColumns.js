import React from 'react'

export default function CartColumns() {
   return (
      // fluid = div will expand on screen size
      <div className="container-fluid text-center d-none d-lg-block my-5">
         <div className="row">
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">products</p>
            </div>
            {/* end of single column */}
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">name of product</p>
            </div>
            {/* end of single column */}
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">prices</p>
            </div>
            {/* end of single column */}
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">quantity</p>
            </div>
            {/* end of single column */}
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">remove</p>
            </div>
            {/* end of single column */}
            {/* single column */}
            <div className="col-lg-2">
               <p className="text-uppercase">Total</p>
            </div>
            {/* end of single column */}
         </div>
      </div>
   )
}
