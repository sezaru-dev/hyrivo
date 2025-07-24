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
        "brand-blue": "hsl(var(--brand-blue))",
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
        blob: "blob 8s infinite ease-in-out",
        blobFloat: "blob-float 14s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
            borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
          },
          "33%": {
            transform: "translate(20px, -10px) scale(1.1)",
            borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          },
          "66%": {
            transform: "translate(-10px, 20px) scale(0.9)",
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 60%",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
            borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
          },
        },
        blobFloat: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "60% 40% 55% 45% / 45% 50% 50% 55%",
          },
          "25%": {
            transform: "translate(-10px, 10px) scale(1.05)",
            borderRadius: "55% 45% 50% 50% / 60% 40% 60% 40%",
          },
          "50%": {
            transform: "translate(10px, -10px) scale(0.97)",
            borderRadius: "50% 50% 60% 40% / 50% 60% 40% 50%",
          },
          "75%": {
            transform: "translate(-5px, 15px) scale(1.03)",
            borderRadius: "58% 42% 48% 52% / 52% 48% 58% 42%",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "60% 40% 55% 45% / 45% 50% 50% 55%",
          },
        },
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
