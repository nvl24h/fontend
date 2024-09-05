// vue.config.js
const path = require("path");

// Alias cho thư mục
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
                "@views": path.resolve(__dirname, "src/views"),
                "@api": path.resolve(__dirname, "src/api"),
                "@layout": path.resolve(__dirname, "src/layout"),
            },
        },
    },
};
