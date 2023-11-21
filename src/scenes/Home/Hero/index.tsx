import React from 'react';

import { ManageSearch } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import Image from 'next/image';

import s from './hero.module.scss';
import Img1 from './img.png';
import Img2 from './img_1.png';
import Img3 from './img_2.png';

const imgs = [Img1, Img2, Img3];

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

const imgContainerVariants = {
  initial: {},
  animate: {
    transition: {
      delay: 14,
      staggerChildren: 0.2,
      afterChildren: 1,
    },
  },
};

const imgContainerVariants2: Variants = {
  animate: {
    transition: {
      delay: 12,
      staggerChildren: 0.3,
    },
  },
};

const bgCircleVariants = {
  initial: {
    scale: 0.9,
    x: '100%',
    y: '-100%',
  },
  animate: {
    scale: 1,
    x: '58%',
    y: '-65%',
  },
};

const bgColorVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: '0',
  },
};

const imgVariants: Variants = {
  initial: {
    opacity: 0,
    y: '30%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const letterContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      beforeChildren: true, // delayChildren: 1.5,
    },
  },
};

const letterVariants: Variants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: 0,
  },
};

const lineVariants: Variants = {
  initial: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  animate: {
    scaleX: 1,
  },
};

const leftTextVariants: Variants = {
  initial: {
    y: '60%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const leftContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2, // beforeChildren: true,
      delayChildren: 1,
    },
  },
};

const heroTexts = ['We Can Help', 'You Find Your', 'Dream Job'];

const Hero = () => {
  return (
    <div className={s.container}>
      <Container className={s.wrapper}>
        <MotionConfig transition={transition}>
          <motion.div
            className={s.left}
            variants={leftContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={{}}>
              {heroTexts.map((text, outerIdx) => (
                <motion.div
                  className={s.txt_big}
                  key={outerIdx}
                  variants={letterContainerVariants}
                  // initial="initial"
                  // animate="animate"
                >
                  {Array.from(text).map((letter, idx) => (
                    <motion.div
                      className={s.letter}
                      variants={letterVariants}
                      transition={{
                        ease: [0.34, 1.56, 0.64, 1],
                        duration: 0.7,
                      }}
                      key={outerIdx + idx}
                    >
                      <Typography variant="h1" className={s.title}>
                        {letter === ' ' ? <>&nbsp;</> : letter}
                      </Typography>
                    </motion.div>
                  ))}
                  <motion.span className={s.line} variants={lineVariants} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={leftTextVariants}>
              <Typography variant="body1" className={s.desc}>
                Have an open position or two? Or ten? Create a free account and
                post away. You won’t pay a cent until you make your first hire.
                Our world class service will help you land your dream job.
              </Typography>
            </motion.div>

            <motion.div variants={leftTextVariants}>
              <Stack direction="row" spacing={2} className={s.search}>
                <TextField
                  type="text"
                  variant="outlined"
                  className={s.search_input}
                  label="Search Job Postings"
                />

                <Button
                  variant="contained"
                  size="large"
                  className={s.btn}
                  startIcon={<ManageSearch />}
                >
                  <p>Search Job</p>
                </Button>
              </Stack>
            </motion.div>
          </motion.div>

          <motion.div
            className={s.right}
            variants={imgContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div className={s.bg_clr} variants={bgColorVariants} />
            <motion.div className={s.bg_circle} variants={bgCircleVariants} />

            <motion.div className={s.img_list} variants={imgContainerVariants2}>
              {imgs.map((img) => (
                <motion.div
                  className={s.img}
                  key={img.src}
                  variants={imgVariants}
                >
                  <Image src={img} alt="hero image" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </MotionConfig>
      </Container>
    </div>
  );
};

export default Hero;
