export type TrackingSituation = 
  | 'STANDARD'                 // Normal active "Out for Delivery"
  | 'DELAYED'                  // Situation 1: Delayed Order
  | 'DELIVERED_NOT_RECEIVED'   // Situation 2: Delivered but Not Received
  | 'TRACKING_UNAVAILABLE'     // Situation 3: Tracking Not Available Yet
  | 'LOADING'                  // Skeleton loading state
  | 'ERROR';                   // Error / retry state

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  status: 'completed' | 'current' | 'pending';
  badge?: string;
  isDelayMilestone?: boolean;
}

export interface DriverInfo {
  name: string;
  photo: string;
  vehicle: string;
  plate: string;
  rating: number;
  phone: string;
  currentStop: number;
  stopsAway: number;
}

export interface OrderData {
  orderId: string;
  trackingNumber: string;
  carrier: {
    name: string;
    service: string;
    logoUrl?: string;
  };
  orderDate: string;
  estimatedDelivery: {
    day: string;
    date: string;
    timeWindow: string;
    isDelayed?: boolean;
    originalEstimate?: string;
    delayReason?: string;
  };
  currentStatus: {
    label: string;
    headline: string;
    subheadline: string;
    themeColor: 'blue' | 'amber' | 'emerald' | 'rose' | 'slate';
    progressPercent: number;
    stepIndex: number; // 0: Processing, 1: Shipped, 2: Out for Delivery, 3: Delivered
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
  };
  shippingAddress: {
    recipientName: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    instructions: string;
  };
  driver?: DriverInfo;
  timeline: TimelineStep[];
  deliveryProof?: {
    deliveredAt: string;
    dropoffLocation: string;
    recipientSigned: string;
    photoUrl: string;
    gpsCoordinates: string;
  };
}
