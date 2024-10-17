
export default function RoundedCategory({
  name,
  img
}: {
  name: string;
  img: string;
}) {
  return <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white p-3 text-xl font-semibold text-gray-900 shadow-md lg:p-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-3 lg:h-12 lg:w-12">
        <img src={img} alt={name} className="h-8 w-8" />
      </div>
      <span className="px-2">{name}</span>
    </div>;
}
  