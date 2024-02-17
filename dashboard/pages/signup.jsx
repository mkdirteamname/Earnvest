/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VQjCRxaniI6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { input } from "@/components/ui/input"
import { button } from "@/components/ui/button"
import { signup } from "@/firebase/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Component() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const user = await signup(email, password, username);
            setUser(user);
            router.push("/home");
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mx-auto w-[400px] space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name ">Name</Label>
          <input className="p-4 rounded" id="name" placeholder="Lee Robinson" required value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <input id="email" placeholder="m@example.com" required value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <input id="password" required type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
        </div>
        <button className="w-full bg-black text-white rounded h-fit" type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By clicking Sign Up, you agree to our
          <Link className="underline" href="#">
            Terms and Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
