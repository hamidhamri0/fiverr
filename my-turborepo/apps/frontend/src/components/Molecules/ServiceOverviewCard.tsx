type ServiceOverviewCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export default function ServiceOverviewCard({
  icon,
  title,
  description,
}: ServiceOverviewCardProps) {
  return (
    <div className="flex flex-col items-start justify-between text-gray-600">
      <span className="mb-4">{icon}</span>
      <h3 className="mb-10 text-2xl">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
