type ExploreOptionType = {
  title: string;
  description: string;
};
export default function ExploreOption({
  title,
  description,
}: ExploreOptionType) {
  return (
    <div className="300 flex cursor-pointer flex-col items-start rounded-md p-2 hover:bg-slate-100 hover:bg-opacity-70">
      <h2 className="font-semibold"> {title} </h2>
      <p className="text-sm text-gray-500">{description} </p>
    </div>
  );
}
