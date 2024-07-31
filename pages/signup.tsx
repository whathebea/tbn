import Link from "next/link"

import { Button } from "@components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authOk, setAuthOk] = useState('false')
  const [authFailed, setAuthFailed] = useState()
  const router = useRouter()
  async function handleSignup(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }
  
      const data = await response.json();
      return router.push('/home')
    } catch (error) {
      console.error('Signup failed', error);
      throw error;
    }
  }

  return (
    <Card className="mx-auto max-w-sm my-20">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required />
          </div>
          <Button 
          onClick={() => handleSignup(email, password)}
          type="submit" 
          className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
