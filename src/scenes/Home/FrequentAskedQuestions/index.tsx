import React, { useEffect, useState } from 'react';
import s from './frequentaskedquestions.module.scss';
import { IconButton, Typography } from '@mui/material';
import { data } from './data';
import { ArrowCircleDown } from '@mui/icons-material';
import clsx from 'clsx';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const FrequentAskedQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number>();

  useEffect(() => {}, []);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography className={s.title}>
          Frequently <br />
          Asked Questions
        </Typography>

        <LayoutGroup>
          <motion.div className={s.content} layout>
            {data.map((item, index) => (
              <motion.div className={s.item} key={index} layout>
                <motion.header
                  className={clsx([s.item])}
                  layout
                  onClick={() => {
                    // toggle
                    setSelectedQuestion((prevIdx) =>
                      prevIdx === index ? undefined : index,
                    );
                  }}
                >
                  <Typography className={s.question}>{item.title}</Typography>
                  <IconButton>
                    <ArrowCircleDown fontSize="large" />
                  </IconButton>
                </motion.header>

                <AnimatePresence mode="popLayout">
                  {selectedQuestion === index && (
                    <motion.div
                      layout="position"
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50 }}
                      transition={{
                        ease: 'easeIn',
                      }}
                    >
                      <motion.div className={clsx(s.answer)}>
                        <Typography className={s.answerText}>
                          {item.content}
                        </Typography>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default FrequentAskedQuestions;
