/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glassy green palette
        'sage': '#b7d3b0',
        'muted-teal': '#8ec5b6',
        'eucalyptus': '#cbead3',
        'soft-gray': '#f3f4f6',
        'sand': '#e9e5c9',
        // 'pastel-blue': '#dbeafe',
        // 'pastel-mint': '#d1fae5',
        // 'pastel-peach': '#ffe4e6',
        // 'pastel-lavender': '#ede9fe',
        // 'pastel-yellow': '#fef9c3',
      },
    },
  },
  plugins: [],
} 