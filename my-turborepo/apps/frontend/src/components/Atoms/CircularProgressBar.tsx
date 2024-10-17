export default function CircularProgressBar({
  progress,
}: {
  progress: number;
}) {
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative h-14 w-14">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="text-white"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-green-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-green-500">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
