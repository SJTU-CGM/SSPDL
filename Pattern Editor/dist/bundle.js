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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../usr/lib/node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "../../../../../../usr/lib/node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/@baliga-lab/sequencelogo.js/seqlogo.js":
/*!*************************************************************!*\
  !*** ./node_modules/@baliga-lab/sequencelogo.js/seqlogo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* seqlogo.js - see README and LICENSE for details */
(function (glob) {
    "use strict";
    // some default settings
    var MARGIN_LEFT = 40, MARGIN_TOP = 20, MARGIN_RIGHT = 20,
        MARGIN_BOTTOM = 30, DEFAULT_OPTIONS, NUCLEOTIDE_COLORS,
        AMINO_COLORS, MEASURE_CANVAS, STRETCH = 0.65;
    NUCLEOTIDE_COLORS = {
        'A': 'rgb(0, 128, 0)',
        'G': 'rgb(255, 165, 0)',
        'T': 'rgb(255, 0, 0)',
        'U': 'rgb(255, 0, 0)',
        'C': 'rgb(0, 0, 255)'
    };
    AMINO_COLORS = {
        // polar amino acids
        'G': 'rgb(0, 200, 50)',
        'S': 'rgb(0, 200, 50)',
        'T': 'rgb(0, 200, 50)',
        'Y': 'rgb(0, 200, 50)',
        'C': 'rgb(0, 200, 50)',
        'Q': 'rgb(0, 200, 50)',
        'N': 'rgb(0, 200, 50)',
        // basic
        'K': 'rgb(0, 0, 230)',
        'R': 'rgb(0, 0, 230)',
        'H': 'rgb(0, 0, 230)',
        // acidic
        'D': 'rgb(255, 0, 0)',
        'E': 'rgb(255, 0, 0)',
        // hydrophobic
        'A': 'rgb(0, 0, 0)',
        'V': 'rgb(0, 0, 0)',
        'L': 'rgb(0, 0, 0)',
        'I': 'rgb(0, 0, 0)',
        'P': 'rgb(0, 0, 0)',
        'W': 'rgb(0, 0, 0)',
        'F': 'rgb(0, 0, 0)',
        'M': 'rgb(0, 0, 0)'
    };
    DEFAULT_OPTIONS = {
        type: 'canvas',
        width: 400,
        height: 300,
        style: {
            width: 400,
            height: 300,
            font: '20pt Helvetica'
        }
    };
    MEASURE_CANVAS = document.createElement('canvas');
    MEASURE_CANVAS.setAttribute('width', 500);
    MEASURE_CANVAS.setAttribute('height', 500);

    // **********************************************************************
    // ****** Common Functions
    // **********************************************************************

    function rank(arr) {
        var result = [], i;
        for (i = 0; i < arr.length; i += 1) {
            result.push([i, arr[i]]);
        }
        return result.sort(function (a, b) {
            return a[1] - b[1];
        });
    }

    function log(n, base) {
        return Math.log(n) / Math.log(base);
    }
    function uncertaintyAt(pssm, motifPos) {
        var row, freq, sum = 0;
        for (row = 0; row < pssm.values[motifPos].length; row += 1) {
            freq = pssm.values[motifPos][row];
            if (freq > 0) {
                sum += freq * log(freq, 2);
            }
        }
        return -sum;
    }
    function rsequence(pssm, motifPos) {
        var correctionFactor = 0.0, numBits;
        numBits = Math.ceil(log(pssm.alphabet.length, 2));
        return numBits - (uncertaintyAt(pssm, motifPos) + correctionFactor);
    }

    // Generic PSSM drawing function
    function drawPSSM(pssm, scalex, y0, yHeight, drawFun) {
        var x, y, motifPos, size, columnRanks, currentGlyph, row, maxWidth, rseq;
        x = MARGIN_LEFT;

        for (motifPos = 0; motifPos < pssm.values.length; motifPos += 1) {
            y = y0;
            columnRanks = rank(pssm.values[motifPos]);
            maxWidth = 0;
            rseq = rsequence(pssm, motifPos);
            for (row = 0; row < columnRanks.length; row += 1) {
                currentGlyph = pssm.alphabet[columnRanks[row][0]];
                size = drawFun(currentGlyph, x, y, scalex, yHeight,
                               rseq * columnRanks[row][1]);
                if (size.width > maxWidth) {
                    maxWidth = size.width;
                }
                y -= size.height;
            }
            x += maxWidth;
        }
        return x;
    }

    // **********************************************************************
    // ****** Canvas-based Implementation
    // **********************************************************************

    function firstLine(imageData) {
        var pixels = imageData.data, row, col, index;
        for (row = 0; row < imageData.height; row += 1) {
            for (col = 0; col < imageData.width; col += 1) {
                index = (row * imageData.width * 4) + col * 4;
                if (pixels[index + 3] !== 0) {
                    return row;
                }
            }
        }
        return imageData.height;
    }
    function lastLine(imageData) {
        var pixels = imageData.data, row, col, index;
        for (row = imageData.height - 1; row >= 0; row -= 1) {
            for (col = 0; col < imageData.width; col += 1) {
                index = (row * imageData.width * 4) + col * 4;
                if (pixels[index + 3] !== 0) {
                    return row;
                }
            }
        }
        return imageData.height - 1;
    }

    function measureText(text, font, scalex, scaley) {
        var imageData, context, first;
        if (scaley === 0) {
            return 0;
        }
        context = MEASURE_CANVAS.getContext('2d');
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = font;
        context.textBaseline = 'top';
        context.save();
        context.scale(scalex, scaley);
        context.fillText(text, 0, 0);
        context.restore();

        imageData = context.getImageData(0, 0, MEASURE_CANVAS.width, MEASURE_CANVAS.height);
        first = firstLine(imageData);
        context.clearRect(0, 0, MEASURE_CANVAS.width, MEASURE_CANVAS.height);
        return lastLine(imageData) - first + 1;
    }

    function drawLabelsY(context, numBits, x0, y0, yHeight) {
        var i, label, ydist = yHeight / numBits, y = y0;

        context.font = '12pt Arial';
        context.fillText('bits', x0 + 10, MARGIN_TOP - 5);
        var textHeight = measureText('M', context.font, 1.0, 1.0);
        y += textHeight / 2;

        for (i = 0; i <= numBits; i += 1) {
            label = i.toString();
            context.fillText(label, x0, y);
            y -= ydist;
        }
    }

    function drawMinorTicksY(context, y0, y1, numDivisions) {
        var interval = (y1 - y0) / numDivisions, y = y0, i;
        for (i = 0; i < numDivisions; i += 1) {
            if (i > 0) {
                context.beginPath();
                context.moveTo(MARGIN_LEFT - 5, y);
                context.lineTo(MARGIN_LEFT, y);
                context.stroke();
            }
            y += interval;
        }
    }

    function drawTicksY(context, numBits, bottom) {
        var mainIntervalY = (bottom - MARGIN_TOP) / numBits;
        var y = MARGIN_TOP, i;
        for (i = 0; i <= numBits; i += 1) {
            context.beginPath();
            context.moveTo(MARGIN_LEFT - 10, y);
            context.lineTo(MARGIN_LEFT, y);
            context.stroke();
            if (i < numBits) {
                drawMinorTicksY(context, y, y + mainIntervalY, 5);
            }
            y += mainIntervalY;
        }
    }

    function drawAxis(context, numBits, right, bottom) {
        // main axis
        context.beginPath();
        context.moveTo(MARGIN_LEFT, MARGIN_TOP);
        context.lineTo(MARGIN_LEFT, bottom);
        context.lineTo(right, bottom);
        context.stroke();

        drawTicksY(context, numBits, bottom);
    }

    function drawScale(canvas, pssm) {
        var context = canvas.getContext('2d'), right = canvas.width - MARGIN_RIGHT,
            numBits = Math.ceil(log(pssm.alphabet.length, 2)),
            bottom = canvas.height - MARGIN_BOTTOM;
        drawAxis(context, numBits, right, bottom);
        drawLabelsY(context, numBits, MARGIN_LEFT - 25, bottom, bottom - MARGIN_TOP);
    }

    function drawGlyph(context, glyph, colors, x, y, scalex,
                       yHeight, maxFontHeightNormal,
                       weight) {
        var glyphWidth, scaley, glyphHeightScaled;
        glyphWidth = context.measureText(glyph).width * scalex;
        scaley = weight * (yHeight / maxFontHeightNormal) * STRETCH;
        glyphHeightScaled = measureText(glyph, context.font, scalex, scaley);
        if (scaley > 0) {
            context.fillStyle = colors[glyph];
            context.save();
            context.translate(x, y);
            context.scale(scalex, scaley);
            context.translate(-x, -y);
            context.fillText(glyph, x, y);
            context.restore();
        }
        return { width: glyphWidth, height: glyphHeightScaled };
    }

    function colorTableFor(pssm) {
        var i, c;
        for (i = 0; i < pssm.alphabet.length; i += 1) {
            c = pssm.alphabet[i];
            if (c !== 'A' && c !== 'G' && c !== 'T' && c !== 'C' && c !== 'U') {
                return AMINO_COLORS;
            }
        }
        return NUCLEOTIDE_COLORS;
    }

    function drawGlyphs(canvas, options, pssm) {
        var context, yHeight, maxFontHeightNormal, sumColumnWidthsNormal, xWidth, scalex;
        context = canvas.getContext('2d');
        context.textBaseline = 'alphabetic';
        if (options.style && options.style.font) {
            context.font = options.style.font;
        } else {
            context.font = DEFAULT_OPTIONS.style.font;
        }
        yHeight = canvas.height - (MARGIN_BOTTOM + MARGIN_TOP);
        maxFontHeightNormal = measureText('Mg', context.font, 1.0, 1.0);
        sumColumnWidthsNormal = context.measureText('W').width * pssm.values.length;
        xWidth = canvas.width - (MARGIN_LEFT + MARGIN_RIGHT);
        scalex = xWidth / sumColumnWidthsNormal;
        var lastX = drawPSSM(pssm, scalex,
                             canvas.height - MARGIN_BOTTOM, yHeight,
                             function (currentGlyph, x, y, scalex, yHeight, weight) {
                                 return drawGlyph(context, currentGlyph,
                                                  colorTableFor(pssm), x, y,
                                                  scalex, yHeight,
                                                  maxFontHeightNormal, weight);
                             });
        return (lastX - MARGIN_LEFT) / pssm.values.length;
    }

    function drawTicksX(canvas, pssm, interval) {
        var context = canvas.getContext('2d'), bottom = canvas.height - MARGIN_BOTTOM, i, x, xi, tickHeight, label, textdim, textHeight;
        context.font = '12pt Arial';
        context.fillStyle = 'black';
        for (i = 1; i <= pssm.values.length; i += 1) {
            x = MARGIN_LEFT + i * interval;
            xi = x - interval / 2;
            tickHeight = (i % 5 === 0) ? 10 : 5;
            context.beginPath();
            context.moveTo(xi, bottom);
            context.lineTo(xi, bottom + tickHeight);
            context.stroke();
            if (i % 5 === 0) {
                label = i.toString();
                textdim = context.measureText(label);
                // the TextMetrics object currently does not have any other attributes
                // than width, so we simply specify a text height
                textHeight = 14;
                context.fillText(label, xi - textdim.width / 2, bottom + tickHeight + textHeight);
            }
        }
    }

    function makeCanvas(id, options, pssm) {
        var elem = document.getElementById(id);
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', options.width);
        canvas.setAttribute('height', options.height);
        if (options.style) {
            canvas.setAttribute('style', 'border: 1px solid black; width: ' +
                                options.style.width + '; height: ' + options.style.height +
                                '; font: ' + options.font);
        } else {
            canvas.setAttribute('style', 'border: 1px solid black');
        }
        elem.parentNode.replaceChild(canvas, elem);
        canvas.id = id;
        drawScale(canvas, pssm);
        var interval = drawGlyphs(canvas, options, pssm);
        drawTicksX(canvas, pssm, interval);
    }

    // **********************************************************************
    // ****** Public API
    // **********************************************************************
    var seqlogo = { };
    seqlogo.version = '1.0.0';
    seqlogo.makeLogo = function (id, pssm, options) {
        if (options === null) {
            options = DEFAULT_OPTIONS;
        }
        // TODO: copy the options from DEFAULT_OPTIONS that are missing
        makeCanvas(id, options, pssm);
    };

    // These lines needed to support a NPM/ES6 environment, the define() call
    // is to support RequireJS
    glob.seqlogo = seqlogo;
    typeof module != 'undefined' && module.exports ? module.exports = seqlogo :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return seqlogo; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(typeof window != "undefined" ? window : this);


/***/ }),

/***/ "./node_modules/file-saver/FileSaver.js":
/*!**********************************************!*\
  !*** ./node_modules/file-saver/FileSaver.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(/*! !webpack amd define */ "../../../../../../usr/lib/node_modules/webpack/buildin/amd-define.js") !== null) && (__webpack_require__(/*! !webpack amd options */ "../../../../../../usr/lib/node_modules/webpack/buildin/amd-options.js") !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),

/***/ "./src/DistributionEditor.ts":
/*!***********************************!*\
  !*** ./src/DistributionEditor.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const StringEditor_1 = __webpack_require__(/*! ./Widget/StringEditor */ "./src/Widget/StringEditor.ts");
const Button_1 = __webpack_require__(/*! ./Widget/Button */ "./src/Widget/Button.ts");
const Pile_1 = __webpack_require__(/*! ./Widget/Pile */ "./src/Widget/Pile.ts");
const Snap = __webpack_require__(/*! snapsvg */ "snapsvg");
const JSUtility_1 = __webpack_require__(/*! ./utility/JSUtility */ "./src/utility/JSUtility.ts");
const svg_1 = __webpack_require__(/*! ./utility/svg */ "./src/utility/svg.ts");
const Utility_1 = __webpack_require__(/*! ./Widget/Utility */ "./src/Widget/Utility.ts");
class DistributionEditor extends Widget_1.Editor {
    init() {
        this.viewer = new DViewer();
        this.editor = new DEditor();
        html_1.HTML.b({
            p: this.getDOM(),
            ch: [
                "Distribution:",
                this.viewer.getDOM()
            ]
        });
        this.viewer.bind({
            handle: (cmd) => {
                Utility_1.confirm(this.editor, {
                    ok: () => {
                        const newData = this.editor.getData();
                        if (newData.probs.every((n) => { return 0 <= n && n <= 1; }) && JSUtility_1.sum(...newData.probs) === 1) {
                            this.viewer.setData(this.editor.getData());
                        }
                        else {
                            alert("invalid distribution: either some probability is out of [0,1] or their sum does not equal to 1.");
                        }
                    },
                    cancel: () => {
                    }
                });
            }
        });
    }
    getData() {
        return this.viewer.getData();
    }
    displayData(container, data) {
        this.viewer.setData(data);
        this.editor.setData(data);
    }
}
exports.DistributionEditor = DistributionEditor;
class DViewer extends Widget_1.Controller {
    init() {
        super.init();
        this.svg = svg_1.SVG.svg({
            "stroke": "black",
            "fill": "white"
        });
        this.paper = Snap(this.svg);
        html_1.HTML.inner(this.getDOM(), [this.svg]);
        this.svg.addEventListener("click", () => {
            this.send("click");
        });
    }
    displayData(container, data) {
        const contentHeight = 100;
        const unitWidth = 30;
        const topPadding = 20;
        const bottomPadding = 20;
        const leftPadding = 10;
        const rightPadding = 10;
        const height = contentHeight + topPadding + bottomPadding;
        const heightProbRatio = contentHeight / Math.max(0, ...data.probs);
        const width = leftPadding + unitWidth * data.probs.length + rightPadding;
        svg_1.SVG.attr(this.svg, {
            "width": width,
            "height": height
        });
        svg_1.SVG.build({
            p: this.svg,
            ch: [
                ...data.probs.map((p, i) => {
                    const index = data.from + i;
                    const h = p * heightProbRatio;
                    const w = unitWidth;
                    const top = topPadding + contentHeight;
                    const left = leftPadding + unitWidth * i;
                    return svg_1.SVG.build({
                        p: {
                            tag: "g",
                            attr: {
                                "transform": JSUtility_1.format("translate(%,%)", left, top)
                            }
                        },
                        ch: [
                            {
                                tag: "rect",
                                attr: {
                                    "x": 0, "y": -h, "width": w, "height": h,
                                    "fill": "lightblue",
                                    "stroke": "white"
                                }
                            },
                            {
                                p: {
                                    tag: "text",
                                    attr: {
                                        "x": unitWidth / 2, "y": -h,
                                        "fill": "black",
                                        "stroke": "black",
                                        "dominant-baseline": "baseline",
                                        "text-anchor": "middle",
                                        "pointer-events": "none",
                                        "font-size": "0.8em"
                                    }
                                },
                                ch: [p.toFixed(3)]
                            },
                            {
                                p: {
                                    tag: "text",
                                    attr: {
                                        "x": unitWidth / 2, "y": 0,
                                        "fill": "black",
                                        "stroke": "black",
                                        "dominant-baseline": "hanging",
                                        "text-anchor": "middle",
                                        "pointer-events": "none"
                                    }
                                },
                                ch: [index]
                            }
                        ]
                    });
                }),
                {
                    tag: "line",
                    attr: {
                        "x1": 0, "y1": topPadding + contentHeight, "x2": width, "y2": topPadding + contentHeight,
                        "stroke": "black",
                        "fill": "black"
                    }
                }
            ]
        });
    }
}
class DEditor extends Widget_1.Editor {
    init() {
        super.init();
        this.fromInput = html_1.HTML.e({
            tag: "input",
            attr: {
                "type": "number",
                "step": "1",
                "min": "0"
            }
        });
        this.fromInput.addEventListener("change", () => {
            this.probsEr.setData(Object.assign({}, this.probsEr.getData(), {
                "from": parseInt(this.fromInput.value)
            }));
        });
        this.probsEr = new ProbsEditor();
        html_1.HTML.b({
            p: this.getDOM(),
            ch: [
                {
                    p: {
                        tag: "label"
                    },
                    ch: [
                        "From",
                        this.fromInput
                    ]
                },
                this.probsEr.getDOM()
            ]
        });
    }
    getData() {
        return this.probsEr.getData();
    }
    displayData(container, data) {
        this.fromInput.value = data.from + "";
        this.probsEr.setData(data);
    }
}
class ProbsEditor extends Widget_1.Editor {
    handle(cmd) {
        switch (cmd.message) {
            case "add-row": {
                const data = this.getData();
                this.setData({
                    from: data.from,
                    probs: [...data.probs, 0]
                });
                return;
            }
            case "del-row": {
                const data = this.getData();
                this.setData({
                    from: data.from,
                    probs: (data.probs.length > 0) ? data.probs.slice(0, data.probs.length - 1) : []
                });
                return;
            }
        }
    }
    init() {
        super.init();
        this.addRowButton = new Button_1.Button();
        this.addRowButton.setData({
            label: "+",
            message: "add-row"
        });
        this.addRowButton.bind(this);
        this.delRowButton = new Button_1.Button();
        this.delRowButton.setData({
            label: "-",
            message: "del-row"
        });
        this.delRowButton.bind(this);
    }
    getData() {
        return {
            from: this.data.from,
            probs: this.editors.map((e) => { return parseFloat(e.getData()); })
        };
    }
    displayData(container, data) {
        const len = data.probs.length;
        this.editors = [];
        for (let i = 0; i < len; i++) {
            this.editors.push(new StringEditor_1.StringEditor());
        }
        for (let i = 0; i < len; i++) {
            this.editors[i].setData({
                label: (data.from + i).toString(),
                content: data.probs[i].toFixed(3)
            });
        }
        const pile = new Pile_1.HPile();
        pile.setChildren([this.addRowButton, this.delRowButton]);
        html_1.HTML.b({
            p: container,
            ch: [...this.editors.map(e => e.getDOM()), pile.getDOM()]
        });
    }
}


/***/ }),

/***/ "./src/ElementEditor.ts":
/*!******************************!*\
  !*** ./src/ElementEditor.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const StringEditor_1 = __webpack_require__(/*! ./Widget/StringEditor */ "./src/Widget/StringEditor.ts");
const MotifEditor_1 = __webpack_require__(/*! ./MotifEditor */ "./src/MotifEditor.ts");
const SpacerEditor_1 = __webpack_require__(/*! ./SpacerEditor */ "./src/SpacerEditor.ts");
class ElementEditor extends Widget_1.Editor {
    constructor(container) {
        super(container);
        this.nameEd = new StringEditor_1.StringEditor(html_1.HTML.box());
        this.motifEd = new MotifEditor_1.MotifEditor(html_1.HTML.box());
        this.gmotifEd = new MotifEditor_1.GMotifEditor(html_1.HTML.box());
        this.spacerEd = new SpacerEditor_1.SpacerEditor(html_1.HTML.box());
        this.gmotifEd.getDOM().style.display = "none";
        this.motifEd.getDOM().style.display = "none";
        this.spacerEd.getDOM().style.display = "none";
        html_1.HTML.inner(container, [
            this.nameEd.getDOM(), this.motifEd.getDOM(), this.gmotifEd.getDOM(), this.spacerEd.getDOM()
        ]);
    }
    getData() {
        const getDef = () => {
            switch (this.data.def.kind) {
                case "motif": {
                    return Object.assign(this.motifEd.getData(), { kind: "motif" });
                }
                case "g-motif": {
                    return Object.assign(this.gmotifEd.getData(), { kind: "g-motif" });
                }
                case "spacer": {
                    return Object.assign(this.spacerEd.getData(), { kind: "spacer" });
                }
            }
        };
        console.log(this.data);
        return {
            name: this.nameEd.getData(),
            def: getDef()
        };
    }
    displayData(container, data) {
        this.nameEd.setData({
            label: "Name",
            content: data.name
        });
        const def = data.def;
        switch (def.kind) {
            case "motif": {
                this.motifEd.getDOM().style.display = "unset";
                this.gmotifEd.getDOM().style.display = "none";
                this.spacerEd.getDOM().style.display = "none";
                this.motifEd.setData({
                    color: def.color,
                    matrix: def.matrix
                });
                return;
            }
            case "g-motif": {
                this.motifEd.getDOM().style.display = "none";
                this.gmotifEd.getDOM().style.display = "unset";
                this.spacerEd.getDOM().style.display = "none";
                this.gmotifEd.setData({
                    distribution: def.distribution,
                    color: def.color,
                    matrix: def.matrix
                });
                return;
            }
            case "spacer": {
                // spacer
                this.motifEd.getDOM().style.display = "none";
                this.gmotifEd.getDOM().style.display = "none";
                this.spacerEd.getDOM().style.display = "unset";
                this.spacerEd.setData({
                    distribution: def.distribution
                });
                return;
            }
        }
    }
}
exports.ElementEditor = ElementEditor;


/***/ }),

/***/ "./src/Menubar.ts":
/*!************************!*\
  !*** ./src/Menubar.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
class Menubar extends Widget_1.Controller {
    displayData(container, data) {
        const buildMenu = (menu) => {
            const box = html_1.HTML.element("div", {}, {
                "display": "inline-block"
            });
            const first = html_1.HTML.element("div", {
                "class": "w3-button"
            }, {
                "cursor": "pointer",
                "position": "relative",
                "padding": "0.2em 1em"
            }, [menu.name]);
            const second = html_1.HTML.element("div", {}, {
                "position": "absolute",
                "display": "none",
                "background-color": "white",
                "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"
            }, menu.content.map((s) => {
                const sec = html_1.HTML.element("div", {
                    "class": "w3-button"
                }, {
                    "display": "block",
                    "cursor": "pointer",
                    "padding": "0.2em 1em"
                }, [s]);
                sec.addEventListener("click", () => {
                    this.send({
                        kind: "menu",
                        firstLevel: menu.name,
                        secondLevel: s
                    });
                });
                return sec;
            }));
            html_1.HTML.inner(box, [first, second]);
            box.addEventListener("mouseenter", () => {
                second.style.display = "block";
            });
            box.addEventListener("mouseleave", () => {
                second.style.display = "none";
            });
            return box;
        };
        html_1.HTML.inner(container, data.map(buildMenu));
    }
}
exports.Menubar = Menubar;


/***/ }),

/***/ "./src/ModelEditor.ts":
/*!****************************!*\
  !*** ./src/ModelEditor.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ModuleViewer_1 = __webpack_require__(/*! ./ModuleViewer */ "./src/ModuleViewer.ts");
const Utility_1 = __webpack_require__(/*! ./SMDL/Utility */ "./src/SMDL/Utility.ts");
const JSUtility_1 = __webpack_require__(/*! ./utility/JSUtility */ "./src/utility/JSUtility.ts");
const NamespaceViewer_1 = __webpack_require__(/*! ./NamespaceViewer */ "./src/NamespaceViewer.ts");
const Menubar_1 = __webpack_require__(/*! ./Menubar */ "./src/Menubar.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const Utility_2 = __webpack_require__(/*! ./Widget/Utility */ "./src/Widget/Utility.ts");
const Pile_1 = __webpack_require__(/*! ./Widget/Pile */ "./src/Widget/Pile.ts");
const StringEditor_1 = __webpack_require__(/*! ./Widget/StringEditor */ "./src/Widget/StringEditor.ts");
const Button_1 = __webpack_require__(/*! ./Widget/Button */ "./src/Widget/Button.ts");
const FileSaver = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/FileSaver.js");
class ModelEditor extends Widget_1.Editor {
    constructor(container) {
        super(container);
        this.undoCount = 0;
        this.undoStack = [];
        this.redoStack = [];
        const menubar = new Menubar_1.Menubar(html_1.HTML.ref("menu"));
        menubar.setData([
            {
                name: "File",
                content: ["New", "Load", "Save"]
            },
            {
                name: "Edit",
                content: ["Undo", "Redo"]
            },
            {
                name: "About",
                content: ["Website"]
            }
        ]);
        menubar.bind(this);
        this.moduleVr = new ModuleViewer_1.ModuleViewer(html_1.HTML.ref("viewer-wrapper"));
        this.moduleVr.bind(this);
        this.namespaceVr = new NamespaceViewer_1.NamespaceViewer(html_1.HTML.ref("namespace-viewer"));
        this.namespaceVr.bind(this);
        // HTML.inner(container, [ menubar.getContainer(), this.moduleVr.getContainer(), this.namespaceVr.getContainer() ]);
    }
    handleUndo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.getData());
            this.setData(this.undoStack.pop());
        }
        else {
            alert("no more undoable action");
        }
    }
    handleRedo() {
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.getData());
            this.setData(this.redoStack.pop());
        }
        else {
            alert("no more redoable action");
        }
    }
    handleNeitherUndoNorRedo() {
        this.undoStack.push(this.getData());
        this.redoStack = [];
    }
    interpreteEditNode(path, index) {
        const model = this.getData();
        let insertedElement = null;
        const chooserHandler = new class {
            handle(cmd) {
                insertedElement = cmd.message;
                popupHandler.handle("close");
            }
        };
        const buttons = Object.keys(model.namespace).map((nm) => {
            const b = new Button_1.Button();
            b.setData({
                label: nm,
                message: nm
            });
            b.bind(chooserHandler);
            return b;
        });
        const pile = new Pile_1.Pile();
        pile.setChildren(buttons);
        const popupHandler = Utility_2.popup(pile, {
            onclose: () => {
                if (insertedElement) {
                    const rider = new Utility_1.StandardRider(model.root, path);
                    rider.getModule().splice(index, 0, {
                        kind: "element",
                        name: insertedElement
                    });
                    this.setData(model);
                }
            }
        });
    }
    interpreteEditElement(path) {
        const deleteButton = new Button_1.Button();
        let deleteFlag = false;
        deleteButton.setData({
            label: html_1.HTML.span("delete", { "color": "red" }),
            message: "delete"
        });
        deleteButton.bind(new class {
            handle(cmd) {
                deleteFlag = true;
                popupHandle.handle("close");
            }
        });
        const popupHandle = Utility_2.popup(deleteButton, {
            onclose: () => {
                if (deleteFlag) {
                    // delete Element
                    const data = this.getData();
                    const rider = new Utility_1.StandardRider(data.root, path);
                    console.log(rider.getNodeKind(), rider, path);
                    // return;
                    rider.up();
                    rider.getModule().splice(path[path.length - 1], 1);
                    this.setData(data);
                    return;
                }
            }
        });
    }
    interpreteEditRepetition(path) {
        class RepetetionEditor extends Widget_1.Editor {
            init() {
                this.editor = new StringEditor_1.StringEditor();
                this.editor.registerHandler((data) => {
                    this.emitDataChange();
                });
                html_1.HTML.b({
                    p: this.getDOM(),
                    ch: [this.editor.getDOM()]
                });
            }
            setData(data) {
                this.editor.setData(data.toFixed(3));
            }
            getData() {
                return parseFloat(this.editor.getData());
            }
            displayData(container, data) {
            }
        }
        const data = this.getData();
        const rider = new Utility_1.StandardRider(data.root, path);
        const repet = rider.getRepetition();
        const ed = new RepetetionEditor();
        ed.setData(repet.prob);
        function validProb(p) {
            return 0 <= p && p <= 1;
        }
        // delete button
        const btn = new Button_1.Button();
        let delFlag = false;
        btn.setData({
            label: html_1.HTML.e({
                tag: "span",
                style: {
                    "color": "red"
                },
                ch: ["Delete"]
            }),
            message: "delete"
        });
        btn.bind(new class {
            handle(cmd) {
                delFlag = true;
                popupHandle.handle("close");
            }
        });
        const pile = new Pile_1.Pile();
        pile.setChildren([ed, btn]);
        const popupHandle = Utility_2.popup(pile, {
            onclose: () => {
                if (delFlag) {
                    const path = rider.getPath();
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.setData(data);
                }
                else {
                    const prob_ = ed.getData();
                    if (validProb(prob_)) {
                        repet.prob = prob_;
                        this.setData(data);
                    }
                    else {
                        alert("invalid probability");
                    }
                }
            }
        });
    }
    interpreteEditAlternation(path) {
        class AlternationProbsEditor extends Widget_1.Editor {
            init() {
                this.pile = new Pile_1.Pile();
                html_1.HTML.b({
                    p: this.getDOM(),
                    ch: [this.pile.getDOM()]
                });
            }
            displayData(container, data) {
                this.editors = data.map((p) => {
                    const ed = new StringEditor_1.StringEditor(html_1.HTML.box());
                    ed.setData(p.toFixed(3));
                    return ed;
                });
                this.pile.setChildren(this.editors);
            }
            getData() {
                return this.editors.map((ed) => {
                    return parseFloat(ed.getData());
                });
            }
        }
        const data = this.getData();
        const rider = new Utility_1.StandardRider(data.root, path);
        const alter = rider.getAlternation();
        const probs = alter.psubs.map(ps => ps.prob);
        const ed = new AlternationProbsEditor(html_1.HTML.box());
        ed.setData(probs);
        function validDistribution(dist) {
            return (dist.every(x => (x >= 0)) && JSUtility_1.sum(...dist) === 1);
        }
        const btn = new Button_1.Button();
        let delFlag = false;
        btn.setData({
            label: html_1.HTML.e({
                tag: "span",
                style: {
                    "color": "red"
                },
                ch: ["Delete"]
            }),
            message: "delete"
        });
        btn.bind(new class {
            handle(cmd) {
                delFlag = true;
                popupHandle.handle("close");
            }
        });
        const pile = new Pile_1.Pile();
        pile.setChildren([ed, btn]);
        const popupHandle = Utility_2.popup(pile, {
            onclose: () => {
                if (delFlag) {
                    const path = rider.getPath();
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.setData(data);
                }
                else {
                    const newDist = ed.getData();
                    if (validDistribution(newDist)) {
                        alter.psubs = JSUtility_1.zip2(alter.psubs, newDist).map((x) => {
                            const [ps, p] = x;
                            return {
                                prob: p,
                                mod: ps.mod
                            };
                        });
                        this.setData({
                            namespace: data.namespace,
                            root: data.root
                        });
                        return;
                    }
                    else {
                        alert("invalid distribution");
                    }
                }
            }
        });
    }
    interpreteDefineElement(name, def) {
        const data = this.getData();
        if (name.length === 0) {
            alert("name too short");
            return;
        }
        else if (name in data.namespace) {
            alert("name conflict");
            return;
        }
        else {
            data.namespace[name] = def;
            this.setData(data);
            return;
        }
    }
    interpreteRedefineElement(oldName, newName, def) {
        function redef(ns, n1, n2, def) {
            delete ns[n1];
            ns[n2] = def;
            return ns;
        }
        function rename(m, n1, n2) {
            return Utility_1.transformModule(m, (e) => {
                const nm = e.name === n1 ? n2 : e.name;
                return {
                    name: nm
                };
            });
        }
        const data = this.getData();
        return this.setData({
            namespace: redef(data.namespace, oldName, newName, def),
            root: rename(data.root, oldName, newName)
        });
    }
    displayData(container, data) {
        this.moduleVr.setData(Utility_1.transformModule(data.root, (e) => {
            const name = e.name;
            const elem = data.namespace[name];
            switch (elem.kind) {
                case "motif": {
                    return {
                        type: "motif",
                        name: name,
                        color: elem.color,
                    };
                }
                case "g-motif": {
                    return {
                        type: "g-motif",
                        name: name,
                        dist: elem.distribution,
                        color: elem.color,
                    };
                }
                case "spacer": {
                    return {
                        type: "spacer",
                        name: name
                    };
                }
            }
        }));
        // this.namespaceVr.setData({ ns: data.namespace, elem: Object.keys(data.namespace)[0] })
        this.namespaceVr.setData(data.namespace);
    }
    handle(cmd) {
        console.log("ModelEditor", cmd);
        if (cmd.kind === "menu") {
            const cmdString = cmd.firstLevel + "." + cmd.secondLevel;
            if (cmdString === "Edit.Undo") {
                this.handleUndo();
                return;
            }
            else if (cmdString === "Edit.Redo") {
                this.handleRedo();
                return;
            }
            else {
                this.handleNeitherUndoNorRedo();
                switch (cmdString) {
                    case "File.New": {
                        this.setData({
                            namespace: {},
                            root: []
                        });
                        return;
                    }
                    case "File.Load": {
                        const file = JSUtility_1.requestFile((file) => {
                            if (file) {
                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                    const text = reader.result;
                                    const json = JSON.parse(text);
                                    this.setData(json);
                                });
                                reader.readAsText(file);
                            }
                        });
                        return;
                    }
                    case "File.Save": {
                        const blob = new Blob([JSON.stringify(this.getData(), null, "\t")], { type: "text/plain;charset=utf-8" });
                        FileSaver.saveAs(blob, "model.json");
                        return;
                    }
                    default: {
                        console.log("unhandled menu command");
                        return;
                    }
                }
            }
        }
        else {
            this.handleNeitherUndoNorRedo();
            switch (cmd.kind) {
                case "insp": {
                    return this.interpreteInspect(cmd.path);
                }
                case "move": {
                    return this.interpreteMoveElementToNode(cmd.epath, cmd.mpath, cmd.mindex);
                }
                case "copy": {
                    return this.interpreteCopyElementToNode(cmd.epath, cmd.mpath, cmd.mindex);
                }
                case "link": {
                    return this.interpreteLinkNodes(cmd.mpath, cmd.p, cmd.q);
                }
                case "edit-alternation": {
                    return this.interpreteEditAlternation(cmd.path);
                }
                case "edit-repetition": {
                    return this.interpreteEditRepetition(cmd.path);
                }
                case "edit-element": {
                    return this.interpreteEditElement(cmd.path);
                }
                case "edit-node": {
                    return this.interpreteEditNode(cmd.path, cmd.index);
                }
                case "redef": {
                    return this.interpreteRedefineElement(cmd.oldName, cmd.newName, cmd.def);
                }
                case "define": {
                    return this.interpreteDefineElement(cmd.name, cmd.def);
                }
                default: {
                    console.log(cmd);
                    return;
                }
            }
        }
    }
    interpreteInspect(path) {
        const r = new Utility_1.StandardRider(this.data.root, path);
        const name = r.getElementContent().name;
        // this.namespaceVr.setData({
        //     ns: this.data.namespace,
        //     elem: name
        // })
        this.namespaceVr.handle({
            kind: "focus",
            name: name
        });
    }
    interpreteMoveElementToNode(ePath, nPath, nindex) {
        const root1 = this.getData().root;
        if (JSUtility_1.equal(ePath.slice(0, ePath.length - 1), nPath)) {
            // same parent
            const parentPath = nPath;
            const eindex = ePath[ePath.length - 1];
            const m = new Utility_1.StandardRider(root1, parentPath).getModule();
            const e = m[eindex];
            m.splice(eindex, 1);
            m.splice((nindex <= eindex) ? nindex : (nindex - 1), 0, e);
        }
        else {
            const rider = new Utility_1.StandardRider(root1, ePath.slice(0, ePath.length - 1));
            const m = rider.getModule();
            const eindex = ePath[ePath.length - 1];
            const e = m[eindex];
            m.splice(eindex, 1);
            rider.go(nPath);
            rider.getModule().splice(nindex, 0, e);
        }
        this.setData({
            namespace: this.data.namespace,
            root: root1
        });
    }
    interpreteCopyElementToNode(ePath, nPath, nindex) {
        const data = this.getData();
        const root1 = data.root;
        if (JSUtility_1.equal(ePath.slice(0, ePath.length - 1), nPath)) {
            // same parent
            const parentPath = nPath;
            const eindex = ePath[ePath.length - 1];
            const m = new Utility_1.StandardRider(root1, parentPath).getModule();
            const e = m[eindex];
            m.splice(nindex, 0, e);
        }
        else {
            const rider = new Utility_1.StandardRider(root1, ePath);
            const e = rider.getItem();
            rider.go(nPath);
            rider.getModule().splice(nindex, 0, e);
        }
        this.setData({
            namespace: data.namespace,
            root: root1
        });
    }
    interpreteLinkNodes(path, p, q) {
        const data = this.getData();
        const root1 = data.root;
        const rider = new Utility_1.StandardRider(root1, path);
        const module = rider.getModule();
        const piece = module.slice(JSUtility_1.min(p, q), JSUtility_1.max(p, q));
        const item = ((p < q)
            ? { kind: "alternation", psubs: [{ prob: 0.5, mod: piece }, { prob: 0.5, mod: [] }] }
            : { kind: "repetition", prob: 0.5, sub: piece });
        module.splice(JSUtility_1.min(p, q), Math.abs(p - q), item);
        return this.setData({
            namespace: data.namespace,
            root: root1
        });
    }
}
exports.ModelEditor = ModelEditor;


/***/ }),

/***/ "./src/ModuleViewer.ts":
/*!*****************************!*\
  !*** ./src/ModuleViewer.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSUtility_1 = __webpack_require__(/*! ./utility/JSUtility */ "./src/utility/JSUtility.ts");
const Snap = __webpack_require__(/*! snapsvg */ "snapsvg");
const widget_1 = __webpack_require__(/*! ./widget */ "./src/widget.ts");
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const Utility_1 = __webpack_require__(/*! ./SMDL/Utility */ "./src/SMDL/Utility.ts");
class ModuleViewer extends Widget_1.Controller {
    constructor(container) {
        super(container);
        this.svg = html_1.HTML.ref("viewer");
        this.paper = Snap(this.svg);
    }
    displayData(container, data) {
        this.paper.clear();
        const go = renderModel(this.paper, data, {
            onDoubleClick: (path) => {
                // snap cannot distinguish click and double click
                // switch (path.kind) {
                //     case "element": {
                //         this.send({
                //             kind: "insp",
                //             path: path.path
                //         });
                //         return;
                //     }
                // }
            },
            onClick: (path) => {
                switch (path.kind) {
                    case "node": {
                        return this.send({
                            kind: "edit-node",
                            path: path.path,
                            index: path.index
                        });
                    }
                    case "element": {
                        return this.send({
                            kind: "edit-element",
                            path: path.path
                        });
                    }
                    case "alternation": {
                        this.send({
                            kind: "edit-alternation",
                            path: path.path
                        });
                        return;
                    }
                    case "repetition": {
                        this.send({
                            kind: "edit-repetition",
                            path: path.path
                        });
                        return;
                    }
                    default: {
                        return;
                    }
                }
            },
            onDragStart: (path) => { },
            onDrop: (path1, path2, ctrlPressed) => {
                if (path2 === null) {
                    return;
                }
                else if (path1.kind === "element" && path2.kind === "node") {
                    if (ctrlPressed) {
                        return this.send({
                            kind: "copy",
                            epath: path1.path,
                            mpath: path2.path,
                            mindex: path2.index
                        });
                    }
                    else {
                        return this.send({
                            kind: "move",
                            epath: path1.path,
                            mpath: path2.path,
                            mindex: path2.index
                        });
                    }
                }
                else if (path1.kind === "node" && path2.kind === "node") {
                    if (JSUtility_1.equal(path1.path, path2.path) && path1.index !== path2.index) {
                        return this.send({
                            kind: "link",
                            mpath: path1.path,
                            p: path1.index,
                            q: path2.index
                        });
                    }
                }
                else {
                    return;
                }
            }
        });
        this.svg.setAttribute("width", go.w.toString());
        this.svg.setAttribute("height", (go.a + go.d).toString());
    }
}
exports.ModuleViewer = ModuleViewer;
function renderModel(paper, m, hg) {
    function profaneHandlerGroup(path) {
        return {
            onDoubleClick: () => {
                hg.onDoubleClick(path);
            },
            onClick: () => {
                hg.onClick(path);
            },
            onDragStart: () => {
                hg.onDragStart(path);
            },
            onDrop: (node, ctrlPressed) => {
                let attr;
                if (node instanceof SVGElement && (attr = node.getAttribute("smdl-path"))) {
                    const path1 = JSON.parse(attr);
                    hg.onDrop(path, path1, ctrlPressed);
                    return;
                }
                else {
                    // hg.onDrop(path, null, ctrlPressed);
                    return;
                }
            }
        };
    }
    function renderModule(paper, rider) {
        paper.attr({
            "stroke": "black",
            "fill": "black"
        });
        const subs = rider.getChildRiders().map((rider) => {
            return renderModuleItem(paper.g(), rider);
        });
        const a = subs.length == 0 ? 30 : JSUtility_1.maxof(subs.map((s) => s.a));
        const d = subs.length == 0 ? 30 : JSUtility_1.maxof(subs.map((s) => s.d));
        const len = 60;
        let w = 0;
        let n = 0;
        const pushInternalElements = (w, pos) => {
            paper.line(w, a, w + len, a);
            // little triangle
            paper.path(Snap.format("M{x},{y} l-10,-5 v10", {
                "x": w + len,
                "y": a
            })).attr({
                "fill": "black"
            });
            const path = {
                kind: "node",
                path: rider.getPath(),
                index: n
            };
            widget_1.InternalBox(paper, JSON.stringify(path), w + len / 2, a, len / 8, profaneHandlerGroup(path));
        };
        pushInternalElements(w, 0);
        w += len;
        n++;
        for (const x of subs) {
            // childElements.push(transloc(x.node, w, a - x.a));
            x.node.transform(Snap.format("translate({x},{y})", {
                "x": w,
                "y": a - x.a
            }));
            w += x.w;
            pushInternalElements(w, n);
            w += len;
            n++;
        }
        return {
            a: a,
            d: d,
            w: w,
            node: paper
        };
    }
    function renderModuleItem(paper, rider) {
        switch (rider.getItemKind()) {
            case "element": {
                return renderElement(paper, rider);
            }
            case "alternation": {
                return renderAlternation(paper, rider);
            }
            case "repetition": {
                return renderRepetition(paper, rider);
            }
            default: {
                throw new Error();
            }
        }
    }
    function renderElement(paper, rider) {
        const renderMotif = (p, name, color) => {
            const w = 70;
            const h = 30;
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.PWMBox(paper, name, color, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            return {
                a: h / 2,
                d: h / 2,
                w: w,
                node: paper
            };
        };
        const renderGMotif = (p, name, color) => {
            const w = 100;
            const h = 30;
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.PWMBox(paper, name, color, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            // PWMBox(paper, name, color, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            return {
                a: h / 2,
                d: h / 2,
                w: w,
                node: paper
            };
        };
        const renderSpacer = (p, name) => {
            const w = 50;
            const h = 15;
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.SpacerBox(paper, name, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            return {
                a: h / 2,
                d: h / 2,
                w: w,
                node: paper
            };
        };
        const elem = rider.getElementContent();
        switch (elem.type) {
            case "motif": {
                return renderMotif(rider.getPath(), elem.name, elem.color);
            }
            case "g-motif": {
                return renderGMotif(rider.getPath(), elem.name, elem.color);
            }
            case "spacer": {
                return renderSpacer(rider.getPath(), elem.name);
            }
        }
    }
    function renderAlternation(paper, rider) {
        const leftPadding = 20;
        const rightPadding = 10;
        const topPadding = 10;
        const botPadding = 10;
        const interModulePadding = 15;
        const probLabelOffset = -3;
        const alter = rider.getAlternation();
        const subGOs = rider.getChildRiders().map((m) => renderModule(paper.g(), m));
        const subWidth = JSUtility_1.maxof(subGOs.map((go) => {
            return go.w;
        }));
        const subLayoutParas = [];
        let offsetY = topPadding;
        for (const [go, ps] of JSUtility_1.zip2(subGOs, alter.psubs)) {
            subLayoutParas.push({
                x0: leftPadding + (subWidth - go.w) / 2,
                x1: leftPadding + (subWidth + go.w) / 2,
                y: offsetY,
                z: offsetY + go.a,
                prob: ps.prob,
                elem: go.node
            });
            offsetY += go.a + go.d + interModulePadding;
        }
        const totalHeight = offsetY - interModulePadding + botPadding;
        const totalWidth = leftPadding + subWidth + rightPadding;
        const leftEnd = 0;
        const rightEnd = leftPadding + subWidth + rightPadding;
        for (const para of subLayoutParas) {
            // translate position
            paper.add(para.elem.transform(Snap.format("translate({x},{y})", {
                "x": para.x0,
                "y": para.y
            })));
            // left/right extension
            paper.line(leftEnd, para.z, para.x0, para.z);
            paper.line(para.x1, para.z, rightEnd, para.z);
        }
        // probability labels
        const pp = paper.g();
        const probs = subLayoutParas.map((para) => {
            return para.prob;
        });
        for (const para of subLayoutParas) {
            pp.text(leftEnd, para.z + probLabelOffset, para.prob.toFixed(3));
        }
        const jointTop = subGOs[0].a + topPadding;
        const jointBot = totalHeight - subGOs[subGOs.length - 1].d - botPadding;
        pp.line(leftEnd, jointTop, leftEnd, jointBot);
        pp.line(rightEnd, jointTop, rightEnd, jointBot);
        pp.hover(() => {
            pp.attr({
                "stroke": "blue",
                "fill": "blue"
            });
        }, () => {
            pp.attr({
                "stroke": "black",
                "fill": "black"
            });
        });
        pp.click(() => {
            hg.onClick({
                kind: "alternation",
                path: rider.getPath()
            });
        });
        return {
            a: totalHeight / 2,
            d: totalHeight / 2,
            w: totalWidth,
            node: paper
        };
    }
    function renderRepetition(paper, rider) {
        const rep = rider.getRepetition();
        const arrowHeight = 20;
        const padding = 5;
        const x = renderModule(paper.g(), rider.getChildRiders()[0]);
        x.node.transform(Snap.format("translate({x},{y})", {
            "x": padding,
            "y": arrowHeight
        }));
        const pp = paper.g();
        // reverse arrow
        pp.path(Snap.format("M{x},{y} v-{h} h{w} v{h}", {
            "x": padding / 2,
            "y": x.a + arrowHeight,
            "h": x.a + arrowHeight / 2,
            "w": x.w + padding
        })).attr({
            "fill": "none"
        });
        // triangle
        pp.path(Snap.format("M{x},{y} l-5,-10 h10", {
            "x": padding / 2,
            "y": x.a + arrowHeight - padding / 2
        }));
        // dots
        const dotRadius = padding / 2;
        pp.circle(dotRadius, x.a + arrowHeight, dotRadius);
        pp.circle(x.w + dotRadius * 3, x.a + arrowHeight, dotRadius);
        // probability label
        const labelX = x.w + dotRadius * 3;
        const labelY = x.a + arrowHeight - 10;
        pp.text(labelX, labelY, rep.prob.toFixed(3));
        pp.hover(() => {
            pp.attr({
                "stroke": "blue",
                "fill": "blue"
            });
        }, () => {
            pp.attr({
                "stroke": "black",
                "fill": "black"
            });
        });
        pp.click(() => {
            hg.onClick({
                kind: "repetition",
                path: rider.getPath()
            });
        });
        return {
            a: x.a + arrowHeight,
            d: x.d,
            w: x.w + 2 * padding,
            node: paper
        };
    }
    return renderModule(paper, new Utility_1.Rider(m));
}


/***/ }),

/***/ "./src/MotifEditor.ts":
/*!****************************!*\
  !*** ./src/MotifEditor.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const SeqLogo = __webpack_require__(/*! @baliga-lab/sequencelogo.js */ "./node_modules/@baliga-lab/sequencelogo.js/seqlogo.js");
const ColorEditor_1 = __webpack_require__(/*! ./Widget/ColorEditor */ "./src/Widget/ColorEditor.ts");
const DistributionEditor_1 = __webpack_require__(/*! ./DistributionEditor */ "./src/DistributionEditor.ts");
class PWMEditor extends Widget_1.Editor {
    displayData(container, data) {
        const buildTable = (pwm) => {
            const el = html_1.HTML.element("table", {
                "class": "w3-table-all w3-centered"
            });
            el.addEventListener("input", () => {
                this.emitDataChange();
            });
            const thEl = html_1.HTML.build({
                p: html_1.HTML.element("tr"),
                ch: ["A", "C", "G", "T"].map((n) => html_1.HTML.build({
                    p: html_1.HTML.element("th"),
                    ch: [n]
                }))
            });
            const rows = [];
            for (const r of pwm) {
                rows.push(html_1.HTML.build({
                    p: html_1.HTML.element("tr"),
                    ch: [r.A, r.C, r.G, r.T].map((n) => html_1.HTML.build({
                        p: html_1.HTML.element("td", {
                            "contenteditable": "true"
                        }),
                        ch: [n.toFixed(3)]
                    }))
                }));
            }
            const addRowBtn = html_1.HTML.element("div", {
                "class": "w3-button"
            }, { "display": "block" }, ["+"]);
            const delRowBtn = html_1.HTML.element("div", {
                "class": "w3-button"
            }, { "display": "block" }, ["-"]);
            const buttonRow = html_1.HTML.element("tr", {}, {}, [
                html_1.HTML.element("td", { "colspan": "2" }, { "padding": "0" }, [addRowBtn]),
                html_1.HTML.element("td", { "colspan": "2" }, { "padding": "0" }, [delRowBtn]),
            ]);
            addRowBtn.addEventListener("click", () => {
                const data = this.getData();
                this.setData(data.concat([{
                        A: 0.25,
                        C: 0.25,
                        G: 0.25,
                        T: 0.25,
                    }]));
            });
            delRowBtn.addEventListener("click", () => {
                const data = this.getData();
                this.setData(data.slice(0, data.length - 1));
            });
            return html_1.HTML.build({
                p: el,
                ch: [thEl].concat(rows, [buttonRow])
            });
        };
        this.tableEl = buildTable(data);
        html_1.HTML.inner(container, [this.tableEl]);
    }
    getData() {
        const rows = this.tableEl.rows;
        const pwm = [];
        for (let i = 1; i < rows.length - 1; i++) {
            // overlook header and button row
            pwm.push({
                A: parseFloat(rows[i].cells[0].innerText),
                C: parseFloat(rows[i].cells[1].innerText),
                G: parseFloat(rows[i].cells[2].innerText),
                T: parseFloat(rows[i].cells[3].innerText)
            });
        }
        return pwm;
    }
}
class SeqLogoViewer extends Widget_1.Viewer {
    constructor(container) {
        super(container);
        this.id = SeqLogoViewer.newID();
        const logoEl = html_1.HTML.element("div", { "id": this.id });
        html_1.HTML.inner(container, [logoEl]);
    }
    static newID() {
        SeqLogoViewer.count++;
        return "motif-viewer-canvas" + SeqLogoViewer.count.toString();
    }
    displayData(container, data) {
        function transformMotif(pwm) {
            return {
                alphabet: ["A", "C", "G", "T"],
                values: pwm.map((v) => [v.A, v.C, v.G, v.T])
            };
        }
        SeqLogo.makeLogo(this.id, transformMotif(data), {});
    }
}
SeqLogoViewer.count = 0;
class MotifEditor extends Widget_1.Editor {
    constructor(container) {
        super(container);
        this.colorEr = new ColorEditor_1.ColorEditor(html_1.HTML.box(), "Color");
        this.pwmEr = new PWMEditor(html_1.HTML.box());
        this.seqlogoVr = new SeqLogoViewer(html_1.HTML.box());
        html_1.HTML.inner(container, [this.colorEr.getDOM(), "PWM:", this.pwmEr.getDOM(), this.seqlogoVr.getDOM()]);
        this.pwmEr.registerHandler((data) => {
            this.seqlogoVr.setData(data);
        });
    }
    displayData(container, data) {
        this.colorEr.setData(data.color);
        this.pwmEr.setData(data.matrix);
        this.seqlogoVr.setData(data.matrix);
    }
    getData() {
        return {
            color: this.colorEr.getData(),
            matrix: this.pwmEr.getData()
        };
    }
}
exports.MotifEditor = MotifEditor;
class GMotifEditor extends Widget_1.Editor {
    constructor(container) {
        super(container);
        this.distEr = new DistributionEditor_1.DistributionEditor();
        this.colorEr = new ColorEditor_1.ColorEditor(html_1.HTML.box(), "Color");
        this.pwmEr = new PWMEditor(html_1.HTML.box());
        this.seqlogoVr = new SeqLogoViewer(html_1.HTML.box());
        html_1.HTML.inner(container, [this.distEr.getDOM(), this.colorEr.getDOM(), "PWM:", this.pwmEr.getDOM(), this.seqlogoVr.getDOM()]);
        this.pwmEr.registerHandler((data) => {
            this.seqlogoVr.setData(data);
        });
    }
    displayData(container, data) {
        this.distEr.setData(data.distribution);
        this.colorEr.setData(data.color);
        this.pwmEr.setData(data.matrix);
        this.seqlogoVr.setData(data.matrix);
    }
    getData() {
        return {
            distribution: this.distEr.getData(),
            color: this.colorEr.getData(),
            matrix: this.pwmEr.getData()
        };
    }
}
exports.GMotifEditor = GMotifEditor;


/***/ }),

/***/ "./src/NamespaceViewer.ts":
/*!********************************!*\
  !*** ./src/NamespaceViewer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const ElementEditor_1 = __webpack_require__(/*! ./ElementEditor */ "./src/ElementEditor.ts");
class NameListViewer extends Widget_1.Controller {
    displayData(container, data) {
        html_1.HTML.inner(container, data.map((elem) => {
            const e = html_1.HTML.element("div", {
                "class": "w3-button"
            }, {
                "border-bottom": "1px solid grey"
            }, [elem]);
            e.addEventListener("click", () => {
                this.send({
                    kind: "focus",
                    name: elem
                });
            });
            return e;
        }));
    }
}
class InspectorToolbar extends Widget_1.Controller {
    displayData(container, data) {
        html_1.HTML.inner(container, data.map((toolname) => {
            const e = html_1.HTML.element("button", {
                "class": "w3-button w3-border w3-small w3-teal"
            }, {}, [toolname]);
            e.addEventListener("click", () => {
                this.send(toolname);
            });
            return e;
        }));
    }
}
// class NamespaceViewer extends Controller<FocusableNamespace, NamespaceEditCmd> implements Controllee<string>, Controllee<FocusElement> {
class NamespaceViewer extends Widget_1.Controller {
    handleNewMotif() {
        const defineMotif = (name) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "motif",
                    color: "#ffffff",
                    matrix: []
                }
            });
        };
        const name = window.prompt("The name of the new motif:");
        if (name !== null) {
            defineMotif(name);
        }
    }
    handleNewGMotif() {
        const defineMotif = (name) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "g-motif",
                    distribution: { from: 0, probs: [1] },
                    color: "#ffffff",
                    matrix: []
                }
            });
        };
        const name = window.prompt("The name of the new g-motif:");
        if (name !== null) {
            defineMotif(name);
        }
    }
    handleNewSpacer() {
        const defineSpacer = (name) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "spacer",
                    distribution: { from: 0, probs: [1] },
                }
            });
        };
        const name = window.prompt("The name of the new spacer:");
        if (name !== null) {
            defineSpacer(name);
        }
    }
    constructor(container) {
        super(container);
        container.setAttribute("style", html_1.HTML.style({
            "display": "flex",
            "flex-direction": "row"
        }));
        const nameListEl = html_1.HTML.element("div", {
            "style": html_1.HTML.style({
                "flex-grow": "2",
                "width": "10em",
                "display": "flex",
                "flex-direction": "column"
            })
        });
        const toolbarEl = html_1.HTML.element("div", {
            "class": "w3-bar w3-teal"
        }, {
            "flex-shrink": "0",
            "padding": "0.2em"
        });
        const elementEl = html_1.HTML.element("div", {}, {
            "overflow-y": "scroll",
            "flex-grow": "2"
        });
        const newMotifEl = html_1.HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New Motif"]);
        newMotifEl.addEventListener("click", () => {
            this.handleNewMotif();
        });
        const newGMotifEl = html_1.HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New G-Motif"]);
        newGMotifEl.addEventListener("click", () => {
            this.handleNewGMotif();
        });
        const newSpacerEl = html_1.HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New Spacer"]);
        newSpacerEl.addEventListener("click", () => {
            this.handleNewSpacer();
        });
        html_1.HTML.build({
            p: container,
            ch: [
                {
                    p: html_1.HTML.element("div", {}, {
                        "display": "flex",
                        "flex-direction": "column"
                    }),
                    ch: [nameListEl, newMotifEl, newGMotifEl, newSpacerEl]
                },
                html_1.HTML.element("div", {}, {
                    "display": "flex",
                    "flex-direction": "column"
                }, [toolbarEl, elementEl])
            ]
        });
        // setup name list
        this.nameListViewer = new NameListViewer(nameListEl);
        this.nameListViewer.bind(this);
        // setup toolbar
        const toolbar = new InspectorToolbar(toolbarEl);
        toolbar.setData(["save", "reset", "delete"]);
        toolbar.bind(this);
        this.elementEditor = new ElementEditor_1.ElementEditor(elementEl);
    }
    handle(cmd) {
        console.log("NSViewer", cmd);
        if (typeof cmd === "string") {
            switch (cmd) {
                case "save": {
                    const data = this.getData();
                    const edata = this.elementEditor.getData();
                    return this.send({
                        kind: "redef",
                        oldName: this.focus,
                        newName: edata.name,
                        def: edata.def
                    });
                }
                case "reset": {
                    const data = this.getData();
                    return this.elementEditor.setData({
                        name: this.focus,
                        def: data[this.focus]
                    });
                }
                case "delete": {
                    return;
                }
                default: {
                    throw new Error();
                }
            }
        }
        else {
            // this.setData({
            //     ns: this.getData().ns,
            //     elem: cmd.name
            // });
            this.focus = cmd.name;
            this.displayData(this.dom, this.data);
        }
    }
    // displayData(container: HTMLElement, data: { ns: Namespace; elem: string; }): void {
    displayData(container, data) {
        const names = Object.keys(data).sort();
        if (this.focus && data[this.focus]) {
            this.nameListViewer.setData(names);
            this.elementEditor.setData({
                name: this.focus,
                def: data[this.focus]
            });
        }
        else {
            this.nameListViewer.setData(names);
        }
    }
}
exports.NamespaceViewer = NamespaceViewer;


/***/ }),

/***/ "./src/SMDL/Utility.ts":
/*!*****************************!*\
  !*** ./src/SMDL/Utility.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
class Rider {
    constructor(root, path = [], node) {
        this.root = root;
        if (node === undefined) {
            this.path = [];
            this.node = { kind: "module", module: root };
            this.go(path);
        }
        else {
            this.path = path;
            this.node = node;
        }
    }
    copy() {
        return new Rider(this.root, this.path);
    }
    up() {
        this.go(this.path.slice(0, this.path.length - 1));
    }
    go(path) {
        this.node = travel({
            kind: "module",
            module: this.root
        }, path);
        this.path = path;
    }
    getPath() {
        return this.path;
    }
    getNodeKind() {
        return this.node.kind;
    }
    getModule() {
        if (this.node.kind == "module") {
            return this.node.module;
        }
        else {
            throw new Error("not a module");
        }
    }
    getItem() {
        if (this.node.kind == "item") {
            return this.node.item;
        }
        else {
            throw new Error("not an item");
        }
    }
    getAlternation() {
        const item = this.getItem();
        if (item.kind === "alternation") {
            return item;
        }
        else {
            throw new Error("not an alternation");
        }
    }
    getRepetition() {
        const item = this.getItem();
        if (item.kind === "repetition") {
            return item;
        }
        else {
            throw new Error("not a rep");
        }
    }
    getItemKind() {
        return this.getItem().kind;
    }
    isElement() {
        return this.getNodeKind() == "item" && this.getItem().kind == "element";
    }
    getElementContent() {
        const it = this.getItem();
        if (it.kind == "element") {
            return it;
        }
        else {
            throw new Error();
        }
    }
    getChildRiders() {
        const node = this.node;
        if (node.kind == "module") {
            const m = node.module;
            let n = 0;
            return m.map((item, index) => {
                const node = { kind: "item", item: item };
                const path = this.path.concat([index]);
                return new Rider(this.root, path, node);
            });
        }
        else if (node.kind == "item") {
            const t = node.item;
            if (t.kind == "element") {
                throw new Error("elementary node has no child node");
            }
            else if (t.kind == "alternation") {
                return t.psubs.map((ps, i) => {
                    const m = ps.mod;
                    return new Rider(this.root, this.path.concat([i]), { kind: "module", module: m });
                });
            }
            else if (t.kind == "repetition") {
                return [
                    new Rider(this.root, this.path.concat([0]), { kind: "module", module: t.sub })
                ];
            }
            else {
                throw new Error("bad item node");
            }
        }
        else {
            throw new Error("bad node");
        }
    }
}
exports.Rider = Rider;
class StandardRider extends Rider {
}
exports.StandardRider = StandardRider;
;
function travel(node, path) {
    for (let i = 0; i < path.length; i++) {
        const n = path[i];
        if (node.kind == "module") {
            const m = node.module;
            node = { kind: "item", item: m[n] };
            continue;
        }
        else if (node.kind == "item") {
            const t = node.item;
            switch (t.kind) {
                case "element": {
                    throw new Error("elementary node has no child node");
                }
                case "alternation": {
                    node = { kind: "module", module: t.psubs[n].mod };
                    continue;
                }
                case "repetition": {
                    if (n === 0) {
                        node = { kind: "module", module: t.sub };
                        continue;
                    }
                    else {
                        throw new Error("bad index");
                    }
                }
            }
        }
        else {
            throw new Error("bad node");
        }
    }
    return node;
}
function transformModule(m, p) {
    return m.map((t) => {
        switch (t.kind) {
            case "element": {
                const sign = { kind: "element" };
                return Object.assign(p(t), sign);
            }
            case "alternation": {
                return {
                    kind: "alternation",
                    psubs: t.psubs.map((ps) => {
                        return {
                            prob: ps.prob,
                            mod: transformModule(ps.mod, p)
                        };
                    })
                };
            }
            case "repetition": {
                return {
                    kind: "repetition",
                    prob: t.prob,
                    sub: transformModule(t.sub, p)
                };
            }
        }
    });
}
exports.transformModule = transformModule;


/***/ }),

/***/ "./src/SpacerEditor.ts":
/*!*****************************!*\
  !*** ./src/SpacerEditor.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget/Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
const DistributionEditor_1 = __webpack_require__(/*! ./DistributionEditor */ "./src/DistributionEditor.ts");
;
class SpacerEditor extends Widget_1.Editor {
    constructor(container) {
        super(container);
        const nameEdEl = html_1.HTML.box();
        const distEdEl = html_1.HTML.box();
        const distEd = new DistributionEditor_1.DistributionEditor(distEdEl);
        this.distEd = distEd;
        html_1.HTML.build({
            p: container,
            ch: [this.distEd.getDOM()]
        });
    }
    displayData(container, data) {
        this.distEd.setData(data.distribution);
    }
    getData() {
        return {
            distribution: this.distEd.getData()
        };
    }
}
exports.SpacerEditor = SpacerEditor;


/***/ }),

/***/ "./src/Widget/Button.ts":
/*!******************************!*\
  !*** ./src/Widget/Button.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ../html */ "./src/html.ts");
class ButtonBase extends Widget_1.Viewer {
    init() {
        super.init();
        this.buttonEl = html_1.HTML.element("button", {}, {});
        html_1.HTML.b({
            p: this.getDOM(),
            ch: [this.buttonEl]
        });
    }
    displayData(container, data) {
        html_1.HTML.b({
            p: this.buttonEl,
            ch: [data.label]
        });
    }
}
class Button extends Widget_1.$Controller(ButtonBase) {
    init() {
        super.init();
        this.buttonEl.addEventListener("click", () => {
            this.send({
                kind: "button",
                message: this.getData().message
            });
        });
    }
}
exports.Button = Button;
// class Button extends Viewer<ButtonData> implements Controller_<Cmd> {
//     displayData(container: HTMLElement, data: ButtonData): void {
//         const btn = HTML.element("button", {}, {}, [data.label]);
//         btn.addEventListener("click", () => {
//             this.send({
//                 kind: "button",
//                 message: data.message
//             });
//         });
//         HTML.inner(container, [btn]);
//     }
// }


/***/ }),

/***/ "./src/Widget/ColorEditor.ts":
/*!***********************************!*\
  !*** ./src/Widget/ColorEditor.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = __webpack_require__(/*! ../html */ "./src/html.ts");
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.ts");
class ColorEditor extends Widget_1.Editor {
    constructor(container, label) {
        super(container);
        this.inputElement = html_1.HTML.element("input", {
            "type": "color"
        });
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
        label = label ? (label + ": ") : "";
        html_1.HTML.build({
            p: container,
            ch: [
                {
                    p: html_1.HTML.element("label"),
                    ch: [label, this.inputElement]
                }
            ]
        });
    }
    displayData(container, data) {
        this.inputElement.value = data;
    }
    getData() {
        return this.inputElement.value;
    }
}
exports.ColorEditor = ColorEditor;


/***/ }),

/***/ "./src/Widget/Pile.ts":
/*!****************************!*\
  !*** ./src/Widget/Pile.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ../html */ "./src/html.ts");
class Pile extends Widget_1.Frame {
    position(container, children) {
        html_1.HTML.b({
            p: container,
            ch: [{
                    p: {
                        tag: "div",
                        style: {
                            "display": "flex",
                            "flex-direction": "column"
                        }
                    },
                    ch: children.map((c) => {
                        return c.getDOM();
                    })
                }]
        });
    }
}
exports.Pile = Pile;
class HPile extends Widget_1.Frame {
    position(container, children) {
        html_1.HTML.b({
            p: container,
            ch: [{
                    p: {
                        tag: "div",
                        style: {
                            "display": "flex",
                            "flex-direction": "row"
                        }
                    },
                    ch: children.map((c) => {
                        return c.getDOM();
                    })
                }]
        });
    }
}
exports.HPile = HPile;


/***/ }),

/***/ "./src/Widget/StringEditor.ts":
/*!************************************!*\
  !*** ./src/Widget/StringEditor.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.ts");
const html_1 = __webpack_require__(/*! ../html */ "./src/html.ts");
class StringEditor extends Widget_1.Editor {
    constructor(...x) {
        super(...x);
        const container = this.getDOM();
        this.inputElement = html_1.HTML.element("input", {
            "type": "text"
        });
        this.labelTextElement = html_1.HTML.element("span");
        html_1.HTML.build({
            p: container,
            ch: [{
                    p: html_1.HTML.element("label"),
                    ch: [this.labelTextElement, this.inputElement]
                }]
        });
    }
    displayData(container, data) {
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
        if (typeof data === "string") {
            html_1.HTML.inner(this.labelTextElement, []);
            this.inputElement.value = data;
        }
        else {
            html_1.HTML.inner(this.labelTextElement, [data.label + ": "]);
            this.inputElement.value = data.content;
        }
    }
    getData() {
        return this.inputElement.value;
    }
}
exports.StringEditor = StringEditor;


/***/ }),

/***/ "./src/Widget/Utility.ts":
/*!*******************************!*\
  !*** ./src/Widget/Utility.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = __webpack_require__(/*! ../html */ "./src/html.ts");
function popup(widget, handlers) {
    const box = html_1.HTML.b({
        tag: "div",
        style: {
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        },
        ch: [
            {
                tag: "div",
                style: {
                    "background-color": "white",
                    "border": "1px solid black",
                    "padding": "1em"
                },
                ch: [widget.getDOM()]
            }
        ]
    });
    const close = () => {
        html_1.HTML.body().removeChild(box);
        handlers.onclose();
    };
    box.addEventListener("click", (e) => {
        if (e.target === box) {
            close();
        }
    });
    html_1.HTML.body().appendChild(box);
    return new (class {
        handle(cmd) {
            close();
        }
    });
}
exports.popup = popup;
function confirm(widget, handlers) {
    const okButton = html_1.HTML.e({
        tag: "button",
        attr: {
            "type": "button"
        },
        style: {
            "color": "green",
            "width": "100%"
        },
        ch: ["OK"]
    });
    const box = html_1.HTML.b({
        tag: "div",
        style: {
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        },
        ch: [
            {
                tag: "div",
                style: {
                    "background-color": "white",
                    "border": "1px solid black",
                    "padding": "1em"
                },
                ch: [
                    widget.getDOM(),
                    okButton
                ]
            }
        ]
    });
    const remove = () => {
        html_1.HTML.body().removeChild(box);
    };
    const close = () => {
        remove();
        handlers.cancel();
    };
    okButton.addEventListener("click", () => {
        remove();
        handlers.ok();
    });
    box.addEventListener("click", (e) => {
        if (e.target === box) {
            close();
        }
    });
    html_1.HTML.body().appendChild(box);
    return new (class {
        handle(cmd) {
            close();
        }
    });
}
exports.confirm = confirm;


/***/ }),

/***/ "./src/Widget/Widget.ts":
/*!******************************!*\
  !*** ./src/Widget/Widget.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Widget {
    constructor(root) {
        this.dom = root || document.createElement("div");
        this.init();
    }
    init() {
        // for those who want to initialize without overriding constructor procedure
    }
    getDOM() {
        return this.dom;
    }
}
exports.Widget = Widget;
class Frame extends Widget {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    setChildren(children) {
        this.children = children;
        this.position(this.getDOM(), children);
    }
    getChildren() {
        return this.children.slice(0, this.children.length);
    }
}
exports.Frame = Frame;
class Viewer extends Widget {
    constructor() {
        super(...arguments);
        this.dataSetted = false;
    }
    setData(data) {
        this.dataSetted = true;
        this.data = data;
        this.displayData(this.dom, this.data);
    }
    getData() {
        if (this.dataSetted) {
            return JSON.parse(JSON.stringify(this.data));
        }
        else {
            throw new Error("tried getting data before initialization");
        }
    }
}
exports.Viewer = Viewer;
class Editor extends Viewer {
    constructor() {
        super(...arguments);
        this.dataChangeHandlers = new Set();
    }
    registerHandler(handler) {
        this.dataChangeHandlers.add(handler);
    }
    cancelHandler(handler) {
        this.dataChangeHandlers.delete(handler);
    }
    setData(data) {
        super.setData(data);
        this.emitDataChange();
    }
    emitDataChange() {
        const data = this.getData();
        for (const handler of this.dataChangeHandlers) {
            handler(data);
        }
    }
}
exports.Editor = Editor;
class Controller extends Viewer {
    constructor() {
        super(...arguments);
        this.eeSet = new Set();
    }
    bind(ee) {
        this.eeSet.add(ee);
    }
    send(cmd) {
        for (const ee of this.eeSet) {
            ee.handle(cmd);
        }
    }
}
exports.Controller = Controller;
// function $Controller<BaseClass extends Widget, Command>(W: classof<BaseClass>): classof<BaseClass & Controller_<Command>> {
function $Controller(bcc) {
    return class extends bcc {
        constructor() {
            super(...arguments);
            this.eeSet = new Set();
        }
        bind(ee) {
            this.eeSet.add(ee);
        }
        send(cmd) {
            for (const ee of this.eeSet) {
                ee.handle(cmd);
            }
        }
    };
}
exports.$Controller = $Controller;


/***/ }),

/***/ "./src/html.ts":
/*!*********************!*\
  !*** ./src/html.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSUtility_1 = __webpack_require__(/*! ./utility/JSUtility */ "./src/utility/JSUtility.ts");
const svg_1 = __webpack_require__(/*! ./utility/svg */ "./src/utility/svg.ts");
function buildChild(block) {
    if (block instanceof Node) {
        return block;
    }
    else if (typeof block == "string") {
        return HTML.text(block);
    }
    else {
        const pEl = block.p;
        for (const c of block.ch) {
            pEl.appendChild(buildChild(c));
        }
        return pEl;
    }
}
class HTML {
    static body() {
        return document.getElementsByTagName("body")[0];
    }
    static svg() {
        return svg_1.SVG.svg();
    }
    static e(s) {
        const tag = s.tag;
        const attr = s.attr || {};
        const style = s.style || {};
        const ch = s.ch || [];
        const elem = document.createElement(tag);
        for (const key in attr) {
            elem.setAttribute(key, attr[key]);
        }
        elem.setAttribute("style", HTML.style(style) + (elem.getAttribute("style") || ""));
        elem.innerHTML = "";
        for (const c of ch) {
            elem.appendChild(HTML.b(c));
        }
        return elem;
    }
    static b(bb) {
        function bChild(bb) {
            if (bb instanceof Node) {
                return bb;
            }
            else if (typeof bb == "string") {
                return HTML.text(bb);
            }
            else if ("tag" in bb) {
                return HTML.e(bb);
            }
            else if ("p" in bb) {
                const p = bb.p;
                const pEl = (p instanceof HTMLElement) ? p : HTML.e(p);
                pEl.innerHTML = "";
                for (const c of bb.ch) {
                    pEl.appendChild(bChild(c));
                }
                return pEl;
            }
            else {
                throw new Error();
            }
        }
        if (typeof bb == "string") {
            const spanEl = HTML.element("span");
            spanEl.appendChild(HTML.text(bb));
            return spanEl;
        }
        else if (bb instanceof HTMLElement) {
            return bb;
        }
        else if (bb instanceof Node) {
            const divEl = HTML.element("div");
            divEl.appendChild(bb);
            return divEl;
        }
        else if ("tag" in bb) {
            return HTML.e(bb);
        }
        else if ("p" in bb) {
            const p = bb.p;
            const pEl = (p instanceof HTMLElement) ? p : HTML.e(p);
            pEl.innerHTML = "";
            for (const c of bb.ch) {
                pEl.appendChild(bChild(c));
            }
            return pEl;
        }
        else {
            throw new Error();
        }
    }
    static box() {
        return HTML.element("div");
    }
    static ref(id) {
        const e = document.getElementById(id);
        if (e === null) {
            throw new Error(id + " is not defined");
        }
        else {
            return e;
        }
    }
    static style(s) {
        return Object.keys(s).map((k) => JSUtility_1.format("%: %", k, s[k])).join("; ") + "; ";
    }
    static element(tag, attr = {}, style = {}, children = []) {
        const e = document.createElement(tag);
        for (const key in attr) {
            e.setAttribute(key, attr[key]);
        }
        e.setAttribute("style", HTML.style(style) + (e.getAttribute("style") || ""));
        e.innerHTML = "";
        for (const c of children) {
            e.appendChild(buildChild(c));
        }
        return e;
    }
    static inner(parent, children) {
        HTML.build({
            p: parent,
            ch: children
        });
    }
    static build(block) {
        if (typeof block == "string") {
            const spanEl = HTML.element("span");
            spanEl.appendChild(HTML.text(block));
            return spanEl;
        }
        else if (block instanceof HTMLElement) {
            return block;
        }
        else if (block instanceof Node) {
            const divEl = HTML.element("div");
            divEl.appendChild(block);
            return divEl;
        }
        else {
            const pEl = block.p;
            pEl.innerHTML = "";
            for (const c of block.ch) {
                pEl.appendChild(buildChild(c));
            }
            return pEl;
        }
    }
    static text(content) {
        return document.createTextNode(content);
    }
    static span(content, style = {}) {
        return HTML.e({
            tag: "span",
            style: style,
            ch: [content]
        });
    }
    static group(x) {
        // TODO
        return HTML.element("div");
    }
}
exports.HTML = HTML;
;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ModelEditor_1 = __webpack_require__(/*! ./ModelEditor */ "./src/ModelEditor.ts");
const html_1 = __webpack_require__(/*! ./html */ "./src/html.ts");
// requestResource("GET", "./etc/sample_module.json", "json", (mod: Model) => {
//     const editor = new ModelEditor(HTML.ref("main"));
//     editor.setData(mod);
// });
const editor = new ModelEditor_1.ModelEditor(html_1.HTML.ref("main"));
editor.setData({
    namespace: {},
    root: []
});
// animation example
// const s = Snap("#example");
// const c = s.circle(50, 50, 30);
// c.drag(
//     (dx, dy, x, y, e)=>{
//         const elem = Snap.getElementByPoint(x, y);
//         if (elem !== c) {
//             elem.animate({
//                 "r": 60
//             }, 100);
//         }
//         console.log("move");
//     },
//     (x, y, e)=>{
//         console.log("started");
//     },
//     (e) => {
//         console.log(e);
//     }
// );
// const c1 = s.circle(150, 50, 30);
// c1.mouseout((e)=>{
//     c1.animate({
//         "r": 30
//     }, 100);
// })


/***/ }),

/***/ "./src/utility/JSUtility.ts":
/*!**********************************!*\
  !*** ./src/utility/JSUtility.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sum = (...nums) => {
    let s = 0;
    for (let n of nums) {
        s += n;
    }
    return s;
};
exports.sum = sum;
const max = Math.max;
exports.max = max;
const min = Math.min;
exports.min = min;
const maxof = (a) => max(...a);
exports.maxof = maxof;
const minof = (a) => min(...a);
exports.minof = minof;
const format = (temp, ...fill) => {
    let result = "";
    let i = 0;
    let j = 0;
    while (i < temp.length) {
        if (temp[i] == "%") {
            result += fill[j];
            j++;
            i++;
        }
        else {
            result += temp[i];
            i++;
        }
    }
    return result;
};
exports.format = format;
const later = (p) => {
    setTimeout(p, 100);
};
exports.later = later;
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
exports.assert = assert;
function dummy() {
    return;
}
exports.dummy = dummy;
function equal(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
exports.equal = equal;
function enumerate(ls) {
    const items = [];
    for (const [i, x] of Array.from(ls).entries()) {
        items.push({
            i: i,
            x: x
        });
    }
    ;
    return items;
}
exports.enumerate = enumerate;
function zip2(ls0, ls1) {
    const lim = min(ls0.length, ls1.length);
    const ls = [];
    for (let i = 0; i < lim; i++) {
        ls.push([ls0[i], ls1[i]]);
    }
    return ls;
}
exports.zip2 = zip2;
function zip(...ls) {
    if (ls.length === 0) {
        return [];
    }
    else {
        const ls1 = ls[0];
        const r = [];
        for (let i = 0; i < ls1.length; i++) {
            if (ls.every((l) => i < l.length)) {
                r.push(ls.map(x => x[i]));
            }
            else {
                break;
            }
        }
        return r;
    }
}
exports.zip = zip;
function requestFile(callback) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.addEventListener("change", () => {
        const fileList = inputElement.files;
        callback(fileList ? fileList[0] : null);
    });
    inputElement.click();
}
exports.requestFile = requestFile;


/***/ }),

/***/ "./src/utility/svg.ts":
/*!****************************!*\
  !*** ./src/utility/svg.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVG;
(function (SVG) {
    SVG.namespace = "http://www.w3.org/2000/svg";
    function elem(tag, as = {}) {
        const e = document.createElementNS(SVG.namespace, tag);
        attr(e, as);
        return e;
    }
    SVG.elem = elem;
    function attr(e, as) {
        for (const key of Object.keys(as)) {
            e.setAttributeNS("", key, as[key] + "");
        }
        return;
    }
    SVG.attr = attr;
    function svg(attr = {}) {
        return elem("svg", attr);
    }
    SVG.svg = svg;
    function build(n) {
        if (n instanceof SVGElement) {
            return n;
        }
        else if (typeof n === "string" || typeof n === "number") {
            const e = elem("tspan");
            e.appendChild(document.createTextNode(n + ""));
            return e;
        }
        else if ("tag" in n) {
            return elem(n.tag, n.attr || {});
        }
        else if ("p" in n) {
            const p = build(n.p);
            p.innerHTML = "";
            for (const c of n.ch) {
                p.appendChild(build(c));
            }
            return p;
        }
        else {
            // n is never;
            console.log(n);
            throw new Error(n);
        }
    }
    SVG.build = build;
})(SVG = exports.SVG || (exports.SVG = {}));


/***/ }),

/***/ "./src/widget.ts":
/*!***********************!*\
  !*** ./src/widget.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSUtility_1 = __webpack_require__(/*! ./utility/JSUtility */ "./src/utility/JSUtility.ts");
const Snap = __webpack_require__(/*! snapsvg */ "snapsvg");
function registerHandlers(paper, handlerGroup) {
    let lastElement = null;
    paper.drag((dx, dy, x, y, e) => {
        const elem = Snap.getElementByPoint(e.clientX, e.clientY);
        lastElement = elem === null ? null : elem.node;
    }, (x, y, e) => {
        handlerGroup.onDragStart();
        const elem = Snap.getElementByPoint(e.clientX, e.clientY);
        lastElement = elem === null ? null : elem.node;
    }, (e) => {
        if (lastElement) {
            handlerGroup.onDrop(lastElement, e.ctrlKey);
        }
    });
    paper.click(handlerGroup.onClick);
    // paper.dblclick(handlerGroup.onDoubleClick);
}
function registerHoverHandlers(paper, hg) {
    paper.hover(hg.enter, hg.leave);
}
// function registerHover(paper: Paper, attr: { [key: string]: string }): void {
//     let oldAttr: { [key: string]: string };
//     paper.hover(
//         () => {
//             oldAttr = {};
//             for (const key of Object.keys(attr)) {
//                 console.log(key, paper.attr("stroke"));
//                 oldAttr[key] = paper.attr(key);
//             }
//             paper.attr(attr);
//         },
//         () => {
//             paper.attr(oldAttr);
//         }
//     );
// }
function InternalBox(paper, pathString, x, y, radius, handlerGroup) {
    paper = paper.g();
    const c = paper.circle(x, y, radius).attr({
        "fill": "white",
        "stroke": "black",
        "smdl-path": pathString
    });
    c.hover(() => {
        c.animate({
            "r": (radius * 1.5).toString()
        }, 100);
    }, () => {
        c.animate({
            "r": radius.toString()
        }, 100);
    });
    registerHandlers(paper, handlerGroup);
}
exports.InternalBox = InternalBox;
function SpacerBox(paper, label, pathString, width, height, handlerGroup) {
    paper = paper.g();
    const r = paper.rect(0, 0, width, height).attr({
        "stroke": "white",
        "fill": "white",
        "smdl-path": pathString
    });
    const p = paper.path(Snap.format("M0,0 V{h} M{w},0 V{h}", {
        "w": width,
        "h": height
    })).attr({
        "pointer-events": "none"
    });
    paper.text(width / 2, height / 2, label).attr({
        "stroke": "black",
        "fill": "black",
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.6
    });
    registerHandlers(paper, handlerGroup);
    r.hover(() => {
        p.attr({
            "stroke": "blue"
        });
    }, () => {
        p.attr({
            "stroke": "black"
        });
    });
}
exports.SpacerBox = SpacerBox;
function PWMBox(paper, label, color, pathString, width, height, handlerGroup) {
    function bgdColorToLabelColor(color) {
        const clr = Snap.color(color);
        const lightness = clr.l;
        return (lightness < 0.5) ? "white" : "black";
    }
    paper = paper.g();
    const r = paper.rect(0, 0, width, height, JSUtility_1.min(width / 3, height / 3)).attr({
        "stroke": "none",
        "fill": color,
        "smdl-path": pathString
    });
    const labelColor = bgdColorToLabelColor(color);
    paper.text(width / 2, height / 2, label).attr({
        "stroke": labelColor,
        "fill": labelColor,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.6
    });
    registerHandlers(paper, handlerGroup);
    r.hover(() => {
        r.attr({
            "stroke": "blue"
        });
    }, () => {
        r.attr({
            "stroke": "none"
        });
    });
}
exports.PWMBox = PWMBox;


/***/ }),

/***/ "snapsvg":
/*!***********************!*\
  !*** external "Snap" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Snap;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map