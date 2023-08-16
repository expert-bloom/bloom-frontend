import React from 'react';

import { ExpandMoreRounded, PlayArrow, Send } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
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
    <Card className={s.container} elevation={0}>
      <CardHeader
        title={
          <Typography variant="h5">Continue Building Your Profile</Typography>
        }
      />

      <CardContent className={s.content}>
        <Typography>
          The more information on your profile, the better we can match you with
          employers.
        </Typography>

        <Button variant="outlined" color="primary">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default FAQ;
