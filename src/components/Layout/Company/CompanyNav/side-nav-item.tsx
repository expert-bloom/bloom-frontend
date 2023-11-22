import { type ReactNode } from 'react';

import { Box, ButtonBase, Typography } from '@mui/material';
import clsx from 'clsx';
import NextLink from 'next/link';

import s from './companynav.module.scss';

/* SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
}; */

interface PropsType {
  active: boolean;
  disabled: boolean;
  external: boolean;
  icon: ReactNode;
  path?: string;
  title: string;
}

export const SideNavItem = (props: PropsType) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
          component: 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <>
      <ButtonBase
        className={clsx([s.list_item, active && s.active])}
        component={'li'}
        sx={{
          ...(active && {
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }),
        }}
        {...linkProps}
      >
        {icon && (
          <Box className={clsx([s.list_item_icon, active && s.active])}>
            {icon}
          </Box>
        )}
        <Typography
          className={s.name}
          sx={{
            ...(disabled && {
              color: 'neutral.500',
            }),
          }}
        >
          {title}
        </Typography>
      </ButtonBase>
    </>
  );
};
