// noinspection ES6ConvertVarToLetConst
requirejs.config({
    paths: {
        'libs': 'js/lib/libs',
    },
    bundles: {'libs': ['react', 'react-dom']}
});

requirejs(["js/app"], function() {
    requirejs(["main"],function(bootstrap) {
        bootstrap();
    });
});
