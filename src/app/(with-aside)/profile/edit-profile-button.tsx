'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditProfile() {
  return (
    <Link href='/profile/edit'>
      <motion.span layoutId='modal-edit-profile' className='md:px-4 px-2.5 py-1.5 rounded-xl border text-white font-medium bg-navy border-white hover:bg-white/20 transition-all text-sm md:text-base'>
        Edit Profile
      </motion.span>
    </Link>
  );
}