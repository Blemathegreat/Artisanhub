import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestServiceSchema } from '../components/requestArtisan/Requestserviceschema.js'

export function useRequestService({ artisan, onClose }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState([])

  const form = useForm({
    resolver: zodResolver(requestServiceSchema),
    defaultValues: {
      serviceType:   artisan?.services?.[0]?.name ?? '',
      preferredDate: '',
      preferredTime: '',
      description:   '',
      location:      '',
      phoneNumber:   '',
      photos:        [],
    },
    mode: 'onChange',
  })

  const addPhotos = (files) => {
    const remaining = 4 - photoPreviews.length
    const toAdd = Array.from(files).slice(0, remaining)
    const previews = toAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setPhotoPreviews((prev) => [...prev, ...previews])
    form.setValue('photos', [...(form.getValues('photos') ?? []), ...toAdd])
  }

  const removePhoto = (index) => {
    setPhotoPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
    const current = form.getValues('photos') ?? []
    form.setValue('photos', current.filter((_, i) => i !== index))
  }

  const goToReview = form.handleSubmit(() => setStep(2))
  const goBack = () => setStep(1)

  const submitRequest = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    form.reset()
    setPhotoPreviews([])
    setStep(1)
    setIsSuccess(false)
    onClose()
  }

  return {
    form,
    step,
    isSubmitting,
    isSuccess,
    photoPreviews,
    addPhotos,
    removePhoto,
    goToReview,
    goBack,
    submitRequest,
    handleClose,
  }
}