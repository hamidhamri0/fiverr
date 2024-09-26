import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  darkMode: ["class", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
  	screens: {
  		'1150': {
  			max: '1150px'
  		},
  		'2xl': {
  			max: '1500px'
  		},
  		xl: {
  			max: '1279px'
  		},
  		lg: {
  			max: '1023px'
  		},
  		md: {
  			max: '824px'
  		},
  		sm: {
  			max: '680px'
  		},
  		xs: {
  			max: '550px'
  		}
  	},
  	extend: {
  		width: {
  			'1400': '1400px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
