'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials, formatDate } from '@/lib/utils'
import { Loader2, Plus, X } from 'lucide-react'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  skills: z.array(z.string()),
  languages: z.array(z.string()),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      bio: '',
      location: '',
      phone: '',
      skills: [],
      languages: [],
    },
  })

  const skills = watch('skills') || []
  const languages = watch('languages') || []

  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '')
    }
  }, [session, setValue])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setValue('skills', [...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setValue('skills', skills.filter((s) => s !== skill))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setValue('languages', [...languages, newLanguage.trim()])
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setValue('languages', languages.filter((l) => l !== language))
  }

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage('Profile updated successfully')
        await update()
      } else {
        const error = await response.json()
        setMessage(error.error || 'Failed to update profile')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{session?.user?.name}</CardTitle>
            <CardDescription>{session?.user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Role:</span>
                <span>{session?.user?.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member since:</span>
                <span>{formatDate(new Date())}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <div className={`mb-4 p-3 rounded-md text-sm ${
                message.includes('success') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tell us about yourself..."
                  {...register('bio')}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...register('location')} />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...register('phone')} />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill..."
                  />
                  <Button type="button" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    placeholder="Add a language..."
                  />
                  <Button type="button" onClick={addLanguage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                      <button
                        type="button"
                        onClick={() => removeLanguage(language)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
