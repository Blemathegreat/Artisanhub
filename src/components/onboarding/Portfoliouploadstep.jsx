/**
 * PortfolioUploadStep.jsx — Step 4
 *
 * File uploads are NOT handled by register() because:
 * - Browser File objects can't be serialized to form state cleanly
 * - We need previews, reordering, drag-and-drop — custom UI
 *
 * Pattern used here:
 * - Local state manages the actual File objects and preview URLs
 * - useForm manages ONE synthetic field: 'imageCount'
 * - We call setValue('imageCount', count) whenever files change
 * - This lets Zod validate the minimum/maximum count
 */
import React, { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Upload, X, ImageIcon, Star, ArrowLeft, ArrowRight, Film,
} from 'lucide-react'
import { portfolioSchema } from './schema'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_IMAGES = 10
const MIN_IMAGES = 3

export default function PortfolioUploadStep({ onNext, onBack, defaultValues }) {
  const [images, setImages] = useState(defaultValues?.images || [])
  const [videos, setVideos] = useState(defaultValues?.videos || [])
  const [coverIndex, setCoverIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: { imageCount: images.length },
  })

  // Sync image count to RHF whenever images array changes
  const syncCount = (newImages) => {
    setValue('imageCount', newImages.length, { shouldValidate: true })
  }

  const addImages = useCallback((files) => {
    const validFiles = Array.from(files)
      .filter(f => ACCEPTED_IMAGE_TYPES.includes(f.type))
      .slice(0, MAX_IMAGES - images.length)

    const newImages = [
      ...images,
      ...validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      })),
    ]
    setImages(newImages)
    syncCount(newImages)
  }, [images])

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview)
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    syncCount(newImages)
    if (coverIndex >= newImages.length) setCoverIndex(0)
  }

  const addVideos = (files) => {
    const newVideos = [
      ...videos,
      ...Array.from(files).slice(0, 3 - videos.length).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        progress: 100,
      })),
    ]
    setVideos(newVideos)
  }

  // Drag and drop handlers
  const onDragOver  = (e) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = ()  => setIsDragging(false)
  const onDrop      = (e) => {
    e.preventDefault()
    setIsDragging(false)
    addImages(e.dataTransfer.files)
  }

  const onSubmit = () => {
    onNext({ images, videos, coverIndex })
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Step 4 of 5
        </p>
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Show customers your best work
        </h1>
        <p className="text-sm text-gray-500">
          Upload at least {MIN_IMAGES} photos. Quality images attract more customers.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Portfolio Images ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon size={16} className="text-green-600" />
              Portfolio Images
              <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              images.length >= MIN_IMAGES
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              {images.length}/{MAX_IMAGES}
            </span>
          </div>

          {/* Drag and drop zone */}
          {images.length < MAX_IMAGES && (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => imageInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                          transition-all ${
                isDragging
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'
              }`}>
              <Upload size={28} className={`mx-auto mb-2 ${
                isDragging ? 'text-green-500' : 'text-gray-300'
              }`} />
              <p className="body-text text-sm font-medium text-gray-600">
                {isDragging ? 'Drop images here' : 'Drag & drop or click to upload'}
              </p>
              <p className="caption text-xs text-gray-400 mt-1">JPG, PNG, WebP — max 10 images</p>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={e => addImages(e.target.files)}
              />
            </div>
          )}

          {/* Validation error */}
          {errors.imageCount && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500 flex items-center
                               justify-center text-[9px] font-bold shrink-0">!</span>
              {errors.imageCount.message}
            </p>
          )}

          {/* Preview grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {images.map((img, i) => (
                <div key={i}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2
                               cursor-pointer transition-colors ${
                    coverIndex === i
                      ? 'border-green-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setCoverIndex(i)}>
                  <img src={img.preview} alt={img.name}
                    className="w-full h-full object-cover" />
                  {/* Cover badge */}
                  {coverIndex === i && (
                    <div className="absolute top-1.5 left-1.5 bg-green-600 text-white
                                    text-[9px] font-bold px-1.5 py-0.5 rounded-full
                                    flex items-center gap-0.5">
                      <Star size={8} fill="white" /> Cover
                    </div>
                  )}
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeImage(i) }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60
                               text-white rounded-full flex items-center justify-center
                               hover:bg-black/80 transition-colors">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {images.length > 0 && (
            <p className="caption text-xs text-gray-400 mt-1.5">
              Tap an image to set it as your cover photo
            </p>
          )}
        </div>

        {/* ── Videos (Optional) ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Film size={16} className="text-purple-500" />
              Videos
              <span className="text-xs text-gray-400 font-normal ml-1">(optional, max 3)</span>
            </label>
            <span className="text-xs text-gray-400">{videos.length}/3</span>
          </div>

          {videos.length < 3 && (
            <div
              onClick={() => videoInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center
                         cursor-pointer hover:border-purple-400 hover:bg-purple-50/50
                         transition-all">
              <Film size={24} className="mx-auto mb-2 text-gray-300" />
              <p className="body-text text-sm text-gray-500">Click to upload videos</p>
              <p className="caption text-xs text-gray-400 mt-0.5">MP4, MOV — max 3 videos</p>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={e => addVideos(e.target.files)}
              />
            </div>
          )}

          {videos.length > 0 && (
            <div className="space-y-2 mt-3">
              {videos.map((vid, i) => (
                <div key={i}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center
                                  justify-center shrink-0">
                    <Film size={16} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{vid.name}</p>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${vid.progress}%` }} />
                    </div>
                  </div>
                  <button type="button"
                    onClick={() => setVideos(vs => vs.filter((_, vi) => vi !== i))}
                    className="text-gray-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack}
            className="flex items-center gap-2 border border-gray-200 text-gray-600
                       hover:bg-gray-50 font-semibold px-5 py-3 rounded-xl
                       transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <button type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600
                       hover:bg-green-700 text-white font-semibold py-3 rounded-xl
                       transition-colors text-sm">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}