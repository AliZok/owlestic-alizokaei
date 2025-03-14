'use client';

import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import MyLoading from "@/components/MyLoading"
import { useOrders } from "@/context/orders-context"

const NAVIGATION: Navigation = [

  {
    segment: 'dashboard',
    title: 'داشبورد',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'سفارشات',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'تنظیمات',
    icon: <LayersIcon />,
  },
];

interface DashboardTemplateProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function DashboardTemplate({ children, className, ...props }: DashboardTemplateProps) {
  const { loading, } = useOrders()

  return (
    <div className='relative w-full '>

      {
        loading && (
          <MyLoading />
        )
      }


      <AppProvider

        navigation={NAVIGATION}
        branding={{
          logo: <img src="https://owlestic.ir/_next/static/media/v2SecImg2.77c6f305.png" alt="MUI logo" />,
          title: 'Owlestic',
          homeUrl: '/',
        }}
      >
        <DashboardLayout>
          <div className='p-4 iran-sans'>
            {children}
          </div>
        </DashboardLayout>
      </AppProvider>
    </div>

  );
}
