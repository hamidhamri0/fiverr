export default function CommentCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center rounded-md border border-gray-200 bg-white p-1 px-2">
      <span>{count}</span>
    </div>
  );
}
