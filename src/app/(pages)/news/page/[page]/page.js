import NewsPage from '../../components/NewsPage';

export default async function Page({ params }) {
  const { page } = await params;

  const pageNumber = parseInt(page, 10);
  return <NewsPage pageNumber={isNaN(pageNumber) ? 1 : pageNumber} />;
}