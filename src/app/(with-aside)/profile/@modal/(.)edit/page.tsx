import EditProfile from '../../edit/client';
import Modal from './modal';

export default function Page({searchParams}: {searchParams: Record<string, string>}) {
  return <Modal><EditProfile searchParams={searchParams} /></Modal>;
}
