import { z } from 'zod'

export const requestServiceSchema = z.object({
  serviceType: z
    .string()
    .min(1, 'Please select a service'),

  preferredDate: z
    .string()
    .optional(),

  preferredTime: z
    .string()
    .optional(),

  description: z
    .string()
    .min(10, 'Please describe what you need (at least 10 characters)')
    .max(500, 'Description cannot exceed 500 characters'),

  location: z
    .string()
    .min(3, 'Please enter your location'),

  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^(\+?234|0)[789]\d{9}$/,
      'Enter a valid Nigerian phone number (e.g. 08012345678)'
    ),

  photos: z
    .array(z.any())
    .max(4, 'You can upload a maximum of 4 photos')
    .optional(),
})