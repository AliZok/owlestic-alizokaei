// pages/api/orders.js
import { NextApiRequest, NextApiResponse } from 'next';

const mockOrders = [
    {
        id: "1",
        customer: {
            id: "CUST-001",
            name: "John Doe",
            email: "john.doe@example.com",
        },
        date: "2023-03-15T10:30:00Z",
        items: [
            { id: "ITEM-001", name: "Product A", price: 29.99, quantity: 2 },
            { id: "ITEM-002", name: "Product B", price: 49.99, quantity: 1 },
        ],
        total: 109.97,
        status: "delivered",
    },
    {
        id: "2",
        customer: {
            id: "CUST-002",
            name: "Jane Smith",
            email: "jane.smith@example.com",
        },
        date: "2023-03-16T14:45:00Z",
        items: [{ id: "ITEM-003", name: "Product C", price: 19.99, quantity: 3 }],
        total: 59.97,
        status: "shipped",
    },
    {
        id: "3",
        customer: {
            id: "CUST-003",
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
        },
        date: "2023-03-17T09:15:00Z",
        items: [
            { id: "ITEM-004", name: "Product D", price: 99.99, quantity: 1 },
            { id: "ITEM-005", name: "Product E", price: 14.99, quantity: 2 },
        ],
        total: 129.97,
        status: "processing",
    },
    {
        id: "4",
        customer: {
            id: "CUST-004",
            name: "Emily Davis",
            email: "emily.davis@example.com",
        },
        date: "2023-03-18T16:30:00Z",
        items: [{ id: "ITEM-006", name: "Product F", price: 79.99, quantity: 1 }],
        total: 79.99,
        status: "pending",
    },
    {
        id: "5",
        customer: {
            id: "CUST-005",
            name: "Michael Wilson",
            email: "michael.wilson@example.com",
        },
        date: "2023-03-19T11:00:00Z",
        items: [
            { id: "ITEM-007", name: "Product G", price: 39.99, quantity: 2 },
            { id: "ITEM-008", name: "Product H", price: 24.99, quantity: 1 },
        ],
        total: 104.97,
        status: "cancelled",
    },
    {
        id: "6",
        customer: {
            id: "CUST-006",
            name: "Sarah Brown",
            email: "sarah.brown@example.com",
        },
        date: "2023-03-20T13:45:00Z",
        items: [{ id: "ITEM-009", name: "Product I", price: 59.99, quantity: 1 }],
        total: 59.99,
        status: "delivered",
    },
]

export default function handler(req, res) {
    res.status(200).json(mockOrders);
}