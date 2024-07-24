import EditProfile from './client';

export default function Page({ searchParams} : {searchParams: Record<string, string>}) {
  return <EditProfile searchParams={searchParams} />
}