
import { BaseEntity, PageResponse } from "./common.types";


export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  DELETED = 'DELETED',
}

export enum PermissionType {
  CREATE_AGENT = 'CREATE_AGENT',
  CONFIGURE_AGENT = 'CONFIGURE_AGENT',
  SEND_MESSAGE_TO_AGENT = 'SEND_MESSAGE_TO_AGENT',
}

// ========== User DTOs ==========

export interface UserDto extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  status?: UserStatus;
  emailVerified?: boolean;
  lastLoginAt?: string;
  role?: UserRole;
}

export interface AddressDto extends BaseEntity {
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  fullAddress?: string;
}

export interface AdminDto extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  status?: UserStatus;
  emailVerified?: boolean;
  lastLoginAt?: string;
  role?: UserRole;
  address?: AddressDto;
  collaborator?: CollaboratorDto[];
  stripeCustomerId?: string;
  referralCode?: string;
  ipAddress?: string;
}

export interface CollaboratorDto extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  status?: UserStatus;
  emailVerified?: boolean;
  lastLoginAt?: string;
  role?: UserRole;
  linkedAgentsUid?: string[];
  adminId?: number;
  permissionTypes?: PermissionType[];
}

export interface UserConnectionHistoryDto extends BaseEntity {
  loginDateTime?: string;
  logoutDateTime?: string;
  duration?: number;
}

// ========== Authentication ==========

export interface AuthRequest {
  username: string;
  password: string;
  ipAddress?: string;
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  email: string;
  expirationDurationInSec: number;
  userConnectionHistoryUid: string;
  userUid: string;
  role: UserRole;
}

export interface IpAddressDto {
  ipAddress: string;
}

// ========== Pagination Types ==========

export type PageAdminDto = PageResponse<AdminDto>;
export type PageCollaboratorDto = PageResponse<CollaboratorDto>;
export type PageUserConnectionHistoryDto = PageResponse<UserConnectionHistoryDto>;

// ========== Search Parameters ==========

export interface CollaboratorSearchParams {
  uid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  status?: UserStatus;
  emailVerified?: boolean;
  adminUid?: string;
  permission?: PermissionType;
  linkedAgentUid?: string;
  createdAt?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface AdminSearchParams {
  uid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  status?: UserStatus;
  city?: string;
  country?: string;
  zip?: string;
  collaboratorUid?: string;
  fullAddress?: string;
  createdAt?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}