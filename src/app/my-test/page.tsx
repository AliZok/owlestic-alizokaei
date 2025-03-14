'use client';

import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

const NAVIGATION: Navigation = [

  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },

  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];


export default function DashboardLayoutBasic(props: any) {

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
        homeUrl: '/toolpad/core/introduction',
      }}
    >
      <DashboardLayout>
        hello world
      </DashboardLayout>
    </AppProvider>
  );
}
