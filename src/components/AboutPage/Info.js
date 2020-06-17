import React from 'react';
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';

export default function Info() {
   return (
      <section className="py-5">
         <div className="container">
            <div className="row">
               <div className="col-10 mx-auto col-md-6 my-3">
                  <img 
                     src={aboutBcg} 
                     className="img-fluid img-thumbnail" 
                     alt="about company"
                     style={{ background: "var(--darkGrey"}}
                  />
               </div>
               <div className="col-10 mx-auto col-md-6 my-3">
                  <Title title="about us" />
                  <p className="text-lead text-muted my-3">
                  technologies is our goal, quality our number one rule.
                  quality worth it, our customers love it. Come and see for yourself.
                  </p>
                  <p className="text-lead text-muted my-3">
                  technologies is our goal, quality our number one rule.
                  quality worth it, our customers love it. Come and see for yourself.
                  </p>
                  <button 
                     className="main-link" 
                     type="button"
                     style={{margintop: "2rem" }}
                     >
                        more info
                     </button>
               </div>
            </div>
         </div>

      </section>
   )
}
