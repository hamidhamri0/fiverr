
export default function DropDownArrowMenu({
  labelStyles,
  itemStyles,
  label,
  items
}: {
  itemStyles?: string;
  labelStyles?: string;
  label: string;
  items: string[];
}) {
  const [show, setShow] = useState(false);
  labelStyles = twMerge("flex cursor-pointer items-center justify-between", labelStyles);
  return <div>
      <div>
        <a onClick={() => setShow(p => !p)} className={labelStyles}>
          <span>{label}</span>
          <OpenArrow className="block" isOpen={show} />
        </a>
      </div>
      <div>
        <ul className={`flex h-0 flex-col overflow-hidden transition-all duration-300 ${show ? "h-auto" : "h-0"}`}>
          {items.map(item => {
          return <li key={item} className={itemStyles}>
                {item}
              </li>;
        })}
        </ul>
      </div>
    </div>;
}
  