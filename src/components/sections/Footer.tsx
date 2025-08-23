import Link from "next/link"
import React from "react"
import { FaGithub } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-6 space-y-1">
      
      <div>
        © {new Date().getFullYear()} Hyrivo. Built by Cezarlito O. Baguhin
      </div>
      
      <div>
        <Link
          href="https://github.com/sezaru-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neutral-400 hover:text-white transition"
          aria-label="Sezaru-dev GitHub"
        >
          <FaGithub className="w-4 h-4 mr-1" />
          sezaru-dev
        </Link>
      </div>

      <div>All rights reserved.</div>
    </footer>
  )
}

export default Footer
