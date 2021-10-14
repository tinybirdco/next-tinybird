import React from 'react';
import Head from 'next/head';

var tinybirdDomain = 'https://api.tinybird.co';
var tinybirdTrackerURL = 'https://cdn.tinybird.co/static/js/t.js';
function TinybirdProvider(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null,
            React.createElement("script", { async: true, "data-token": props.token, "data-source": props.dataSource, "data-api": props.api || tinybirdDomain, src: props.trackerURL || tinybirdTrackerURL }),
            React.createElement("script", { dangerouslySetInnerHTML: {
                    __html: "window.tinybird = window.tinybird || function() { (window.tinybird.q = window.tinybird.q || []).push(arguments) }",
                } })),
        props.children));
}
function useTinybird() {
    return function (eventName, props) {
        var _a, _b;
        return (_b = (_a = window).tinybird) === null || _b === void 0 ? void 0 : _b.call(_a, eventName, props);
    };
}

export { TinybirdProvider as default, useTinybird };
//# sourceMappingURL=index.esm.js.map
