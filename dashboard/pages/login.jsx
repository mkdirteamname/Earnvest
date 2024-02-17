import { Label } from "@/components/ui/label"
import { signin } from "@/firebase/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Component() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const user = await signin(email, password)
            setUser(user)
            router.push("/home")
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mx-auto w-[400px] space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log In</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to log in</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <input id="email" placeholder="m@example.com" required value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <input id="password" required type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
        </div>
        <button className="w-full bg-black text-white" type="submit" onClick={handleSubmit}>
          Log In
        </button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By clicking Log In, you agree to our
          <Link className="underline" href="#">
            Terms and Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
