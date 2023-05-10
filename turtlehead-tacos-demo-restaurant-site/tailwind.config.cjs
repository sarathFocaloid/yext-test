// tailwind.config.cjs

// this is the path in node_modules where the components are located
const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    ComponentsContentPath,
  ],
  theme: {
    extend: {
      colors: {
        orange: "#ff9500",
        "dark-orange": "#db8000",
      },
    },
  },
  plugins: [],
};
