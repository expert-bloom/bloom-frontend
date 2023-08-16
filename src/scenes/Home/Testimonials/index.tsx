import React, { useState } from 'react';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import { useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

import { wrap } from 'src/utils';

import s from './testimonials.module.scss';

const testimonials = [
  {
    text: `"I love that Overpass lets us manage everything in one place.
       It's super helpful to be able to listen to voice samples
        and find quality salespeople that can grow with our team."`,
    name: 'Vitali',
    role: 'Principal of East Coast Medical Supplies',
    profilePic: '',
  },
  {
    text: `I see Overpass being a long-term part of my business structure. 
          Not just for this business, but also our future endeavors. 
          The affordability, the flexibility, and ease of use can't be beat.`,
    name: 'Vitali',
    role: 'CEO of Advisor Fuel',
    profilePic: '',
  },
  {
    text: `Overpass really simplified our sales process. 
        It's so easy for us to find talent, track our reps' time and progress,
         and pay them all from one platform`,
    name: 'Vitali',
    role: 'VP and CMO at CTL',
    profilePic: '',
  },
];

const Testimonials = () => {
  const [testimonial, setTestimonial] = useState(testimonials[0]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // useTransform(velocityFactor, v => console.log('scrollY: ', v))

  // console.log('wrap: ', wrap(0, 3, 6.5));

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.controller}>
          <IconButton size="large">
            <ArrowUpward />
          </IconButton>

          <IconButton size="large">
            <ArrowDownward />
          </IconButton>
        </div>

        <div className={s.content}>
          <Typography className={s.title} variant="body1">
            Testimonials
          </Typography>
          <div>
            <Typography className={s.desc} variant="body1">
              {testimonial.text}
            </Typography>
            <Typography className={s.owner} variant="subtitle1">
              {testimonial.name}, <span> {testimonial.role}</span>
            </Typography>
          </div>

          <div className={s.ppls}>
            {[1, 2, 3].map((i) => (
              <div className={s.pp} key={i}>
                <Avatar />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
