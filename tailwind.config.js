/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BF9C73', // Your brand's primary color (tan/brown)
        text: '#091747',    // Your brand's text color (navy)
        surface: '#FEF8F1', // Your brand's background color (cream)
        accent: '#F6B398',  // Your brand's accent color (salmon)
        'accent-deep': '#E5917B', // Deeper version of accent for better contrast
      },
      fontFamily: {
        sans: ['Newsreader', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      accentColor: {
        primary: '#BF9C73', // Your brand's primary color (tan/brown)
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} 