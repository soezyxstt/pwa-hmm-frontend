import Icon from '@/components/ui/button/icon';
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';
import { BsTelephone } from 'react-icons/bs';
import Header from '@/components/client/header';
import { getFullUser } from '@/lib/dal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = async () => {
  const { data: {name, avatar, email, about, role, phoneNumber, NIM} } = await getFullUser();
  return (
    <main className='flex flex-col items-stretch w-full h-max gap-6 relative'>
      <Header title='Profile' />
      <div className='rounded-xl flex flex-col flex-1 bg-white'>
        <div className='bg-navy min-h-[15vh] w-full z-0 relative md:mb-20 mb-16 rounded-t-xl'>
          <div className='flex items-center justify-center p-1.5 bg-white w-fit rounded-full absolute left-[7.5%] bottom-0 translate-y-1/2'>
            <Avatar className='md:w-40 md:h-40 h-32 w-32'>
              <AvatarImage
                src={avatar}
                alt='avatar'
              />
              <AvatarFallback className='bg-white'>
                {name.split(' ').map((t: string) => t[0])}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className='flex gap-6 md:gap-8 flex-col md:px-16 px-8 md:py-8 py-8 shadow-md'>
          <div className=''>
            <h1 className='text-xl font-bold'>{name}</h1>
            <h3 className='text-sm'>{NIM}</h3>
            <h5 className='text-abu-3 text-xs'>Mechanical Engineering</h5>
          </div>
          <div className='md:flex gap-10 space-y-4 md:space-y-0 *:items-center items-center'>
            <div className='flex gap-2'>
              <Icon
                icon={<IoLocationOutline />}
                className='bg-oren p-1.5'
              />
              <h6 className='font-2xs'>Jakarta, Indonesia</h6>
            </div>
            <div className='flex gap-2'>
              <Icon
                icon={<BsTelephone />}
                className='bg-oren p-1.5'
              />
              <h6 className='font-2xs'>{phoneNumber || '-'}</h6>
            </div>
            <div className='flex gap-2'>
              <Icon
                icon={<IoMailOutline />}
                className='bg-oren p-1.5'
              />
              <h6 className='font-2xs'>{email}</h6>
            </div>
          </div>
          <div className='grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-y-6 md:gap-y-10'>
            <div className='[&_p]:text-xs [&_p]:font-semibold space-y-2'>
              <h2 className='text-base'>Biodata</h2>
              <p className=''>Tanggal lahir:</p>
              <p className=''>Alamat:</p>
              <p className=''>Golongan darah:</p>
              <p className=''>Riwayat peyakit:</p>
            </div>
            <div className='[&_p]:text-xs [&_p]:font-semibold space-y-2'>
              <h2 className='text-base'>Personal Contact</h2>
              <p className=''>ID Line:</p>
              <p className=''>Phone Number:</p>
              <p className=''>emergency Number:</p>
            </div>
            <div className='[&_p]:text-xs [&_p]:font-semibold space-y-2'>
              <h2 className='text-base'>Kemahasiswaan</h2>
              <p className=''>Badan HMM:</p>
              <p className=''>Unit Kegiatan Mahasiswa:</p>
              <p className=''>Hobby:</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const metadata = {
  title: 'Profile',
};

export default ProfilePage;
