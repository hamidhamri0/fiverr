type UserStatsProps = {
  From?: string;
  memberSince?: string;
  languages?: string[];
  description?: string;
};
export default function UserStats({
  From,
  memberSince,
  languages,
  description,
}: UserStatsProps) {
  return (
    <div className="maw-w-[700px] mx-auto rounded-md border border-gray-300 p-4">
      <div className="mb-4 grid grid-cols-2 gap-4 border-b border-gray-400 pb-4 xs:grid-cols-1">
        <div className="flex flex-col gap-1">
          <div>From</div>
          <div className="font-bold">{From}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div>Member Since</div>
          <div className="font-bold">{memberSince}</div>
        </div>
        {languages?.length ? (
          <div className="flex flex-col gap-1">
            <div>Languages</div>
            <div className="flex gap-2">
              {languages.map((lang, i) => (
                <div key={lang} className="font-bold">
                  {lang}
                  {i !== languages.length - 1 && ","}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}
