export interface PackageItem {
  id: string;
  title: string;
  shortTitle: string;
  targetYear: string;
  subtitle: string;
  regularPrice: number;
  offerPrice: number;
  discountPercentage: number;
  isPopular?: boolean;
  isVip?: boolean;
  badge: string;
  offerDuration: string;
  subjects: string[];
  features: string[];
}

export interface ReviewItem {
  id: string;
  studentName: string;
  school: string;
  board: string;
  year: '2025' | '2026' | '2027';
  gpa: string;
  rating: number;
  date: string;
  reviewText: string;
  isTestExam?: boolean;
  commonPercentage: string;
  avatarColor?: string;
  avatarInitial?: string;
  avatarUrl?: string;
}

export interface OrderSubmission {
  id: string;
  studentName: string;
  senderPhone: string;
  trxId: string;
  schoolName: string;
  board: string;
  packageId: string;
  packageName: string;
  amount: number;
  paymentMethod: 'bkash' | 'nagad';
  timestamp: string;
  status: 'pending' | 'verified';
}

export interface LiveActivity {
  id: string;
  name: string;
  school: string;
  packageTitle: string;
  method: 'bKash' | 'Nagad';
  timeAgo: string;
  amount: number;
}
