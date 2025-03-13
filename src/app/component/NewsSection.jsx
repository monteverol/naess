export default function NewsSection() {
  const news = [
    {
      title: "News",
      description: "News Caption here"
    },
    {
      title: "News",
      description: "News Caption here"
    },
    {
      title: "News",
      description: "News Caption here"
    },
    {
      title: "News",
      description: "News Caption here"
    }
  ]

  return(
    <section className="h-[768px] w-full px-[168px] flex gap-[40px] flex-col justify-center">
      <article className="flex flex-col gap-[12px]">
        <h1 className="text-[40px] font-bold">Latest News</h1>
        <p className="text-[18px] w-[550px]">Stay informed with the latest happenings at NAESS Shipping – company news, industry insights, and upcoming events</p>
      </article>
      <ul className="flex flex-row gap-[28px]">
        {
          news.map((index, key) => (
            <li key={key} className="w-[260px] h-[272px] bg-white drop-shadow-lg rounded-[8px] p-[20px] flex items-center cursor-pointer transition duration-200 hover:drop-shadow-xl">
              <article className="flex flex-col w-full gap-[8px]">
                <h1 className="text-[24px] font-bold">{index.title}</h1>
                <p className="text-[16px]">{index.description}</p>
              </article>
            </li>
          ))
        }
      </ul>
      <button type="button" role="button" className="w-[260px] h-[56px] bg-[#264D6C] text-white font-bold rounded-[8px] cursor-pointer transition duration-200 active:scale-95">
        See All News
      </button>
    </section>
  );
}