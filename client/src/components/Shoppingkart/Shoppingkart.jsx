import React from 'react';
import { Link } from 'react-router-dom';
import './Shoppingkart.css';
import Button from 'react-bootstrap/Button';

export default function Shoppingkart(){


 return(

<div>

	 {/* Render Items*/}
   <h4>Item 1  </h4>
   <h4>Item 2  </h4>
   <h4>Item 3  </h4>
   <h4>Item 4  </h4>
   <h4>Item 5  </h4>
   <h4>Item 6  </h4>
   <h4>Item 7  </h4>
   <h4>Item 8  </h4>
   <h4>Item 9  </h4>
   <h4>Item 10  </h4>

	 {/* kart footer totals */}

	<div className="text-center text-lg-bottom mt-4 pt-2">
	<h3>Total</h3>
<h3>$0.000</h3>	
	 <h4>Clear cart</h4>
</div>

	 {/* To pay API   */}
	<div className="text-center text-lg-bottom mt-4 pt-2">
	<Button>Checkout</Button>
	</div>

	 </div>


 );
};

