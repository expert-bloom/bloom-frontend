import React from 'react';
import s from './companyprofile.module.scss';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const CompanyProfile = () => {
  return (
    <Card className={s.container}>
      <CardContent className={s.content}>
        <div className={s.icon}>
          <svg
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
              <path
                d="M26,2 C29.3137085,2 32,4.6862915 32,8 L32,18 L38,18 C41.3137085,18 44,20.6862915 44,24 L44,41.9996217 C45.1045695,42 46,42.8954305 46,44 C46,45.1045695 45.1045695,46 44,46 L4,46 C2.8954305,46 2,45.1045695 2,44 C2,42.8954305 2.8954305,42 4,42 L4,8 C4,4.6862915 6.6862915,2 10,2 L26,2 Z M34,18 L34,40.536 L34.2027171,40.6606034 C35.2856399,41.3763564 36,42.6047543 36,44 L36,46 L34,46 L34,44 C34,42.8954305 33.1045695,42 32,42 L32,18 L34,18 Z M15,30 C15.5522847,30 16,30.4477153 16,31 L16,35 C16,35.5522847 15.5522847,36 15,36 L13,36 C12.4477153,36 12,35.5522847 12,35 L12,31 C12,30.4477153 12.4477153,30 13,30 L15,30 Z M23,30 C23.5522847,30 24,30.4477153 24,31 L24,35 C24,35.5522847 23.5522847,36 23,36 L21,36 C20.4477153,36 20,35.5522847 20,35 L20,31 C20,30.4477153 20.4477153,30 21,30 L23,30 Z M15,20 C15.5522847,20 16,20.4477153 16,21 L16,25 C16,25.5522847 15.5522847,26 15,26 L13,26 C12.4477153,26 12,25.5522847 12,25 L12,21 C12,20.4477153 12.4477153,20 13,20 L15,20 Z M23,20 C23.5522847,20 24,20.4477153 24,21 L24,25 C24,25.5522847 23.5522847,26 23,26 L21,26 C20.4477153,26 20,25.5522847 20,25 L20,21 C20,20.4477153 20.4477153,20 21,20 L23,20 Z M15,10 C15.5522847,10 16,10.4477153 16,11 L16,15 C16,15.5522847 15.5522847,16 15,16 L13,16 C12.4477153,16 12,15.5522847 12,15 L12,11 C12,10.4477153 12.4477153,10 13,10 L15,10 Z M23,10 C23.5522847,10 24,10.4477153 24,11 L24,15 C24,15.5522847 23.5522847,16 23,16 L21,16 C20.4477153,16 20,15.5522847 20,15 L20,11 C20,10.4477153 20.4477153,10 21,10 L23,10 Z"
                id="icon"
                fill="currentColor"
              ></path>
              <rect width="48" height="48" fill="none"></rect>
            </g>
          </svg>
        </div>

        <Typography variant="h6" className={s.title}>
          Henzzo-org
        </Typography>

        <Typography variant="body1" className={s.desc}>
          Find the best talent for your company by providing more information
          about your company and your job offers.
        </Typography>

        <Button size="large" variant="contained">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;
