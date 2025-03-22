import Link from "next/link";

export default function DropdownList({ title, to = "#", items, textColor }) {
  return (
    <div className="group relative cursor-pointer">
      {/* 🔹 Menu Item (Trigger) */}
      <div className="flex flex-row gap-2 items-center">
        <Link href={to || "#"} className={`text-[18px] ${textColor}`}>{title}</Link>
        <span className={`${textColor}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 transition-transform group-hover:rotate-180"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </div>

      {/* 🔹 Dropdown Menu */}
      <ul
        className="absolute left-0 top-full bg-white text-gray-800 shadow-lg border border-gray-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out w-max min-w-[220px] rounded-lg pointer-events-none group-hover:pointer-events-auto"
      >
        {items.map((item, index) => (
          <li key={index} className="hover:bg-gray-100 transition">
            <a
              href={item.to}
              className="px-4 py-3 block font-medium text-gray-600 hover:text-black whitespace-nowrap"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
