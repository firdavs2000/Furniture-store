

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        rotation: 'rotation 2s linear infinite',
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
};
