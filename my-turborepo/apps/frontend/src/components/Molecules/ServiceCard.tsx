type ServiceProps = {
  title: string;
  image: string;
  color: string;
};
export default function ServiceCard({ title, image, color }: ServiceProps) {
  return (
    <div
      className={`relative mb-12 flex cursor-pointer flex-col justify-between rounded-2xl p-2 ${color}`}
    >
      <div className="absolute inset-0 rounded-md opacity-10 hover:bg-gray-200"></div>
      <p className="p-4 text-lg font-semibold text-white sm:p-2">{title}</p>
      <div className="rounded-2xl">
        <img className="h-full w-full rounded-2xl" src={image} alt={title} />
      </div>
    </div>
  );
}
