import React from "react";

export default function HeaderPage({ title }: Props) {
  return (
    <div className="flex relative h-full w-full items-center">
      <img src="/isc-header.png" alt="Remix" className="block w-full max-h-52 object-cover" />

      <div
        className="flex absolute inset-0 text-center justify-center w-full
        items-center text-[#ECECEC] text-2xl md:text-3xl lg:text-4xl font-light"
      >
        <h1 className="flex w-12/12 sm:w-5/6 md:w-4/6 self-center items-center text-center justify-center">
          <div className="flex flex-wrap px-10 py-10">{title}</div>
        </h1>
      </div>
    </div>
  );
}

type Props = {
  title: React.ReactNode;
};
