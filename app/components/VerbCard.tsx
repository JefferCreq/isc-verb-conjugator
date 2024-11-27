type VerbCardProps = {
  verb: string;
  translations: {
    spa: string;
    eng: string;
  };
};

export default function VerbCard({ verb, translations }: VerbCardProps) {
  return (
    <div
      className="bg-white border border-gray-300
        rounded-lg py-6 px-10 shadow-lg w-full"
    >
      <p className="text-2xl font-semibold text-gray-800">{verb}</p>
      <div className="mt-2">
        <p className="text-gray-500">
          <span className="font-mono">(spa)</span>{" "}
          <span className="font-semibold text-gray-800">{translations.spa}</span>
        </p>
        <p className="text-gray-500">
          <span className="font-mono">(eng)</span>{" "}
          <span className="font-semibold text-gray-800">{translations.eng}</span>
        </p>
      </div>
    </div>
  );
}
