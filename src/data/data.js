import { FiHome } from 'react-icons/fi'
import { MdAddTask, MdSchool, MdOutlineAddShoppingCart } from 'react-icons/md';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { RiCommunityLine } from 'react-icons/ri';
import { SiFuturelearn } from 'react-icons/si';
import { LuUser2 } from 'react-icons/lu';
import { CiLogout } from 'react-icons/ci';

export const sideBarTabs = [
  "Dashboard",
  "Assignments",
  "Courses",
  "Scholarships",
  "MyHMM",
  "MyCareer",
  "HMM Store",
  "Profile",
  "Log Out"
]

export const sideBarIcons = [
  <FiHome size={20} key={1}/>,
  <MdAddTask size={20} key={2} />,
  <MdSchool size={20} key={3} />,
  <LiaMoneyCheckAltSolid size={20} key={4} />,
  <RiCommunityLine size={20} key={5} />,
  <SiFuturelearn size={20} key={6} />,
  <MdOutlineAddShoppingCart size={20} key={7} />,
  <LuUser2 size={20} key={8} />,
  <CiLogout size={20} key={9} />
]