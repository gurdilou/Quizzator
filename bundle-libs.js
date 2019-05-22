({
    baseUrl: ".",
    // optimize: "uglify2",
    include: ['react', 'react-dom', 'react-websocket'],
    paths: {
        // 'react': "node_modules/react/umd/react.production.min",
        'react': "node_modules/react/umd/react.development",
        // 'react-dom': "node_modules/react-dom/umd/react-dom.production.min",
        'react-dom': "node_modules/react-dom/umd/react-dom.development",
        'react-websocket': 'node_modules/react-websocket/build/index'
    },
    out: "dist/public/js/lib/libs.js"
});
