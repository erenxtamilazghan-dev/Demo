
import { ImpactRequest, Category, RequestStatus, UserRole, UserProfile } from './types';

export const COLORS = {
  primary: '#f97316',
  secondary: '#0d9488',
  accent: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff'
};

export const MOCK_REQUESTS: ImpactRequest[] = [
  {
    id: 'req-1',
    requesterId: 'org-1',
    requesterName: 'Sunshine Orphanage',
    title: 'Winter Survival Kits',
    description: 'Critical need for blankets and thermal wear for 40 residents. Temperature dropping tonight.',
    category: Category.CLOTHES,
    urgency: 'HIGH',
    isEmergency: true,
    status: RequestStatus.PENDING,
    location: { lat: 40.7128, lng: -74.0060, address: '123 Broadway, NY' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'req-2',
    requesterId: 'org-2',
    requesterName: 'Hope Kitchen',
    title: 'Excess Meal Distribution',
    description: '30 warm nutrition-balanced meals ready for pickup from our community gala.',
    category: Category.FOOD,
    urgency: 'MEDIUM',
    status: RequestStatus.PENDING,
    location: { lat: 40.7306, lng: -73.9352, address: '456 Queens Blvd, NY' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'req-3',
    requesterId: 'org-3',
    requesterName: 'St. Jude Medical Aid',
    title: 'Insulin Cooling Pack Delivery',
    description: 'Need a volunteer with a cooling bag to deliver medical supplies to a senior home.',
    category: Category.MEDICINE,
    urgency: 'HIGH',
    isEmergency: true,
    status: RequestStatus.PENDING,
    location: { lat: 40.7484, lng: -73.9857, address: '789 5th Ave, NY' },
    createdAt: new Date().toISOString()
  }
];

export const MOCK_USER: UserProfile = {
  id: 'user-123',
  name: 'Alex Johnson',
  role: UserRole.VOLUNTEER,
  avatar: 'https://picsum.photos/id/64/100',
  verified: true,
  verificationLevel: 'GOLD',
  impactScore: 1240,
  deliveriesCompleted: 48,
  communitiesHelped: 12,
  badges: [
    { id: 'b1', name: 'Fast Responder', icon: '⚡', dateEarned: '2023-10-15' },
    { id: 'b2', name: 'Community Hero', icon: '🏆', dateEarned: '2024-01-20' },
    { id: 'b3', name: 'Night Owl', icon: '🌙', dateEarned: '2024-02-05' }
  ]
};
