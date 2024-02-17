import Link from "next/link";
import { onAuthStateChanged } from "../firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signout } from "../firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
    const [user, setUser] = useState(null);    
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    async function handleLogOut(e){
        e.preventDefault();
        const response = await signout();
        router.push("/");
    }

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
        <MountainIcon className="h-6 w-6" />
        <p className="m-4 text-black">XYZ</p>
        </Link>
        {user && (
            <nav className="flex items-center ml-auto space-x-4">
            <Link href="/home">
            <p className="text-gray-900 dark:text-gray-100">Home</p>
            </Link>
            <Link href="/profile">
            <p className="text-gray-900 dark:text-gray-100">Profile</p>
            </Link>
            <DropdownMenu>
            <DropdownMenuTrigger>Insights</DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuLabel>Global Insights</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/assets/gold"><DropdownMenuItem>Gold</DropdownMenuItem></Link>
            <Link href="/assets/stocks"><DropdownMenuItem>Stocks</DropdownMenuItem></Link>
            <Link href="/assets/bonds"><DropdownMenuItem>Bonds</DropdownMenuItem></Link>
            <Link href="/assets/mfs"><DropdownMenuItem>Mutual Funds</DropdownMenuItem></Link>
            <Link href="/assets/news"><DropdownMenuItem>News</DropdownMenuItem></Link>
            </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-gray-900 dark:text-gray-100" onClick={handleLogOut}>Logout</button>
            </nav>
        )}
        {!user && (
            <nav className="flex items-center ml-auto space-x-4">
            <Link href="/login">
            <p className="text-gray-900 dark:text-gray-100">Login</p>
            </Link>
            <Link href="/signup">
            <p className="text-gray-900 dark:text-gray-100">Sign Up</p>
            </Link>
            </nav>
        )}
        </header>
    );
    }

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

