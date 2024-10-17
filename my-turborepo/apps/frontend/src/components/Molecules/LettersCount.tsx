import { useWatch } from "react-hook-form";

export default function LettersCount() {
  const watchTitle = useWatch({
    name: "title",
  });
  return (
    <p className="mt-1 text-xs text-gray-500">
      {watchTitle?.length || 0}/80 max
    </p>
  );
}
