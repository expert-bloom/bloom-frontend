import React from 'react';

import { ExpandMoreRounded, PlayArrow } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import s from './faq.module.scss';

const data = [
  {
    title: 'How can I view contractor profiles?',
    content:
      'A freelancer is a single person who works for themselves. An agency is a company with multiple employees.',
  },
  {
    title: 'How do interviews work',
    content:
      'A freelancer is a single person who works for themselves. An agency is a company with multiple employees.',
  },
  {
    title: 'How much does it cost?',
    content:
      'A freelancer is a single person who works for themselves. An agency is a company with multiple employees.',
  },

  {
    title: 'What is the difference between a freelancer and an agency?',
    content:
      'A freelancer is a single person who works for themselves. An agency is a company with multiple employees.',
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Card className={s.container}>
      <CardHeader
        title={<Typography variant="h5">Frequently Asked Questions</Typography>}
      />

      <CardContent className={s.vid}>
        {data.map((item, idx) => (
          <Accordion
            expanded={expanded === idx}
            onChange={handleChange(idx)}
            key={idx}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel1bh-content"
            >
              <Typography sx={{ width: '93%' }}>{item.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }} fontWeight={300}>
                {item.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};

export default FAQ;
