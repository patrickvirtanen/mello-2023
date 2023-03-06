import tw from "tailwind-styled-components";

interface ButtonValue {
  handleClick?: React.MouseEventHandler<HTMLDivElement>
  children: string
}

const Button = ({ handleClick, children }: ButtonValue) => {
  return (
    <div className="button-19" onClick={handleClick}>
      {children}
    </div>
  )
}

const ButtonComponent = tw.div`
text-white cursor-pointer bg-mello-blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 focus:outline-none flex justify-center p-3 uppercase
`

export default Button;
