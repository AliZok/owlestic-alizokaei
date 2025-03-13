import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

interface MenuDropDownProps {
  className?: string
  children?: React.ReactNode
}

const MenuDropDown = ({ children, className }: MenuDropDownProps) => {


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="MenuDropDown inline-block">

      <div>
        {/* <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button> */}
        <div className="h-8 w-8 flex items-center justify-center" onClick={handleClick} id="demo-positioned-button">
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
            className="h-4 w-4"
          >
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </div>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>آماده</MenuItem>
          <MenuItem onClick={handleClose}>در انتظار</MenuItem>
          <MenuItem onClick={handleClose}>ارسال شده</MenuItem>
          <MenuItem onClick={handleClose}>کنسل شده</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default MenuDropDown