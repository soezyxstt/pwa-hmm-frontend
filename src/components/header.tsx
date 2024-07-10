import ProfileMenu from './profileMenu';

export default function Header({ title }: { title: string }) {
  return (
    <div className='md:flex justify-between hidden'>
      <h1>{title}</h1>
      <ProfileMenu />
    </div>
  );
}
