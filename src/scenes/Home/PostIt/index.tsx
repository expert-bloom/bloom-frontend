import React from 'react';

import { Button, Typography } from '@mui/material';
import Image from 'next/image';

import Posts from './img.png';
import s from './postit.module.scss';

const PostIt = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.left}>
          <Typography className={s.title}>
            Post Jobs <br />
            Without Limits
          </Typography>

          <Typography className={s.desc}>
            Have an open position or two? or ten? Create a free account and post
            away. You won&apos;t pay a cent until you make your first hire.
          </Typography>

          <Button size="large" variant="contained">
            Post a Job
          </Button>
        </div>
        <div className={s.right}>
          <div className={s.post_img}>
            <Image src={Posts} alt="postes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIt;
