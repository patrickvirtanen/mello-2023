import tw from "tailwind-styled-components"

interface ButtonValue {
  handleClick?: any
  children: string
}

const Button = ({ handleClick, children }: ButtonValue) => {
  return (
    <ButtonComponent className="button-19" onClick={handleClick}>
      {children}
    </ButtonComponent>
  )
}

const ButtonComponent = tw.button`
text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`

export default Button
