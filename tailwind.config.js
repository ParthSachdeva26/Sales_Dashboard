/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: '#10B981', // Primary Green
          dark: '#047857',    // Dark Green
          soft: '#D1FAE5',    // Soft Green Accent/Hover
        },
        sage: {
          DEFAULT: '#0EA5E9', // Soft Light Blue
          dark: '#0369A1',    // Dark Blue
          soft: '#E0F2FE',    // Light Blue Pill Fill
        },
        offwhite: '#FAF9F6',  // Off-White Background
        charcoal: '#2C3333',  // Typography Headings/Body
        muted: '#6B7280',     // Muted Labels
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'clay-sm': '0 2px 8px -2px rgba(200, 109, 81, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'clay-md': '0 8px 24px -4px rgba(200, 109, 81, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(44, 51, 51, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
};
