export default function DropdownList({ title, items, textColor }) {
  return(
    <li className="group relative cursor-pointer">
      {/* FRONT */}
      <div className="flex flex-row gap-2">
        <a href="#" className={`text-[18px] ${textColor}`}>{title}</a>
        <span className={`${textColor}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </div>
      {/* DROPDOWN */}
      <ul className="invisible absolute top-full flex-col bg-white text-gray-800 shadow-xl group-hover:visible">
        {
          items.map((item, index) => (
            <li key={index} className="hover:bg-gray-400">
              <a href={item.to} className="px-2 py-1 block border-b border-gray-100 font-semibold text-sm uppercase text-gray-500 hover:text-black">{item.name}</a>
            </li>
          ))
        }
      </ul>
    </li>
  );
}