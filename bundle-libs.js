({
    baseUrl: ".",
    optimize: "uglify2",
    include: ['react', 'react-dom'],
    paths: {
        'react': "node_modules/react/umd/react.production.min",
        'react-dom': "node_modules/react-dom/umd/react-dom.production.min",
    },
    out: "dist/public/js/lib/libs.js"
});
