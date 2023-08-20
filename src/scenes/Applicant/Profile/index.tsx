import React, { useRef } from 'react';

import {
  AccountCircle,
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
  Contacts,
  PendingActions,
  Redo,
  Save,
  Settings,
} from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { motion, transform } from 'framer-motion';
import { type FilePond } from 'react-filepond';

import { MoButton } from '@/components/MoButton';
import CvExperience from '@/scenes/Applicant/Profile/components/CvExperience';
import ProfileInfo from '@/scenes/Applicant/Profile/components/ProfileInfo';
import ProfilePic from '@/scenes/Applicant/Profile/components/ProfilePic';
import ContactInfo from 'src/scenes/Applicant/Profile/components/ContactInfo';

import s from './profile.module.scss';

const navData = [
  {
    label: 'Profile',
    Icon: AccountCircle,
    value: '1',
  },
  {
    label: 'Contact Info',
    Icon: Contacts,
    value: '2',
  },
  {
    label: 'CV & Experience',
    Icon: PendingActions,
    value: '3',
  },
  {
    label: 'Account Setting',
    Icon: Settings,
    value: '4',
  },
];

const Profile = () => {
  const filePond = useRef<FilePond>(null);

  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h3" align="center">
          Profile Settings
        </Typography>

        <div className={s.flex}>
          <TabContext value={value}>
            <div className={s.nav}>
              <Stack gap="2rem">
                <ProfilePic pondRef={filePond} />
                <div>
                  <Typography variant="h6">Henok getachew</Typography>
                  <Typography variant="body2" textAlign="center" color="gray">
                    Web developer
                  </Typography>
                </div>
              </Stack>
              <motion.div layoutId="tab_nav" className={s.tab_list}>
                {navData.map((item, idx) => (
                  <Button
                    // variant="outlined"
                    startIcon={<item.Icon />}
                    color="secondary"
                    key={idx}
                    className={clsx([s.tab, value === item.value && s.active])}
                    onClick={() => {
                      setValue(item.value);
                    }}
                  >
                    {item.label}

                    {value === item.value && (
                      <motion.div
                        layoutId="active"
                        className={s.active_indicator}
                      />
                    )}
                  </Button>
                ))}
              </motion.div>
            </div>

            <div className={s.content}>
              <TabPanel value="1">
                <ProfileInfo />
              </TabPanel>
              <TabPanel value="2">
                <ContactInfo />
              </TabPanel>
              <TabPanel value="3">
                <CvExperience />
              </TabPanel>

              <div className={s.controll}>
                <MoButton
                  // onClick={handleBack}
                  startIcon={<Redo />}
                  // disabled={activeStep === 0}
                  variant="outlined"
                  color="error"
                >
                  Undo Changes
                </MoButton>

                <MoButton
                  // onClick={handleNext}
                  // loading={props.isSubmitting}
                  type="submit"
                  endIcon={<Save />}
                >
                  Update Setting
                </MoButton>
              </div>
            </div>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default Profile;
