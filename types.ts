
export enum UserRole {
  DONOR = 'DONOR',
  VOLUNTEER = 'VOLUNTEER',
  ORGANIZATION = 'ORGANIZATION'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED'
}

export enum Category {
  FOOD = 'FOOD',
  CLOTHES = 'CLOTHES',
  MEDICINE = 'MEDICINE',
  GROCERIES = 'GROCERIES',
  OTHER = 'OTHER'
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface ImpactRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  title: string;
  description: string;
  category: Category;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  status: RequestStatus;
  location: Location;
  createdAt: string;
  isEmergency?: boolean;
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  dateEarned: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  verificationLevel: 'BASIC' | 'SILVER' | 'GOLD';
  impactScore: number;
  badges: UserBadge[];
  deliveriesCompleted: number;
  communitiesHelped: number;
}
