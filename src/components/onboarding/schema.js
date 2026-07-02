
import { z } from 'zod'
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Create Account
// ─────────────────────────────────────────────────────────────────────────────
export const createAccountSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(3, 'Full name must be at least 3 characters')
      .max(60, 'Full name is too long'),
 
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
 
    phone: z
      .string()
      .min(1, 'Phone number is required')
      // Nigerian numbers: 080, 081, 090, 070, 071 — 11 digits
      // Also accepts +234 prefix (14 chars total)
      .regex(
        /^(\+?234|0)[789][01]\d{8}$/,
        'Enter a valid Nigerian phone number (e.g. 08012345678)'
      ),
 
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
 
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  // .refine() runs AFTER all individual field validations pass.
  // It receives the entire form object, not just one field.
  // We use it for cross-field validation (password === confirmPassword).
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // which field should show this error
  })
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Verify Phone
// The OTP is a 6-character string of digits
// ─────────────────────────────────────────────────────────────────────────────
export const verifyPhoneSchema = z.object({
  otp: z
    .string()
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only numbers'),
})
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: Business Information
// ─────────────────────────────────────────────────────────────────────────────
export const businessInfoSchema = z.object({
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .min(3, 'Business name must be at least 3 characters')
    .max(80, 'Business name is too long'),
 
  category: z.string().min(1, 'Please select a category'),
 
  state: z.string().min(1, 'Please select a state'),
 
  city: z.string().min(1, 'City is required'),
 
  area: z.string().min(1, 'Area/neighbourhood is required'),
 
  address: z.string().min(1, 'Address is required').min(10, 'Please enter a more detailed address'),
 
  homeService: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Please select whether you offer home service' }),
  }),
 
  experience: z
    .string()
    .min(1, 'Years of experience is required')
    // coerce converts the string to a number before validating the range
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && num >= 1 && num <= 50
    }, 'Experience must be between 1 and 50 years'),
 
  description: z
    .string()
    .max(500, 'Description must be 500 characters or fewer')
    .optional(),
})
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: Portfolio Upload
// Files are handled outside React Hook Form (browser File objects),
// so we validate the count/type separately and register a synthetic field.
// ─────────────────────────────────────────────────────────────────────────────
export const portfolioSchema = z.object({
  // We store the count of uploaded images as a number field
  // and validate it has the required minimum
  imageCount: z
    .number()
    .min(3, 'Please upload at least 3 portfolio images')
    .max(10, 'Maximum 10 portfolio images allowed'),
})
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 5: Review & Submit
// ─────────────────────────────────────────────────────────────────────────────
export const reviewSchema = z.object({
  confirmed: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must confirm that the information is accurate',
    }),
})