import { redirect } from 'next/navigation';

export default function NewsRedirect() {
  redirect('/news/page/1');
}