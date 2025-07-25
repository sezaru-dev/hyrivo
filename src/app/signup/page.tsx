import { SignupForm } from "@/components/custom/forms/SignupForm"
import { ThemeToggle } from "@/components/custom/toggles/ThemeToggle"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            Hyrivo
          </Link>
          <ThemeToggle /> {/* ThemeToggle */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
            {/* <InputForm /> */}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
