import React from 'react'
import isFunction from 'lodash/isFunction';
import LineItem from './LineItemVariants/LineItem';

const Content = (props) => {
  const { children, products, cart } = props;
  
  if(isFunction(children)) {
    return children(props);
  }

  if (children) {
    return children;
  }

  return (
    <div>
      {cart.map(id => (
        <LineItem key={id} product={products.find(product => product.id === id)} />
      ))}
    </div>
  );
};

export default Content;
