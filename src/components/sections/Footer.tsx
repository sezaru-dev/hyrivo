import React from 'react'

const Footer = () => {
  return (
    <footer className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
      © {new Date().getFullYear()} Hyrivo. All rights reserved.
    </footer>
  )
}

export default Footer