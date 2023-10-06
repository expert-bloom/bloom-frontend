import React from 'react';

import Image from 'next/image';

import LoadingGif from '@/public/loader.gif';

const Loader = () => {
  return (
    <div>
      <Image src={LoadingGif} alt="loading" width={100} height={100} />
    </div>
  );
};

export default Loader;
