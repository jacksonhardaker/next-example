const LineItemSansImage = ({ product }) => {
  const { name, price } = product;

  const formatPrice = price => `$${(price / 100).toFixed(2)}`;

  return (
    <div>
      <h2>{name}</h2>
      <p>{formatPrice(price)}</p>
    </div>
  )
};

export default LineItemSansImage;
