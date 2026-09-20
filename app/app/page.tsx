import { redirect } from 'next/navigation';

/** Legacy path. Anyone landing here wanted the dashboard, not the marketing site. */
export default function AppPage() {
  redirect('/demo');
}
