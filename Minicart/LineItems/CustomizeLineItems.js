import isFunction from 'lodash/isFunction'
import LineItem from './LineItemVariants/LineItem';
import LineItems from './LineItems';

const CustomizeLineItems = ({ products, cart, children }) => {

  if (isFunction(children)) {
    return children({ products, cart })
  }

  if (children) {
    return (
      <div>
        {cart.map(id => (
          <LineItem key={id} product={products.find(product => product.id === id)} Variant={children.type} />
        ))}
      </div>
    );
  }

  return <LineItems {...{ products, cart }} />;
};

export default CustomizeLineItems;
