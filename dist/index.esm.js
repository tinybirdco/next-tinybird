import React from 'react';
import Head from 'next/head';

var tinybirdDomain = 'https://api.tinybird.co';
var tinybirdTrackerURL = 'https://cdn.tinybird.co/static/js/t.js';
function TinybirdProvider(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null,
            React.createElement("script", { async: true, "data-token": props.token, "data-source": props.dataSource, "data-domain": props.domain || tinybirdDomain, src: props.trackerURL || tinybirdTrackerURL })),
        props.children));
}
function useTinybird() {
    return function (eventName) {
        var _a, _b;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return (_b = (_a = window).tinybird) === null || _b === void 0 ? void 0 : _b.call(_a, eventName, rest[0]);
    };
}

export { TinybirdProvider as default, useTinybird };
//# sourceMappingURL=index.esm.js.map
