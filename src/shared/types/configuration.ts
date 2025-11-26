import { ReactNode } from "react";

export interface ConfigTabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface ChannelNotifications {
  tva: boolean;
  tvaFrequency: string;
  payment: boolean;
  deadline: boolean;
  attestation: boolean;
  cnss: boolean;
}

export interface ChannelConfig {
  id: string;
  name: string;
  icon: any;
  placeholder: string;
  info: string;
  notifications: ChannelNotifications;
  language: string;
}