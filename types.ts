export interface ServiceItem {
  id: string;
  label: string;
  description?: string;
  details?: string[];
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  shortTitle: string; // For the orbit bubble
  description: string;
  color: string;
  icon: string; // Lucide icon name representation
  items: ServiceItem[];
}
