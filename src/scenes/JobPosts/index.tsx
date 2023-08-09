import React, { useEffect, useState } from 'react';
import s from './jobposts.module.scss';
import {
  Autocomplete,
  Chip,
  Divider,
  Icon,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Vec from './vec.png';
import Image from 'next/image';
import { Bookmark, FilterAltOutlined } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment/moment';

const jobPosts = {
  title: 'Revive Ad Server Customization',
};

const JobPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getAllJobs`)
      .then((res) => {
        console.log('job list: ', res.data);
        if (res && res.data && res.data.data) {
          [{ createdAt: '2021-10-13T10:00:00.000Z' }];
          // sort by date

          setPosts(
            res.data.data?.sort((a: any, b: any) => {
              return moment(b.createdAt).diff(moment(a.createdAt));
            }),
          );
        }
      })
      .catch((err) => {
        console.log('error geting jobs: ', err);
      });
  }, []);

  return (
    <div className={s.container}>
      <div className={s.decor}>
        <svg
          width="427"
          height="599"
          viewBox="0 0 427 599"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_80_166)">
            <path
              d="M227.628 197.284L307.111 427.284C310.296 436.059 310.71 445.362 308.313 454.307C305.917 463.251 300.79 471.539 293.42 478.381L290.841 480.634L177.295 574.511C165.127 584.568 148.627 590.218 131.422 590.218C114.217 590.218 97.7165 584.568 85.549 574.511L-27.9975 480.634C-36.2799 473.786 -42.1656 465.211 -45.03 455.821C-47.8945 446.431 -47.6309 436.574 -44.2671 427.298L35.2154 197.271C55.816 208.402 80.3096 214.719 106.15 214.719H156.694C181.886 214.732 206.536 208.673 227.628 197.284ZM258.172 174.311L413.893 303.044C419.803 308.103 423.073 314.878 422.999 321.911C422.925 328.944 419.513 335.671 413.498 340.644C407.483 345.617 399.346 348.438 390.84 348.499C382.334 348.56 374.139 345.857 368.02 340.971L288.213 275.028L254.636 177.825C255.845 176.674 257.024 175.503 258.172 174.311ZM167.513 0.141113C182.934 0.141585 198.134 3.17155 211.86 8.98133C225.587 14.7911 237.447 23.2144 246.464 33.5572C255.48 43.8999 261.396 55.866 263.722 68.4695C266.048 81.073 264.718 93.9531 259.843 106.049L249.04 132.871C242.58 148.895 230.186 162.833 213.611 172.709C197.037 182.585 177.124 187.899 156.694 187.896H106.15C85.7194 187.899 65.8065 182.585 49.2323 172.709C32.6581 162.833 20.2632 148.895 13.8038 132.871L3.00068 106.049C-1.8748 93.9531 -3.20424 81.073 -0.878082 68.4695C1.44807 55.866 7.36324 43.8999 16.38 33.5572C25.3967 23.2144 37.257 14.7911 50.9834 8.98133C64.7099 3.17155 79.9096 0.141585 95.3302 0.141113H167.513Z"
              fill="#6366F1"
              fillOpacity="0.03"
              shapeRendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_80_166"
              x="-51"
              y="0.141113"
              width="478"
              height="598.077"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_80_166"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_80_166"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className={s.wrapper}>
        <header>
          <Stack direction="row" spacing={2}>
            <Image src={Vec} alt="vec" />
            <Typography variant="h3" className={s.title} gutterBottom>
              Job Posts
            </Typography>
          </Stack>

          <Divider
            variant="fullWidth"
            orientation="horizontal"
            className={s.divider}
          />
        </header>

        <div className={s.content}>
          <div className={s.left}>
            <header>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon>
                  <FilterAltOutlined />
                </Icon>

                <Typography gutterBottom>Filters</Typography>
              </Stack>
            </header>

            <div className={s.filters}>
              <Autocomplete
                disablePortal
                fullWidth
                options={['Fixed-Price', 'Hourly']}
                // sx={{ width: 300 }}
                // value={values.type}
                onChange={(event, newValue) => {
                  // formik.setFieldValue('type', newValue).then();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="type"
                    label="Job Category"
                    fullWidth
                    required
                  />
                )}
              />
              <Autocomplete
                disablePortal
                fullWidth
                options={['Fixed-Price', 'Hourly']}
                // sx={{ width: 300 }}
                // value={values.type}
                onChange={(event, newValue) => {
                  // formik.setFieldValue('type', newValue).then();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="type"
                    label="Job Type"
                    fullWidth
                    required
                  />
                )}
              />
              <Autocomplete
                disablePortal
                fullWidth
                options={['Fixed-Price', 'Hourly']}
                // sx={{ width: 300 }}
                // value={values.type}
                onChange={(event, newValue) => {
                  // formik.setFieldValue('type', newValue).then();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="type"
                    label="Salary"
                    fullWidth
                    required
                  />
                )}
              />
              <Autocomplete
                disablePortal
                fullWidth
                options={['Fixed-Price', 'Hourly']}
                // sx={{ width: 300 }}
                // value={values.type}
                onChange={(event, newValue) => {
                  // formik.setFieldValue('type', newValue).then();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="type"
                    label="Location"
                    fullWidth
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className={s.right}>
            {posts.map((data: any, idx) => (
              <div key={idx} className={s.job_card}>
                <div className={s.hor}>
                  <Typography className={s.title} variant="h5">
                    {data.title}
                  </Typography>

                  <IconButton>
                    <Bookmark />
                  </IconButton>
                </div>

                <Typography className={s.detail}>
                  Fixed-Price - {data.job_location} - Est. Budget:{' '}
                  <b>
                    ${data.salary[0]} - ${data.salary[1]}
                  </b>{' '}
                  - Posted {moment(data.createdAt).calendar()}
                </Typography>

                <Typography variant="body1" className={s.desc}>
                  {data.description}
                  <b>more</b>
                </Typography>

                <div className={s.tags}>
                  {data.job_skills.map((skill: any) => (
                    <Chip label={skill} key={skill} />
                  ))}
                </div>

                <Typography className={s.detail}>Proposals: 0</Typography>

                <div className={s.tags}>
                  {data.job_category.map((skill: any) => (
                    <Chip label={skill} key={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
