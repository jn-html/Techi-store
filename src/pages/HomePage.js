import React from 'react';
import { ProductConsumer } from '../context';

export default function HomePage() {
   return (
      <>
         {value => <h1>{value}</h1>}
      </>
   );
}
