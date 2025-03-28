import NewsPage from '@/app/news/components/NewsPage';

export default function Page({ params }) {
  const page = parseInt(params.page, 10);

  return <NewsPage pageNumber={isNaN(page) ? 1 : page} />;
}
