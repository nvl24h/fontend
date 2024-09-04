// vue.config.js
const path = require("path");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"), // Alias cho thư mục src
                "@components": path.resolve(__dirname, "src/components"), // Alias cho thư mục components
                "@views": path.resolve(__dirname, "src/views"), // Alias cho thư mục views
                "@api": path.resolve(__dirname, "src/api"), // Alias cho thư mục api
            },
        },
    },
};
