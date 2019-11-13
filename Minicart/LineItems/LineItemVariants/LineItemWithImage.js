const LineItemWithImage = ({ product }) => {
  const { name, price, image_url } = product;

  const formatPrice = price => `$${(price / 100).toFixed(2)}`;

  return (
    <div>
      <h2>{name}</h2>
      <p>{formatPrice(price)}</p>
      <img src={image_url} />
    </div>
  )
};

export default LineItemWithImage;
