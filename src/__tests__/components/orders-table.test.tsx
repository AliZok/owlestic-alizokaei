import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { OrdersTable } from '@/components/dashboard/orders-table';


jest.mock('@/components/ui/dropdown-menu', () => {
  return {
    __esModule: true,
    default: ({ order }) => <div data-testid={`menu-dropdown-${order.id}`}>Menu</div>,
  };
});

jest.mock('@mui/material/Menu', () => {
  return ({ children, open, onClose, anchorEl }) => 
    open ? <div data-testid="filter-menu">{children}</div> : null;
});

jest.mock('@mui/material/MenuItem', () => {
  return ({ children, onClick }) => 
    <button data-testid={`menu-item-${children}`} onClick={onClick}>{children}</button>;
});

jest.mock('@mui/icons-material/FilterList', () => {
  return () => <div data-testid="filter-icon">FilterIcon</div>;
});

describe('OrdersTable', () => {
  const mockOrders = [
    { 
      id: '1', 
      name: 'محصول تست 1', 
      number: 2, 
      total: 100000, 
      status: 'pending' 
    },
    { 
      id: '2', 
      name: 'محصول تست 2', 
      number: 1, 
      total: 50000, 
      status: 'delivered' 
    },
    { 
      id: '3', 
      name: 'محصول تست 3', 
      number: 3, 
      total: 150000, 
      status: 'cancelled' 
    }
  ];

  const defaultProps = {
    orders: mockOrders,
    searchQuery: '',
    onSearchChange: jest.fn(),
    statusFilter: null,
    onStatusFilterChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with orders', () => {
    render(<OrdersTable {...defaultProps} />);
    

    expect(screen.getByText('شناسه')).toBeInTheDocument();
    expect(screen.getByText('محصول')).toBeInTheDocument();
    expect(screen.getByText('تعداد')).toBeInTheDocument();
    expect(screen.getByText('قیمت')).toBeInTheDocument();
    expect(screen.getByText('وضعیت')).toBeInTheDocument();
    expect(screen.getByText('عملیات')).toBeInTheDocument();
    
    // Check if orders are rendered
    expect(screen.getByText('محصول تست 1')).toBeInTheDocument();
    expect(screen.getByText('محصول تست 2')).toBeInTheDocument();
    expect(screen.getByText('محصول تست 3')).toBeInTheDocument();
    
    // Check if status badges are rendered with correct text
    expect(screen.getByText('در انتظار')).toBeInTheDocument();
    expect(screen.getByText('تحویل شده')).toBeInTheDocument();
    expect(screen.getByText('کنسل شده')).toBeInTheDocument();
  });

  it('displays empty state when no orders', () => {
    render(<OrdersTable {...defaultProps} orders={[]} />);
    
    expect(screen.getByText('هیچ سفارشی موجود نیست')).toBeInTheDocument();
  });

  it('handles search input changes', async () => {
    render(<OrdersTable {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('جستجو');
    await userEvent.type(searchInput, 'test search');
    
    expect(defaultProps.onSearchChange).toHaveBeenCalledTimes('test search'.length);
    expect(searchInput).toHaveValue('test search');
  });

  it('opens filter menu when filter button is clicked', async () => {
    render(<OrdersTable {...defaultProps} />);
    
    const filterButton = screen.getByRole('button');
    await userEvent.click(filterButton);

    expect(screen.getByTestId('filter-menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-در انتظار')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-تحویل شده')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-کنسل شده')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-آماده')).toBeInTheDocument();
  });

  it('applies status filter when menu item is clicked', async () => {
    render(<OrdersTable {...defaultProps} />);
    
    // Open the filter menu
    const filterButton = screen.getByRole('button');
    await userEvent.click(filterButton);
    
    // Click on a status filter
    const pendingFilter = screen.getByTestId('menu-item-در انتظار');
    await userEvent.click(pendingFilter);
    
    // Check if onStatusFilterChange was called with the correct status
    expect(defaultProps.onStatusFilterChange).toHaveBeenCalledWith('pending');
  });

  it('renders correct status colors', () => {
    render(<OrdersTable {...defaultProps} />);
    
    // Find all badges
    const badges = screen.getAllByText(/(در انتظار|تحویل شده|کنسل شده)/);
    
    // Check if each badge has the correct class based on status
    const pendingBadge = badges.find(badge => badge.textContent === 'در انتظار');
    const deliveredBadge = badges.find(badge => badge.textContent === 'تحویل شده');
    const cancelledBadge = badges.find(badge => badge.textContent === 'کنسل شده');
    
    expect(pendingBadge).toHaveClass('bg-yellow-200/20');
    expect(pendingBadge).toHaveClass('text-yellow-600');
    
    expect(deliveredBadge).toHaveClass('bg-teal-400/20');
    expect(deliveredBadge).toHaveClass('text-teal-600');
    
    expect(cancelledBadge).toHaveClass('bg-pink-500/20');
    expect(cancelledBadge).toHaveClass('text-pink-700');
  });

  it('renders mobile view for small screens', () => {
    // Mock window.innerWidth to simulate mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    
    render(<OrdersTable {...defaultProps} />);
    
    // Check if mobile view elements are rendered
    const mobileCards = screen.getAllByText(/شناسه:/);
    expect(mobileCards.length).toBe(3); // One for each order
    
    // Check if each order has its details in the mobile view
    mockOrders.forEach(order => {
      expect(screen.getByText(order.name)).toBeInTheDocument();
      expect(screen.getByText(order.number.toString())).toBeInTheDocument();
      expect(screen.getByText(order.total.toLocaleString())).toBeInTheDocument();
    });
  });
});