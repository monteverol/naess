export default function ServiceItem({ title, description }) {
  return(
    <li className="min-w-[356px] max-w-[356px] h-[300px] bg-white p-[32px] drop-shadow-md flex flex-col gap-[44px] rounded-[12px] transition duration-200 hover:drop-shadow-xl hover:scale-105">
      <figure className="min-w-[72px] max-w-[72px] min-h-[72px] bg-[#264D6C] rounded-[8px]"></figure>
      <article className="flex flex-col gap-[8px]">
        <h1 className="font-medium text-[24px]">{title}</h1>
        <p className="text-[16px]">
          {description}
        </p>
      </article>
    </li>
  );
}