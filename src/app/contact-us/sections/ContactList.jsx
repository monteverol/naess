import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactList() {
  return(
    <ul className="z-10 flex flex-wrap gap-8 px-20 py-8 w-full h-auto justify-center xl:px-40 xl:justify-between bg-white">
      {/* EMAIL */}
      <li className="card w-[324px] p-8 rounded-lg bg-[#E9F2FC] flex flex-col gap-4 justify-between items-start drop-shadow-md">
        <MdOutlineEmail size={32} />
        <article className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold">Email</h2>
          <p className="text-[16px]">We'd love to hear from you! Reach out anytime!</p>
        </article>
        <h1 className="text-[20px] font-bold underline">mail@naess.com.ph</h1>
      </li>

      {/* PHONE */}
      <li className="card w-[324px] p-8 rounded-lg bg-[#E9F2FC] flex flex-col gap-4 justify-between items-start drop-shadow-md">
        <MdOutlinePhone size={32} />
        <article className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold">Phone</h2>
          <p className="text-[16px]">Chat with our team for immediate assistance.</p>
        </article>
        <h1 className="text-[20px] font-bold underline">+63 (02) 8521-3361</h1>
      </li>

      {/* ADDRESS */}
      <li className="card w-[324px] p-8 rounded-lg bg-[#E9F2FC] flex flex-col gap-4 justify-between items-start drop-shadow-md">
        <FaLocationDot size={32} />
        <article className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold">Address</h2>
          <p className="text-[16px]">We accepts walk-ins to assists you thoroughly</p>
        </article>
        <h1 className="text-[20px] font-bold underline">2215 Leon Guinto St, Malate, Manila, 1004 Metro Manila</h1>
      </li>
    </ul>
  );
}