import NewsArticle from "../../news/components/ui/NewsArticle";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

export default function NewsSection({ newsArticles }) {
  const router = useRouter();

  return(
    <section className="bg-white h-auto w-full px-8 md:px-20 lg:px-40 flex gap-[40px] py-8 flex-col justify-center">
      <article className="flex flex-col gap-[52px]">
        <h1 className="text-[36px] font-bold home-heading">Latest News & Updates</h1>
        <p className="text-[18px] w-[550px]">Stay informed with the latest developments, company news, and industry insights from NAESS.</p>
      </article>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          !newsArticles || newsArticles.length === 0 ? (
            <li className="col-span-full flex justify-center">
              <LoadingSpinner />
            </li>
          ) : newsArticles.slice(0, 3).map(item => (
            <NewsArticle key={item.id} item={item} />
          ))
        }
      </ul>
      <button 
        type="button" 
        role="button" 
        onClick={() => router.push('/news/page/1')}
        className="w-[232px] h-[52px] text-black font-bold border-2 border-[#101112] rounded-[8px] cursor-pointer transition-all duration-200 active:scale-95 after:content-['>'] after:ml-4"
      >
        See All News
      </button>
    </section>
  );
}