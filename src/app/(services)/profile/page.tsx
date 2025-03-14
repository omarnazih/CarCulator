'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
// import { toast } from '@/components/ui/use-toast'

export default function ProfilePage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState({
        username: '',
        full_name: '',
        avatar_url: ''
    })

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            setUser(user)
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profile) {
                setProfile({
                    username: profile.username || profile.email,
                    full_name: profile.full_name || '',
                    avatar_url: profile.avatar_url || ''
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile() {
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...profile,
                    updated_at: new Date().toISOString()
                })

            if (error) throw error

            // toast({
            //     title: 'Success',
            //     description: 'Profile updated successfully'
            // })
        } catch (error) {
            console.log(error)
            // toast({
            //     title: 'Error',
            //     description: 'Error updating profile',
            //     variant: 'destructive'
            // })
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profile.avatar_url} />
                                <AvatarFallback>{profile.username?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <Input
                                type="text"
                                placeholder="Avatar URL"
                                value={profile.avatar_url}
                                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                value={profile.full_name}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            />
                        </div>

                        <Button onClick={updateProfile}>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
