import NewsArticle from "../../news/components/ui/NewsArticle";

export default function NewsSection({ newsArticles }) {

  return(
    <section className="bg-white h-screen w-full px-[168px] flex gap-[40px] flex-col justify-center">
      <article className="flex flex-col gap-[52px]">
        <h1 className="text-[36px] font-bold home-heading">Latest News & Updates</h1>
        <p className="text-[18px] w-[550px]">Stay informed with the latest developments, company news, and industry insights from NAESS.</p>
      </article>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          newsArticles.slice(0, 3).map(item => (
            <NewsArticle 
              key={item.id}
              item={item}
            />
          ))
        }
      </ul>
      <button type="button" role="button" className="w-[232px] h-[52px] text-black font-bold border-2 border-[#101112] rounded-[8px] cursor-pointer transition-all duration-200 active:scale-95 after:content-['>'] after:ml-4">
        See All News
      </button>
    </section>
  );
}