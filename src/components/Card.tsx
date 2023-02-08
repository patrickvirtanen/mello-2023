import tw from "tailwind-styled-components";

const Card = () => {
  return <CardWrapper>Card</CardWrapper>;
};

const CardWrapper = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
    font-reg`;
export default Card;
