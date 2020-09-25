module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),

[require("postcss-custom-media") ,
    {
      importFrom: [
        {
          customMedia: {'--m': '(min-width: 200px)'}
        },
        {
          customMedia: {'--t': '(min-width: 850px)'}
        },
        {
          customMedia: {'--d': '(min-width: 1280px)'}
        }
      ]
    }
]
]
}