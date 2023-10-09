import React from 'react';

import Image from 'next/image';

import LoadingGif from '@/public/loader.gif';

const Loader = (props: any) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        margin: '4rem 0',
      }}
      {...props}
    >
      <Image src={LoadingGif} alt="loading" width={100} height={100} />
    </div>
  );
};

export default Loader;
