const LineItemOnlyImage = ({ product }) => {
  const { price, image_url } = product;

  const formatPrice = price => `$${(price / 100).toFixed(2)}`;

  return (
    <div>
      <p>{formatPrice(price)}</p>
      <img src={image_url} />
    </div>
  )
};

export default LineItemOnlyImage;
