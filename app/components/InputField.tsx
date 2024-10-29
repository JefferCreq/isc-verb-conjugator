import { Button } from "./Button";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ ...props }: Props) {
  return (
    <div className="mt-5 mb-5 flex flex-row w-full max-w-4xl self-center">
      <input
        className={`${props.className} flex bg-white mr-2.5 h-full min-h-12 w-full min-w-40 rounded-lg
            border px-5 text-sm font-medium focus:outline-0
            border-zinc-200 text-[#636C76] placeholder:text-[#636C76] placeholder:text-opacity-50`}
        placeholder="Type your message here..."
        {...props}
      />
      <input
        className={`${props.className} flex bg-white mr-2.5 h-full min-h-12 max-w-40 rounded-lg
            border px-5 text-sm font-medium focus:outline-0
            border-zinc-200  text-[#636C76] placeholder:text-[#636C76] placeholder:text-opacity-50`}
        value={"Iskonawa"}
        {...props}
      />
      <Button>Conjugar</Button>
    </div>
  );
}
