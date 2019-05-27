// noinspection ES6ConvertVarToLetConst
requirejs.config({
    paths: {
        'libs': 'js/lib/libs',
    },
    bundles: {'libs': ['react', 'react-dom', 'react-websocket', 'moize']}
});

requirejs(["js/app"], function() {
    requirejs(["client/js/main"],function(bootstrap) {
        bootstrap();
    });
});
