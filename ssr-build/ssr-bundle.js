module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export subscribers */
/* unused harmony export getCurrentUrl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return route; });
/* unused harmony export Router */
/* unused harmony export Route */
/* unused harmony export Link */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["a"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "29yB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var LoadButton = function (_Component) {
    _inherits(LoadButton, _Component);

    function LoadButton() {
        _classCallCheck(this, LoadButton);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LoadButton.prototype.render = function render(_ref) {
        var _this2 = this;

        var shouldDisplayLoadMore = _ref.shouldDisplayLoadMore;

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            {
                'class': "btn " + (!shouldDisplayLoadMore && 'hidden'),
                onClick: function onClick(e) {
                    return _this2.props.onLoadMore();
                } },
            'Load more'
        );
    };

    return LoadButton;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "4nBB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepositoriesList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Repository_Repository__ = __webpack_require__("TJvP");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var RepositoriesList = function (_Component) {
    _inherits(RepositoriesList, _Component);

    function RepositoriesList() {
        _classCallCheck(this, RepositoriesList);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepositoriesList.prototype.render = function render(_ref) {
        var repositories = _ref.repositories,
            repos = _ref.repos;

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'list' },
            (repositories || repos).map(function (rep) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__Repository_Repository__["a" /* Repository */], { repository: rep });
            })
        );
    };

    return RepositoriesList;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "52Ao":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sorting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'span',
    null,
    'Sort by'
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'span',
    null,
    'Order'
);

var Sorting = function (_Component) {
    _inherits(Sorting, _Component);

    function Sorting() {
        _classCallCheck(this, Sorting);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Sorting.prototype.render = function render(_ref) {
        var _this2 = this;

        var sortingParams = _ref.sortingParams;

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            null,
            _ref2,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'select',
                { onChange: function onChange(e) {
                        return _this2.props.onSortType(e.target.value);
                    } },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'name',
                        selected: !sortingParams.by || sortingParams.by === 'name' },
                    'Name'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'stargazers_count',
                        selected: sortingParams.by === 'stargazers_count' },
                    'Stars'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'open_issues_count',
                        selected: sortingParams.by === 'open_issues_count' },
                    'Open Issues'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'pushed_at',
                        selected: sortingParams.by === 'pushed_at' },
                    'Updated date'
                )
            ),
            _ref3,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'select',
                { onChange: function onChange(e) {
                        return _this2.props.onSortOrder(e.target.value);
                    } },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'asc',
                        selected: !sortingParams.order || sortingParams.order === 'asc' },
                    'Ascending'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'option',
                    { value: 'desc',
                        selected: sortingParams.order === 'desc' },
                    'Descending'
                )
            )
        );
    };

    return Sorting;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "8Oly":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"backdrop":"backdrop__1O_L5","modal":"modal__2o6dw"};

/***/ }),

/***/ "Cwdr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_api__ = __webpack_require__("WhC7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dialog_css__ = __webpack_require__("8Oly");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dialog_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Dialog_css__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'p',
    null,
    'Fetching...'
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'tr',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'th',
        null,
        'User'
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'th',
        null,
        'Contributions'
    )
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'tr',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'th',
        null,
        'Language'
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'th',
        null,
        'Size'
    )
);

var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog(props) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._mounted = false;


        _this.state = {
            loading: true
        };
        return _this;
    }

    Dialog.prototype.componentDidMount = function componentDidMount() {
        this._mounted = true;
    };

    Dialog.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        if (!this.props.shouldShowModal) {
            return false;
        }

        this._mounted = true;
    };

    Dialog.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if (this.props.shouldShowModal !== nextProps.shouldShowModal && this._mounted) {
            var repo = this.props.repo;

            var fullName = repo.full_name;

            repo.fork && Promise.all([this._getSourceRepoInfo(fullName), this._getContributors(fullName), this._getLanguages(fullName), this._getPopularPullRequests(fullName)]).then(function (res) {
                return _this2.setState({
                    loading: false
                });
            });
        }
    };

    Dialog.prototype._getSourceRepoInfo = function _getSourceRepoInfo(fullName) {
        var _this3 = this;

        fetch('https://api.github.com/repos/' + fullName).then(function (response) {
            return response.json();
        }).then(function (repoInfo) {
            return _this3.setState({
                source_url: repoInfo.source.html_url,
                source_full_name: repoInfo.source.full_name
            });
        });
    };

    Dialog.prototype._getContributors = function _getContributors(fullName) {
        var _this4 = this;

        fetch('https://api.github.com/repos/' + fullName + '/contributors').then(function (response) {
            return response.json();
        }).then(function (contributors) {
            return _this4.setState({
                contributors: contributors.slice(0, 3)
            });
        });
    };

    Dialog.prototype._getLanguages = function _getLanguages(fullName) {
        var _this5 = this;

        fetch('https://api.github.com/repos/' + fullName + '/languages').then(function (response) {
            return response.json();
        }).then(function (languages) {
            var moreThanOneKbLanguages = {};

            for (var lang in languages) {
                if (languages[lang] > 1024) {
                    moreThanOneKbLanguages[lang] = _this5._formatBytes(languages[lang]);
                }
            }
            return moreThanOneKbLanguages;
        }).then(function (moreThanOneKbLanguages) {
            return _this5.setState({
                languages: moreThanOneKbLanguages
            });
        });
    };

    Dialog.prototype._getPopularPullRequests = function _getPopularPullRequests(fullName) {
        var _this6 = this;

        fetch('https://api.github.com/repos/' + fullName + '/pulls?sort=popularity&per_page=5&direction=desc').then(function (response) {
            return response.json();
        }).then(function (popularPullRequests) {
            return _this6.setState({
                pullRequests: popularPullRequests
            });
        });
    };

    Dialog.prototype._formatBytes = function _formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';

        var k = 1024;
        var dm = decimals || 2;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    Dialog.prototype.setStateAsync = function setStateAsync(state) {
        var _this7 = this;

        return new Promise(function (resolve) {
            _this7.setState(state, resolve);
        });
    };

    Dialog.prototype.render = function render(_ref, _ref2) {
        var _this8 = this;

        var shouldShowModal = _ref.shouldShowModal,
            repo = _ref.repo;
        var loading = _ref2.loading,
            source_url = _ref2.source_url,
            source_full_name = _ref2.source_full_name,
            contributors = _ref2.contributors,
            languages = _ref2.languages,
            pullRequests = _ref2.pullRequests;


        if (!shouldShowModal) {
            return null;
        }

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { 'class': 'backdrop',
                onClick: function onClick(e) {
                    _this8._mounted = false;_this8.props.onClose(e);
                } },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                { 'class': 'modal', onClick: function onClick(e) {
                        return e.stopPropagation();
                    } },
                loading ? _ref3 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'div',
                    null,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'h1',
                        null,
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                            'a',
                            { target: '_blank', href: repo.html_url },
                            repo.name
                        )
                    ),
                    source_url && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'h4',
                        { 'class': 'forked' },
                        'Forked from ',
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                            'a',
                            { target: '_blank', href: source_url },
                            source_full_name
                        )
                    ),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'table',
                        null,
                        _ref4,
                        contributors.map(function (c) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                'tr',
                                null,
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                    'td',
                                    null,
                                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                        'a',
                                        { target: '_blank', href: c.html_url },
                                        c.login
                                    )
                                ),
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                    'td',
                                    null,
                                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                        'span',
                                        null,
                                        c.contributions
                                    )
                                )
                            );
                        })
                    ),
                    Object.keys(languages).length > 0 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'table',
                        null,
                        _ref5,
                        Object.keys(languages).map(function (lang) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                'tr',
                                null,
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                    'td',
                                    null,
                                    lang
                                ),
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                    'td',
                                    null,
                                    languages[lang]
                                )
                            );
                        })
                    ),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'h3',
                        { 'class': !pullRequests.length && 'hidden' },
                        'Popular pull requests'
                    ),
                    pullRequests.length > 0 && pullRequests.map(function (pr) {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                            'ul',
                            null,
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                'li',
                                null,
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                    'p',
                                    null,
                                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                                        'a',
                                        { target: '_blank', href: pr.html_url },
                                        pr.title
                                    )
                                )
                            )
                        );
                    })
                )
            )
        );
    };

    return Dialog;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "Ihxb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "span",
    null,
    "Filters:"
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "has-open-issues" },
    " Has open issues "
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "hasTopics" },
    " Has topics "
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "starredTimes" },
    "Stars"
);

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "updatedAfter" },
    "Updated after"
);

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "type" },
    "Type"
);

var _ref8 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "label",
    { "for": "language" },
    "Language"
);

var Filters = function (_Component) {
    _inherits(Filters, _Component);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Filters.prototype.render = function render(_ref) {
        var _this2 = this;

        var filters = _ref.filters,
            languages = _ref.languages;
        var hasOpenIssues = filters.hasOpenIssues,
            hasTopics = filters.hasTopics,
            starredTimes = filters.starredTimes,
            updatedAfter = filters.updatedAfter,
            repoType = filters.repoType,
            language = filters.language;


        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "div",
            null,
            _ref2,
            _ref3,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", {
                id: "has-open-issues",
                type: "checkbox",
                checked: hasOpenIssues,
                onChange: function onChange(e) {
                    return _this2.props.update({ filters: _extends({}, filters, { hasOpenIssues: e.target.checked }) });
                } }),
            _ref4,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", {
                id: "hasTopics",
                type: "checkbox",
                checked: hasTopics,
                onChange: function onChange(e) {
                    return _this2.props.update({ filters: _extends({}, filters, { hasTopics: e.target.checked }) });
                } }),
            _ref5,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", {
                type: "number",
                id: "starredTimes",
                value: starredTimes,
                onChange: function onChange(e) {
                    return _this2.props.update({ filters: _extends({}, filters, { starredTimes: e.target.value }) });
                } }),
            _ref6,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", {
                id: "updatedAfter",
                type: "date",
                value: updatedAfter,
                onChange: function onChange(e) {
                    return _this2.props.update({ filters: _extends({}, filters, { updatedAfter: e.target.value }) });
                } }),
            _ref7,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                "select",
                { id: "type", onInput: function onInput(e) {
                        return _this2.props.update({ filters: _extends({}, filters, { repoType: e.target.value }) });
                    } },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    "option",
                    { value: "All", selected: !repoType || repoType === 'All' },
                    "All"
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    "option",
                    { value: "Fork", selected: repoType === 'Fork' },
                    "Fork"
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    "option",
                    { value: "Source", selected: repoType === 'Source' },
                    "Source"
                )
            ),
            _ref8,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                "select",
                { id: "language", onInput: function onInput(e) {
                        return _this2.props.update({ filters: _extends({}, filters, { language: e.target.value }) });
                    } },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    "option",
                    { value: "All", selected: !language || language === 'All' },
                    "All"
                ),
                languages.map(function (lang) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        "option",
                        { value: lang, selected: language === lang },
                        lang
                    );
                })
            )
        );
    };

    return Filters;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App__ = __webpack_require__("Q25t");



//render(<App />, document.body);
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_App__["a" /* default */]);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "Q25t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Form_Form__ = __webpack_require__("sm90");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Card__ = __webpack_require__("RzHu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_router__ = __webpack_require__("/QC5");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'app' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        __WEBPACK_IMPORTED_MODULE_3_preact_router__["a" /* default */],
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__Form_Form__["a" /* default */], { path: '/' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__Card_Card__["a" /* default */], { path: '/:user' })
    )
);

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    App.prototype.render = function render() {
        return _ref;
    };

    return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "RzHu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Filters_Filters__ = __webpack_require__("Ihxb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SortBar_SortBar__ = __webpack_require__("52Ao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RepositoriesList_RepositoriesList__ = __webpack_require__("4nBB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LoadButton_LoadButton__ = __webpack_require__("29yB");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var reposPerPage = 10;

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    null,
    'Please, wait'
);

var Card = function (_Component) {
    _inherits(Card, _Component);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            repos: null,
            loading: true,
            filters: {
                hasOpenIssues: false,
                hasTopics: false,
                starredTimes: 0,
                updatedAfter: null,
                repoType: null,
                language: null
            },
            languages: [],
            sorting: {
                by: 'name',
                order: 'asc'
            },
            currentPage: 1
        };
        return _this;
    }

    Card.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        fetch('https://api.github.com/users/' + this.props.user + '/repos?page=' + this.state.currentPage + '&per_page=' + reposPerPage, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        }).then(function (response) {
            var shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            _this2.setState({ shouldDisplayLoadMore: shouldDisplayLoadMore });
            return response.json();
        }).then(function (repos) {
            return _this2.setState({
                repos: repos,
                loading: false,
                languages: repos.map(function (r) {
                    return r.language;
                }).filter(function (l) {
                    return l;
                }).filter(function (v, i, a) {
                    return a.indexOf(v) === i;
                })
            });
        });
    };

    Card.prototype.updateState = function updateState(filters) {
        this.setState(filters);
    };

    Card.prototype.changeSortType = function changeSortType(type) {
        this.setState({
            sorting: _extends({}, this.state.sorting, { by: type })
        });
    };

    Card.prototype.changeSortOrder = function changeSortOrder(order) {
        this.setState({
            sorting: _extends({}, this.state.sorting, { order: order })
        });
    };

    Card.prototype.getSortedRepositories = function getSortedRepositories(repos, sorting) {
        var by = sorting.by,
            order = sorting.order;

        var sorted = [].concat(repos);

        switch (by) {
            case 'name':
                sorted.sort(function (a, b) {
                    return a[by].localeCompare(b[by]);
                });
                break;
            case 'pushed_at':
                sorted.sort(function (a, b) {
                    return new Date(a[by]) - new Date(b[by]);
                });
                break;
            default:
                sorted.sort(function (a, b) {
                    return a[by] - b[by];
                });
                break;
        }

        order === 'desc' && sorted.reverse();

        return sorted;
    };

    Card.prototype.getFilteredRepositories = function getFilteredRepositories(_ref, repos) {
        var hasOpenIssues = _ref.hasOpenIssues,
            hasTopics = _ref.hasTopics,
            starredTimes = _ref.starredTimes,
            updatedAfter = _ref.updatedAfter,
            repoType = _ref.repoType,
            language = _ref.language;

        return repos.filter(function (repo) {
            return (hasOpenIssues ? !!repo.open_issues_count : true) && (hasTopics ? !!repo.topics.length : true) && repo.stargazers_count >= starredTimes && (updatedAfter ? new Date(repo.pushed_at) > new Date(updatedAfter) : true) && (repoType && repoType !== 'All' ? repoType === 'Fork' ? repo.fork : !repo.fork : true) && (language && language !== 'All' ? repo.language === language : true);
        });
    };

    Card.prototype.loadMore = function loadMore() {
        var _this3 = this;

        fetch('https://api.github.com/users/' + this.props.user + '/repos?page=' + (this.state.currentPage + 1) + '&per_page=' + reposPerPage, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        }).then(function (response) {
            var shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            _this3.setState({ shouldDisplayLoadMore: shouldDisplayLoadMore });
            return response.json();
        }).then(function (newRepos) {
            return _this3.setState({
                repos: [].concat(_this3.state.repos, newRepos),
                currentPage: _this3.state.currentPage + 1,
                languages: [].concat(_this3.state.languages, _this3.state.repos.map(function (r) {
                    return r.language;
                }).filter(function (l) {
                    return l;
                }).filter(function (v, i, a) {
                    return a.indexOf(v) === i;
                }))
            });
        });
    };

    Card.prototype.render = function render(_ref2, _ref3) {
        var loading = _ref3.loading,
            repos = _ref3.repos,
            filters = _ref3.filters,
            languages = _ref3.languages,
            sorting = _ref3.sorting,
            shouldDisplayLoadMore = _ref3.shouldDisplayLoadMore;

        _objectDestructuringEmpty(_ref2);

        var filteredRepos = repos && this.getFilteredRepositories(filters, repos);
        var sortedRepos = repos && this.getSortedRepositories(filteredRepos, sorting);

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'repositories' },
            loading ? _ref4 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__Filters_Filters__["a" /* Filters */], {
                    languages: languages,
                    filters: filters,
                    update: this.updateState.bind(this) }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__SortBar_SortBar__["a" /* Sorting */], {
                    sortingParams: sorting,
                    onSortType: this.changeSortType.bind(this),
                    onSortOrder: this.changeSortOrder.bind(this) }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__RepositoriesList_RepositoriesList__["a" /* RepositoriesList */], { repositories: sortedRepos }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__LoadButton_LoadButton__["a" /* LoadButton */], {
                    shouldDisplayLoadMore: shouldDisplayLoadMore,
                    onLoadMore: this.loadMore.bind(this) })
            )
        );
    };

    return Card;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "TJvP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Repository; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Dialog_Dialog__ = __webpack_require__("Cwdr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Repository_css__ = __webpack_require__("co4n");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Repository_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Repository_css__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var formatDate = function formatDate(date) {
    var tmpDate = new Date(date);
    var year = tmpDate.getFullYear();
    var month = tmpDate.getMonth() + 1;
    var dt = tmpDate.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
};

var Repository = function (_Component) {
    _inherits(Repository, _Component);

    function Repository(props) {
        _classCallCheck(this, Repository);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            shouldShowModal: false
        };
        return _this;
    }

    Repository.prototype.toggleModal = function toggleModal(e) {
        e.stopPropagation();

        this.setState({
            shouldShowModal: !this.state.shouldShowModal
        });
    };

    Repository.prototype.render = function render(_ref, _ref2) {
        var repository = _ref.repository;
        var shouldShowModal = _ref2.shouldShowModal;

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'ul',
                null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                        'a',
                        { onClick: this.toggleModal.bind(this) },
                        repository.name
                    )
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    'description ' + repository.description || 'description is absent'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    repository.fork ? 'forked' : 'not forked'
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    'stars: ',
                    repository.stargazers_count
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    formatDate(repository.updated_at)
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'li',
                    null,
                    repository.language
                )
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__Dialog_Dialog__["a" /* Dialog */], {
                shouldShowModal: shouldShowModal,
                repo: this.props,
                onClose: this.toggleModal.bind(this) })
        );
    };

    return Repository;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "WhC7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REPOS_PER_PAGE = 20;

var getReposURL = function getReposURL(user, page) {
    return 'https://api.github.com/users/' + user + '/repos?page=' + page + '&per_page=' + REPOS_PER_PAGE;
};

var getRepoUrl = function getRepoUrl(fullName) {
    return 'https://api.github.com/repos/' + fullName;
};

var getContributorsUrl = function getContributorsUrl(fullName) {
    return 'https://api.github.com/repos/' + fullName + '/contributors';
};

var getLanguagesUrl = function getLanguagesUrl(fullName) {
    return 'https://api.github.com/repos/' + fullName + '/languages';
};

var getPopularPullRequestsLink = function getPopularPullRequestsLink(fullName) {
    return 'https://api.github.com/repos/' + fullName + '/pulls?sort=popularity&per_page=5&direction=desc';
};

var API = function () {
    function API() {
        _classCallCheck(this, API);
    }

    API.getRepos = function getRepos(user, page) {
        return fetch(getReposURL(user, page), {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        });
    };

    API.getRepoInfo = function getRepoInfo(fullName) {
        return fetch(getRepoUrl(fullName));
    };

    API.getRepoContributors = function getRepoContributors(fullName) {
        return fetch(getContributorsUrl(fullName));
    };

    API.getRepoLanguages = function getRepoLanguages(fullName) {
        return fetch(getLanguagesUrl(fullName));
    };

    API.getPopularPullRequests = function getPopularPullRequests(fullName) {
        return fetch(getPopularPullRequestsLink(fullName));
    };

    return API;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (API);

/***/ }),

/***/ "co4n":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sm90":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            text: null
        };
        _this.updateText = _this.updateText.bind(_this);
        _this.redirectPage = _this.redirectPage.bind(_this);
        return _this;
    }

    Home.prototype.updateText = function updateText(e) {
        this.setState({ text: e.target.value });
    };

    Home.prototype.redirectPage = function redirectPage() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact_router__["b" /* route */])('/' + encodeURIComponent(this.state.text));
    };

    Home.prototype.render = function render() {

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'section',
            { className: 'submit' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'form',
                { onSubmit: this.redirectPage },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { type: 'text', onInput: this.updateText }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { type: 'submit', onClick: this.redirectPage, value: 'add' })
            )
        );
    };

    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map