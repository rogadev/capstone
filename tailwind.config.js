module.exports = {
  daisyui: {
    themes: [
      {
        candy: {
          primary: '#06d8bc',
          secondary: '#66d345',
          accent: '#017375',
          neutral: '#18222B',
          'base-100': '#4B4351',
          info: '#2FB8EE',
          success: '#199F84',
          warning: '#E38016',
          error: '#E4495E',
        },
      },
      'dracula',
      'light',
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
