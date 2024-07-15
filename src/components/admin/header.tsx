export default function AdminHeader({ title }: { title: string }) {
  return (
    <>
      <header className='hidden md:block'>
        <h1>{title}</h1>
      </header>
    </>
  );
}
