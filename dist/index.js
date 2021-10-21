'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Head = require('next/head');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Head__default = /*#__PURE__*/_interopDefaultLegacy(Head);

var tinybirdDomain = 'https://api.tinybird.co';
var tinybirdTrackerURL = 'https://cdn.tinybird.co/static/js/t.js';
function TinybirdProvider(props) {
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(Head__default["default"], null,
            React__default["default"].createElement("script", { async: true, "data-token": props.token, "data-source": props.dataSource, "data-api": props.apiUrl || tinybirdDomain, src: props.trackerURL || tinybirdTrackerURL }),
            React__default["default"].createElement("script", { dangerouslySetInnerHTML: {
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

exports["default"] = TinybirdProvider;
exports.useTinybird = useTinybird;
//# sourceMappingURL=index.js.map
