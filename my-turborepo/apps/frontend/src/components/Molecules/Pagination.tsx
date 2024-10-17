
export default function Pagination({
  pages
}: {
  pages: number;
}) {
  let [start, setStart] = React.useState(1);
  let [end, setEnd] = React.useState(Math.min(pages, COUNT));
  let [currentPage, setCurrentPage] = React.useState(1);
  return <div className="item flex items-center justify-center gap-3">
      <button onClick={() => {
      if (currentPage == 1) return;
      let newCurrent = currentPage - 1;
      setCurrentPage(newCurrent);
      if (newCurrent >= start) return;
      setStart(p => p - 1);
      setEnd(p => p - 1);
    }} disabled={currentPage == 1} className="rounded-full bg-gray-100 p-4">
        <BsArrowLeft />
      </button>
      <div className="flex gap-4 md:gap-2 sm:hidden">
        {Array(end - start + 1).fill(0).map((_, index) => {
        const page = start + index;
        return <button onClick={() => {
          if (page > end - 5 && end < pages) {
            const newStart = Math.min(end - 5, pages - 9);
            const newEnd = Math.min(end + 4, pages);
            setStart(newStart);
            setEnd(newEnd);
          } else if (page < start + 5 && start > 1) {
            const newStart = Math.max(start - 4, 1);
            const newEnd = Math.max(start + 5, 10);
            setStart(newStart);
            setEnd(newEnd);
          }

          setCurrentPage(page);
        }} key={index} className={`h-10 w-10 rounded-full p-2 ${currentPage === index + start ? "bg-black text-white" : "bg-gray-100"}`}>
                {page}
              </button>;
      })}
      </div>
      <button disabled={currentPage === pages} onClick={() => {
      if (currentPage === pages) return;
      let newCurrent = currentPage + 1;
      setCurrentPage(newCurrent);
      if (newCurrent <= end) return;
      setStart(p => p + 1);
      setEnd(p => p + 1);
    }} className="rounded-full bg-gray-100 p-4">
        <BsArrowRight />
      </button>
    </div>;
}
  