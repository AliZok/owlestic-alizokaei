import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useOrders } from "@/context/orders-context"


interface MenuDropDownProps {
  className?: string
  children?: React.ReactNode
  order?: object
}

const MenuDropDown = ({ children, className, order }: MenuDropDownProps) => {
  const { updateOrderStatus, fetchOrders } = useOrders()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (status: string) => {
    setAnchorEl(null);
    updateOrderStatus(order?.id, status)
    fetchOrders()
  };


  return (
    <div className="inline-block hover:bg-gray-100 rounded-full cursor-pointer MenuDropDown">
      <div>
        <div className="flex justify-center items-center w-8 h-8" onClick={handleClick} id="demo-positioned-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </div>
        <Menu
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => handleClose('ready')}>آماده</MenuItem>
          <MenuItem onClick={() => handleClose('pending')}>در انتظار</MenuItem>
          <MenuItem onClick={() => handleClose('delivered')}>تحویل شده</MenuItem>
          <MenuItem onClick={() => handleClose('cancelled')}>کنسل شده</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default MenuDropDown