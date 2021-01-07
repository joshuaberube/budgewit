module.exports = {
    style: {
        postcss: {
            plugins: [
                require("tailwindcss")("./tailwindcss.config.cjs"), 
                require("autoprefixer")
            ]
        }
    }
}