import tw from "tailwind-styled-components";

interface ButtonValue {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  children: string;
}

const Button = ({ handleClick, children }: ButtonValue) => {
  return <ButtonComponent onClick={handleClick}>{children}</ButtonComponent>;
};

const ButtonComponent = tw.div`
text-white bg-mello-blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 focus:outline-none flex justify-center p-3 uppercase
`;

export default Button;
