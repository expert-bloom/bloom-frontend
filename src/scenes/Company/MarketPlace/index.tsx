import React, { useEffect, useState } from 'react';

import {
  AccountCircle,
  Contacts,
  LocalOffer,
  PendingActions,
  Settings,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { MotionParent } from '@/components/MotionItems';
import AppliedApplicants from '@/scenes/Company/MarketPlace/AppliedApplicants';
import BestMatch from '@/scenes/Company/MarketPlace/BestMatch';
import MarketPlaceToolBar from '@/scenes/Company/MarketPlace/MarketPlaceToolBar';
import Offers from '@/scenes/Company/MarketPlace/Offers';
import SavedApplicants from '@/scenes/Company/MarketPlace/SavedApplicants';
import InterviewApplicants from 'src/scenes/Company/MarketPlace/Interview';

import s from './marketplace.module.scss';

const marketPlaceItemsCategory = [
  {
    name: 'Best Match',
    component: (props: any) => <BestMatch {...props} />,
    schema: '',
    Icon: AccountCircle,
  },
  {
    name: 'Applicants',
    component: (props: any) => <AppliedApplicants {...props} />,
    schema: '',
    Icon: Contacts,
  },
  {
    name: 'Interview',
    component: (props: any) => <InterviewApplicants {...props} />,
    Icon: Settings,
  },
  {
    name: 'Offers',
    component: (props: any) => <Offers {...props} />,
    Icon: LocalOffer,
  },
  {
    name: 'Saved',
    component: (props: any) => <SavedApplicants {...props} />,
    schema: '',
    Icon: PendingActions,
  },
];

const MarketPlace = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentTab, setCurrentTab] = useState<
    typeof marketPlaceItemsCategory[number]
  >({
    ...marketPlaceItemsCategory[activeStep],
  });

  useEffect(() => {
    setCurrentTab({ ...marketPlaceItemsCategory[activeStep] });
  }, [activeStep]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <MarketPlaceToolBar />

        <div className={s.content}>
          <motion.div layoutId="tab_nav" className={s.tab_list}>
            {marketPlaceItemsCategory.map((item, idx) => (
              <Button
                startIcon={<item.Icon />}
                color="secondary"
                variant="outlined"
                key={idx}
                className={clsx([
                  s.tab,
                  currentTab.name === item.name && s.active,
                ])}
                onClick={() => {
                  setActiveStep(idx);
                }}
              >
                {item.name}

                {currentTab.name === item.name && (
                  <motion.div
                    layoutId="active"
                    className={s.active_indicator}
                  />
                )}
              </Button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <MotionParent className={s.animator} key={currentTab.name}>
              {currentTab?.component({})}
            </MotionParent>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
