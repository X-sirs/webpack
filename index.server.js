require("babel-core/register");
require("babel-polyfill");
import React from 'react'; 
import {renderToString} from 'react-dom/server';
import {BrowserRouter,matchPath,StaticRouter} from 'react-router-dom'
import routes from './src/routes';
import {createMemoryHistory} from 'history'
function finalPage(renderContent,initialState){
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <script>
                (function(win, lib) {
                    var doc = win.document;
                    var docEl = doc.documentElement;
                    var metaEl = doc.querySelector('meta[name="viewport"]');
                    var flexibleEl = doc.querySelector('meta[name="flexible"]');
                    var dpr = 0;
                    var scale = 0;
                    var tid;
                    var flexible = lib.flexible || (lib.flexible = {});
                    if (metaEl) {
                        console.warn('将根据已有的meta标签来设置缩放比例');
                        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
                        if (match) {
                            scale = parseFloat(match[1]);
                            dpr = parseInt(1 / scale);
                        }
                    } else if (flexibleEl) {
                        var content = flexibleEl.getAttribute('content');
                        if (content) {
                            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                            if (initialDpr) {
                                dpr = parseFloat(initialDpr[1]);
                                scale = parseFloat((1 / dpr).toFixed(2));    
                            }
                            if (maximumDpr) {
                                dpr = parseFloat(maximumDpr[1]);
                                scale = parseFloat((1 / dpr).toFixed(2));    
                            }
                        }
                    }
                    if (!dpr && !scale) {
                        var isAndroid = win.navigator.appVersion.match(/android/gi);
                        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
                        var isIPad = win.navigator.appVersion.match(/ipad/gi);
                        var devicePixelRatio = win.devicePixelRatio;
                        if (isIPhone) {
                            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                                dpr = 3;
                            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                                dpr = 2;
                            } else {
                                dpr = 1;
                            }
                        } else {
                            // 其他设备下，仍旧使用1倍的方案
                            dpr = 1;
                        }
                        scale = 1 / dpr;
                    }
                    docEl.setAttribute('data-dpr', dpr);
                    if (!metaEl) {
                        metaEl = doc.createElement('meta');
                        metaEl.setAttribute('name', 'viewport');
                        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
                        if (docEl.firstElementChild) {
                            docEl.firstElementChild.appendChild(metaEl);
                        } else {
                            var wrap = doc.createElement('div');
                            wrap.appendChild(metaEl);
                            doc.write(wrap.innerHTML);
                        }
                    }
                    function IsPC(){ 
                        var userAgentInfo = navigator.userAgent; 
                        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
                        var flag = true; 
                        for (var v = 0; v < Agents.length; v++) { 
                            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
                        } 
                        return flag; 
                    }
                    function refreshRem(){
                        var width = docEl.getBoundingClientRect().width;
                        if (IsPC() && width < 2047) {
                            width = width > 540 ? 540 : width;
                        }
                        var rem = width / 7.5;
                        docEl.style.fontSize = rem + 'px';
                        flexible.rem = win.rem = rem;
                    }
                    win.addEventListener('resize', function() {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }, false);
                    win.addEventListener('pageshow', function(e) {
                        if (e.persisted) {
                            clearTimeout(tid);
                            tid = setTimeout(refreshRem, 300);
                        }
                    }, false);
                    if (doc.readyState === 'complete') {
                        doc.body.style.fontSize = 14 * dpr + 'px';
                    } else {
                        doc.addEventListener('DOMContentLoaded', function(e) {
                            doc.body.style.fontSize = 14 * dpr + 'px';
                        }, false);
                    }
                    refreshRem();
                    flexible.dpr = win.dpr = dpr;
                    flexible.refreshRem = refreshRem;
                    flexible.rem2px = function(d) {
                        var val = parseFloat(d) * this.rem;
                        if (typeof d === 'string' && d.match(/rem$/)) {
                            val += 'px';
                        }
                        return val;
                    }
                    flexible.px2rem = function(d) {
                        var val = parseFloat(d) / this.rem;
                        if (typeof d === 'string' && d.match(/px$/)) {
                            val += 'rem';
                        }
                        return val;
                    }
                })(window, window['lib'] || (window['lib'] = {}));
            </script>
            <!--BeginInjectCss-->
            <!--EndInjectCss-->
            <title>main</title>
        </head>

        <body>
            <div id="root">${renderContent}</div>
            <script>
                windoe.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="../common/vendors.dll.js"></script>
            <script src="../assets/js/commons.js"></script>
            <!--BeginInjectJs-->
            <!--EndInjectJs-->
        </body>
        </html>
    `;
};
export default function render(ctx) {
    const history = createMemoryHistory();
    const promises = [];
    routes.some(route=>{
        const match = matchPath(ctx.path,route);
        if(match){
            promises.push(route.loadData(match));      
        }
        return match;
    });
    Promise.all(promises).then(data=>{
        const initialContent = renderToString(<StaticRouter location={ctx.url} context={data} />);
        const initialState = null;
        ctx.body = finalPage(initialContent, initialState);
    },(err)=>{
        ctx.body = "route not match"+JSON.stringify(err)
    })
};