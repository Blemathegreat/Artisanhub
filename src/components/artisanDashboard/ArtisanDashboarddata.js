// dashboardData.js
// Structured for easy swap with a real API — just replace each export
// with an async fetch call that returns the same shape.

export const artisan = {
  id: 'art_001',
  name: 'John Adewale',
  profession: 'Barber',
  rating: 4.9,
  reviewCount: 128,
  verified: true,
  avatar: null, // replace with real image URL
  profileCompletion: 85,
}

export const stats = [
  {
    id: 'new_requests',
    label: 'New Requests',
    value: 8,
    trend: '+2 from yesterday',
    trendUp: true,
    color: 'green',
    link: '/dashboard/requests?filter=new',
  },
  {
    id: 'pending',
    label: 'Pending Requests',
    value: 5,
    trend: null,
    trendUp: null,
    cta: 'View all',
    color: 'amber',
    link: '/dashboard/requests?filter=pending',
  },
  {
    id: 'completed',
    label: 'Completed Jobs',
    value: 23,
    trend: null,
    trendUp: null,
    cta: 'View all',
    color: 'blue',
    link: '/dashboard/jobs',
  },
  {
    id: 'profile_views',
    label: 'Profile Views',
    value: 312,
    trend: '+15% this week',
    trendUp: true,
    color: 'purple',
    link: '/dashboard/analytics',
  },
]

export const requests = [
  {
    id: 'req_001',
    customer: 'Aleem Mohammed',
    service: 'Haircut at Home',
    location: 'Bodija, Ibadan',
    time: '10 min ago',
    status: 'New',
    avatar: null,
  },
  {
    id: 'req_002',
    customer: 'Sarah Johnson',
    service: 'Hair Styling',
    location: 'Ring Road, Ibadan',
    time: '1 hr ago',
    status: 'Pending',
    avatar: null,
  },
  {
    id: 'req_003',
    customer: 'Emeka Okafor',
    service: 'Beard Grooming',
    location: 'Challenge, Ibadan',
    time: '2 hrs ago',
    status: 'Pending',
    avatar: null,
  },
  {
    id: 'req_004',
    customer: 'Aisha Lawal',
    service: 'Haircut & Styling',
    location: 'Mokola, Ibadan',
    time: '3 hrs ago',
    status: 'New',
    avatar: null,
  },
  {
    id: 'req_005',
    customer: 'Tunde Bakare',
    service: 'Home Service Haircut',
    location: 'Oluyole, Ibadan',
    time: 'Yesterday',
    status: 'Accepted',
    avatar: null,
  },
]

export const profileChecklist = [
  { id: 'portfolio',    label: 'Add Portfolio',      done: true  },
  { id: 'hours',        label: 'Add Business Hours',  done: true  },
  { id: 'areas',        label: 'Add Service Areas',   done: true  },
  { id: 'bank',         label: 'Add Bank Details',    done: false },
]

export const earnings = {
  thisMonth: 45000,
  trend: '+18% from last month',
  trendUp: true,
  jobsCompleted: 12,
  totalEarnings: 45000,
  avgPerJob: 3750,
  // Mini chart data points (y values, last 7 days)
  chartData: [12000, 18000, 14000, 22000, 19000, 30000, 45000],
}

export const reviews = [
  {
    id: 'rev_001',
    reviewer: 'Sarah J.',
    rating: 5,
    text: 'Amazing service! Very professional and my hair looks perfect. Will book again.',
    date: '2 days ago',
    avatar: null,
  },
  {
    id: 'rev_002',
    reviewer: 'Aleem M.',
    rating: 5,
    text: 'Prompt, friendly and very skilled. Highly recommended!',
    date: '5 days ago',
    avatar: null,
  },
]

export const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    path: '/artisan-dashboard',              badge: null },
  { id: 'requests',     label: 'Requests',     path: '/artisan-dashboard/requests',     badge: 8    },
  { id: 'messages',     label: 'Messages',     path: '/artisan-dashboard/messages',     badge: 3    },
  { id: 'jobs',         label: 'Jobs',         path: '/artisan-dashboard/jobs',         badge: null },
  { id: 'earnings',     label: 'Earnings',     path: '/artisan-dashboard/earnings',     badge: null },
  { id: 'profile',      label: 'Profile',      path: '/artisan-dashboard/profile',      badge: null },
  { id: 'services',     label: 'Services',     path: '/artisan-dashboard/services',     badge: null },
  { id: 'portfolio',    label: 'Portfolio',    path: '/artisan-dashboard/portfolio',    badge: null },
  { id: 'reviews',      label: 'Reviews',      path: '/artisan-dashboard/reviews',      badge: null },
  { id: 'availability', label: 'Availability', path: '/artisan-dashboard/availability', badge: null },
  { id: 'settings',     label: 'Settings',     path: '/artisan-dashboard/settings',     badge: null },
]