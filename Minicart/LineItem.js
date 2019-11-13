import LineItemWithImage from "./LineItemWithImage";

const LineItem = ({ product, Variant }) => {

  if (Variant) {
    return <Variant {...{ product }} />
  }

  return <LineItemWithImage {...{ product }} />;
};

export default LineItem;
