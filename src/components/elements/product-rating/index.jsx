import { Rating, RoundedStar } from "@smastrom/react-rating";

function ProductRating({ rating, setRating  , readOnly}) {
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };
  return (
    <Rating
      readOnly={readOnly}
      style={{ width: "100%" }}
      value={rating}
      onChange={setRating}
      itemStyles={myStyles}
    />
  );
}

export default ProductRating;
