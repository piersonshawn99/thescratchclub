import type { Config } from 'tailwindcss';
const config:Config={content:['./app/**/*.{ts,tsx,js,jsx,mdx}','./components/**/*.{ts,tsx,js,jsx,mdx}','./pages/**/*.{ts,tsx,js,jsx,mdx}','./src/**/*.{ts,tsx,js,jsx,mdx}'],theme:{extend:{borderRadius:{xl:'1rem','2xl':'1.25rem','3xl':'1.5rem'},boxShadow:{inner:'inset 0 1px 2px rgba(0,0,0,0.06)'}}},plugins:[]};
export default config;
