'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareRoutes = exports.buildXMLandRSS = exports.exportRoutes = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var buildXMLandRSS = exports.buildXMLandRSS = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref11) {
    var config = _ref11.config;
    var xml, generateXML;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            generateXML = function generateXML(_ref12) {
              var routes = _ref12.routes;

              var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
              routes.forEach(function (route) {
                if (route.noindex) {
                  return;
                }
                xml += '<url>';
                xml += '<loc>' + (route.permalink + '/').replace(/\/{1,}$/gm, '/') + '</loc>';
                xml += route.lastModified ? '<lastmod>' + route.lastModified + '</lastmod>' : '';
                xml += route.priority ? '<priority>' + route.priority + '</priority>' : '';
                xml += '</url>';
              });
              xml += '</urlset>';
              return xml;
            };

            if (config.siteRoot) {
              _context5.next = 4;
              break;
            }

            console.log('\n      => Warning: No \'siteRoot\' defined in \'static.config.js\'!\n      => This is required for both absolute url\'s and a sitemap.xml to be exported.\n    ');
            return _context5.abrupt('return');

          case 4:
            xml = generateXML({
              routes: config.routes.filter(function (d) {
                return !d.is404;
              }).map(function (route) {
                return _extends({
                  permalink: config.siteRoot + route.path,
                  lastModified: '',
                  priority: 0.5
                }, route);
              })
            });
            _context5.next = 7;
            return _fsExtra2.default.writeFile(_path2.default.join(config.paths.DIST, 'sitemap.xml'), xml);

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function buildXMLandRSS(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = require('react-dom/server');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _shorthash = require('shorthash');

var _shorthash2 = _interopRequireDefault(_shorthash);

var _RootComponents = require('./RootComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable import/no-dynamic-require, react/no-danger */

//


// Exporting route HTML and JSON happens here. It's a big one.
var exportRoutes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref2) {
    var config = _ref2.config,
        clientStats = _ref2.clientStats,
        cliArguments = _ref2.cliArguments;
    var appJsPath, appJs, appStaticJsPath, Comp, DocumentTemplate, siteProps, seenProps, sharedProps, routeInfo;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // Use the node version of the app created with webpack
            appJsPath = _glob2.default.sync(_path2.default.resolve(config.paths.DIST, 'app!(.static).*.js'))[0];
            appJs = appJsPath.split('/').pop();
            appStaticJsPath = _glob2.default.sync(_path2.default.resolve(config.paths.DIST, 'app.static.*.js'))[0];
            Comp = require(appStaticJsPath).default;
            DocumentTemplate = config.Document || _RootComponents.DefaultDocument;
            _context4.next = 7;
            return config.getSiteProps({ dev: false, cliArguments: cliArguments });

          case 7:
            siteProps = _context4.sent;
            seenProps = new Map();
            sharedProps = new Map();
            _context4.next = 12;
            return Promise.all(config.routes.map(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(route) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = !!route.getProps;

                        if (!_context.t0) {
                          _context.next = 5;
                          break;
                        }

                        _context.next = 4;
                        return route.getProps({ route: route, dev: false });

                      case 4:
                        _context.t0 = _context.sent;

                      case 5:
                        route.initialProps = _context.t0;


                        if (!route.initialProps) {
                          route.initialProps = {};
                        }

                        // Loop through the props
                        Object.keys(route.initialProps).map(function (k) {
                          return route.initialProps[k];
                        }).forEach(function (prop) {
                          // Have we seen this prop before?
                          if (seenProps.get(prop)) {
                            // Only cache each shared prop once
                            if (sharedProps.get(prop)) {
                              return;
                            }
                            // Cache the prop
                            var jsonString = JSON.stringify(prop);
                            sharedProps.set(prop, {
                              jsonString: jsonString,
                              hash: _shorthash2.default.unique(jsonString)
                            });
                          } else {
                            // Mark the prop as seen
                            seenProps.set(prop, true);
                          }
                        });

                      case 8:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 12:
            _context4.next = 14;
            return Promise.all(config.routes.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(route) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        // Loop through the props and build the prop maps
                        route.localProps = {};
                        route.propsMap = {};
                        Object.keys(route.initialProps).forEach(function (key) {
                          var value = route.initialProps[key];
                          var cached = sharedProps.get(value);
                          if (cached) {
                            route.propsMap[key] = cached.hash;
                          } else {
                            route.localProps[key] = value;
                          }
                        });

                        if (!Object.keys(route.localProps).length) {
                          _context2.next = 8;
                          break;
                        }

                        route.localPropsDataString = JSON.stringify(route.localProps);
                        route.localPropsHash = _shorthash2.default.unique(route.localPropsDataString);
                        // Make sure local props are tracked in a special key
                        route.propsMap.__local = route.localPropsHash;
                        return _context2.abrupt('return', _fsExtra2.default.outputFile(_path2.default.join(config.paths.STATIC_DATA, route.localPropsHash + '.json'), route.localPropsDataString || '{}'));

                      case 8:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 14:
            _context4.next = 16;
            return Promise.all(Array.from(sharedProps).map(function (cachedProp) {
              return _fsExtra2.default.outputFile(_path2.default.join(config.paths.STATIC_DATA, cachedProp[1].hash + '.json'), cachedProp[1].jsonString || '{}');
            }));

          case 16:
            routeInfo = {};

            config.routes.filter(function (d) {
              return d.hasGetProps;
            }).forEach(function (_ref5) {
              var path = _ref5.path,
                  propsMap = _ref5.propsMap;

              routeInfo[path] = propsMap;
            });

            // Write routeInfo to file
            _context4.next = 20;
            return _fsExtra2.default.outputFile(_path2.default.join(config.paths.DIST, 'routeInfo.json'), JSON.stringify(routeInfo));

          case 20:
            return _context4.abrupt('return', Promise.all(config.routes.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(route) {
                var staticURL, InitialPropsContext, ContextualComp, renderMeta, head, renderStringAndHead, appHtml, HtmlWithMeta, HeadWithMeta, BodyWithMeta, html, htmlFilename;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        staticURL = route.path;

                        // Inject initialProps into static build

                        InitialPropsContext = function (_Component) {
                          _inherits(InitialPropsContext, _Component);

                          function InitialPropsContext() {
                            _classCallCheck(this, InitialPropsContext);

                            return _possibleConstructorReturn(this, (InitialPropsContext.__proto__ || Object.getPrototypeOf(InitialPropsContext)).apply(this, arguments));
                          }

                          _createClass(InitialPropsContext, [{
                            key: 'getChildContext',
                            value: function getChildContext() {
                              return {
                                propsMap: route.propsMap,
                                initialProps: route.initialProps,
                                siteProps: siteProps,
                                staticURL: staticURL
                              };
                            }
                          }, {
                            key: 'render',
                            value: function render() {
                              return this.props.children;
                            }
                          }]);

                          return InitialPropsContext;
                        }(_react.Component);

                        InitialPropsContext.childContextTypes = {
                          propsMap: _propTypes2.default.object,
                          initialProps: _propTypes2.default.object,
                          siteProps: _propTypes2.default.object,
                          staticURL: _propTypes2.default.string
                        };

                        ContextualComp = function ContextualComp(props) {
                          return _react2.default.createElement(
                            InitialPropsContext,
                            null,
                            _react2.default.createElement(Comp, props)
                          );
                        };

                        renderMeta = {};
                        head = void 0;

                        renderStringAndHead = function renderStringAndHead(Comp) {
                          var appHtml = (0, _server.renderToString)(Comp);
                          // Extract head calls using Helmet synchronously right after renderToString
                          // to not introduce any race conditions in the meta data rendering
                          var helmet = _reactHelmet2.default.renderStatic();
                          head = {
                            htmlProps: helmet.htmlAttributes.toComponent(),
                            bodyProps: helmet.bodyAttributes.toComponent(),
                            base: helmet.base.toComponent(),
                            link: helmet.link.toComponent(),
                            meta: helmet.meta.toComponent(),
                            noscript: helmet.noscript.toComponent(),
                            script: helmet.script.toComponent(),
                            style: helmet.style.toComponent(),
                            title: helmet.title.toComponent()
                          };

                          return appHtml;
                        };

                        // Allow extractions of meta via config.renderToString


                        _context3.next = 9;
                        return config.renderToHtml(renderStringAndHead, ContextualComp, renderMeta, clientStats);

                      case 9:
                        appHtml = _context3.sent;

                        // Instead of using the default components, we need to hard code meta
                        // from react-helmet into the components
                        HtmlWithMeta = function HtmlWithMeta(_ref7) {
                          var children = _ref7.children,
                              rest = _objectWithoutProperties(_ref7, ['children']);

                          return _react2.default.createElement(
                            'html',
                            _extends({ lang: 'en' }, head.htmlProps, rest),
                            children
                          );
                        };

                        HeadWithMeta = function HeadWithMeta(_ref8) {
                          var children = _ref8.children,
                              rest = _objectWithoutProperties(_ref8, ['children']);

                          var showHelmetTitle = true;
                          var childrenArray = _react2.default.Children.toArray(children).filter(function (child) {
                            if (child.type === 'title') {
                              // Filter out the title of the Document in static.config.js
                              // if there is a helmet title on this route
                              var helmetTitleIsEmpty = head.title[0].props.children === '';
                              if (!helmetTitleIsEmpty) {
                                return false;
                              }
                              showHelmetTitle = false;
                            }
                            return true;
                          });

                          return _react2.default.createElement(
                            'head',
                            rest,
                            head.base,
                            showHelmetTitle && head.title,
                            head.meta,
                            head.link,
                            process.env.extractedCSSpath && _react2.default.createElement('link', { rel: 'stylesheet', href: '/' + process.env.extractedCSSpath }),
                            head.noscript,
                            head.script,
                            head.style,
                            childrenArray
                          );
                        };
                        // Not only do we pass react-helmet attributes and the app.js here, but
                        // we also need to  hard code site props and route props into the page to
                        // prevent flashing when react mounts onto the HTML.


                        BodyWithMeta = function BodyWithMeta(_ref9) {
                          var children = _ref9.children,
                              rest = _objectWithoutProperties(_ref9, ['children']);

                          return _react2.default.createElement(
                            'body',
                            _extends({}, head.bodyProps, rest),
                            children,
                            _react2.default.createElement('script', {
                              type: 'text/javascript',
                              dangerouslySetInnerHTML: {
                                __html: '\n                window.__routeData = ' + JSON.stringify({
                                  path: route.path,
                                  propsMap: route.propsMap,
                                  initialProps: route.initialProps,
                                  siteProps: siteProps
                                }).replace(/<(\/)?(script)/gi, '<"+"$1$2') + ';'
                              }
                            }),
                            _react2.default.createElement('script', { async: true, src: '' + config.publicPath + appJs })
                          );
                        };

                        // Render the html for the page inside of the base document.


                        html = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(
                          DocumentTemplate,
                          {
                            Html: HtmlWithMeta,
                            Head: HeadWithMeta,
                            Body: BodyWithMeta,
                            siteProps: siteProps,
                            renderMeta: renderMeta
                          },
                          _react2.default.createElement('div', { id: 'root', dangerouslySetInnerHTML: { __html: appHtml } })
                        ));

                        // If the siteRoot is set, prefix all absolute URL's

                        if (config.siteRoot) {
                          html = html.replace(/(href=["'])(\/[^/])/gm, '$1' + config.siteRoot + '$2');
                        }

                        // If the route is a 404 page, write it directly to 404.html, instead of
                        // inside a directory.
                        htmlFilename = route.is404 ? _path2.default.join(config.paths.DIST, '404.html') : _path2.default.join(config.paths.DIST, route.path, 'index.html');
                        _context3.next = 18;
                        return _fsExtra2.default.outputFile(htmlFilename, html);

                      case 18:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x4) {
                return _ref6.apply(this, arguments);
              };
            }())));

          case 21:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function exportRoutes(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.exportRoutes = exportRoutes;
var prepareRoutes = exports.prepareRoutes = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(config) {
    var templates, routes, tree, file, dynamicRoutesPath;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // Dynamically create the auto-routing component
            templates = [];
            routes = config.routes.filter(function (d) {
              return d.component;
            });

            routes.forEach(function (route) {
              if (!templates.includes(route.component)) {
                templates.push(route.component);
              }
            });

            tree = {};

            routes.forEach(function (route) {
              var parts = route.path === '/' ? ['/'] : route.path.split('/').filter(function (d) {
                return d;
              });
              var cursor = tree;
              parts.forEach(function (part, partIndex) {
                var isLeaf = parts.length === partIndex + 1;
                if (!cursor.c) {
                  cursor.c = {};
                }
                cursor = cursor.c;
                if (!cursor[part]) {
                  cursor[part] = {};
                }
                cursor = cursor[part];
                if (isLeaf) {
                  cursor.t = 't_' + templates.indexOf(route.component);
                }
              });
            });

            file = '\n    import React, { Component } from \'react\'\n    import { Route } from \'react-router-dom\'\n\n    // Template Imports\n    ' + templates.map(function (template) {
              return 'import ' + template.replace(/[^a-zA-Z0-9]/g, '_') + ' from \'' + _path2.default.relative(config.paths.DIST, _path2.default.resolve(config.paths.ROOT, template)) + '\'';
            }).join('\n').replace(/\\/g, '/') + '\n\n    // Template Map\n    const templateMap = {\n      ' + templates.map(function (template, index) {
              return 't_' + index + ': ' + template.replace(/[^a-zA-Z0-9]/g, '_');
            }).join(',\n') + '\n    }\n\n    // Template Tree\n    const templateTree = ' + JSON.stringify(tree).replace(/"(\w)":/gm, '$1:').replace(/template: '(.+)'/gm, 'template: $1') + '\n\n    // Get template for given path\n    const getComponentForPath = path => {\n      const parts = path === \'/\' ? [\'/\'] : path.split(\'/\').filter(d => d)\n      let cursor = templateTree\n      try {\n        parts.forEach(part => {\n          cursor = cursor.c[part]\n        })\n        return templateMap[cursor.t]\n      } catch (e) {\n        return false\n      }\n    }\n\n    export default class Routes extends Component {\n      render () {\n        const { component: Comp, render, children } = this.props\n        const renderProps = {\n          templateMap,\n          templateTree,\n          getComponentForPath\n        }\n        if (Comp) {\n          return (\n            <Comp\n              {...renderProps}\n            />\n          )\n        }\n        if (render || children) {\n          return (render || children)(renderProps)\n        }\n\n        // This is the default auto-routing renderer\n        return (\n          <Route path=\'*\' render={props => {\n            let Comp = getComponentForPath(props.location.pathname)\n            if (!Comp) {\n              Comp = getComponentForPath(\'404\')\n            }\n            return Comp && <Comp {...props} />\n          }} />\n        )\n      }\n    }\n  ';
            dynamicRoutesPath = _path2.default.resolve(config.paths.DIST, 'react-static-routes.js');
            _context6.next = 9;
            return _fsExtra2.default.remove(dynamicRoutesPath);

          case 9:
            _context6.next = 11;
            return _fsExtra2.default.writeFile(dynamicRoutesPath, file);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function prepareRoutes(_x6) {
    return _ref13.apply(this, arguments);
  };
}();
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(exportRoutes, 'exportRoutes', 'src/static.js');

  __REACT_HOT_LOADER__.register(buildXMLandRSS, 'buildXMLandRSS', 'src/static.js');

  __REACT_HOT_LOADER__.register(prepareRoutes, 'prepareRoutes', 'src/static.js');
}();

;