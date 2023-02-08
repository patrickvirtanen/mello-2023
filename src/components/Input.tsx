import tw from "tailwind-styled-components";

interface InputValue {
  handleChange: any;
  placeholder?: string;
  type: string;
}

const Input = ({ handleChange, placeholder, type }: InputValue) => {
  return (
    <InputComponent
      type={type}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const InputComponent = tw.input`
flex items-center rounded-lg border border-mello-blue bg-slate-50 px-2 text-sm text-slate-400 outline-none p-2 my-2
`;

export default Input;
