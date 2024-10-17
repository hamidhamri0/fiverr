export default function SwitchButton({
  label,
  color = "green-400",
}: {
  label: string;
  color?: string;
}) {
  let className = `peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-${color} peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full`;
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" />
      <div className={className}></div>
      <span className="text-md ms-3 font-semibold text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}
