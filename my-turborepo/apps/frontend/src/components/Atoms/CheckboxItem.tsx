export default function CheckboxItem({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-gray-300 bg-gray-100 accent-black"
      />
      <label className="font-semibold">{label}</label>
    </div>
  );
}
