import React from 'react';
import Title from '../Title';

export default function contact() {
   return (
      <section className="py-5">
         <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
            <Title title="Contact us" />
               <form className="my-5" action="https://formspree.io/z1.dev.test.1.a@gmail.com" method="POST">
               {/* first */}
               <div className="form-group">
                  <input 
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="John smith"
                  />
               </div>
               {/* email */}
               <div className="form-group">
                  <input 
                     type="email"
                     name="email"
                     className="form-control"
                     placeholder="Johnsmithemail@email.com"
                  />
               </div>
               {/* subject */}
               <div className="form-group">
                  <input 
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="object"
                  />
               </div>
               {/* message */}
               <div className="form-group">
                  <textarea 
                     name="message"
                     className="form-control"
                     rows="10"
                     placeholder="hello there, how may i help you"
                  />
               </div>
               {/* submit */}
               <div className="form-group mt-3">
                  <input 
                     type="submit" 
                     value="Send" 
                     className="form-control bg-primary text-white" 
                  />
               </div>
               </form>
            </div>
         </div>
      </section>
   )
}
