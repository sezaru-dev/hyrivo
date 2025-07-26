import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'brand-blue': 'hsl(var(--brand-blue))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			blob: 'blob 8s infinite ease-in-out',
  			blobTwo: 'blobTwo 12s infinite ease-in-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)',
  					borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%'
  				},
  				'33%': {
  					transform: 'translate(20px, -10px) scale(1.1)',
  					borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%'
  				},
  				'66%': {
  					transform: 'translate(-10px, 20px) scale(0.9)',
  					borderRadius: '60% 40% 50% 50% / 50% 60% 40% 60%'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)',
  					borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%'
  				}
  			},
  			blobTwo: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)',
  					borderRadius: '45% 55% 55% 45% / 50% 45% 55% 50%'
  				},
  				'25%': {
  					transform: 'translate(15px, -15px) scale(1.05)',
  					borderRadius: '50% 50% 45% 55% / 55% 50% 45% 50%'
  				},
  				'50%': {
  					transform: 'translate(-15px, 10px) scale(0.95)',
  					borderRadius: '55% 45% 50% 50% / 50% 55% 45% 50%'
  				},
  				'75%': {
  					transform: 'translate(10px, 10px) scale(1.02)',
  					borderRadius: '50% 55% 50% 45% / 45% 50% 55% 50%'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)',
  					borderRadius: '45% 55% 55% 45% / 50% 45% 55% 50%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
