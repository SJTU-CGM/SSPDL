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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
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

/***/ "./src/CSV.ts":
/*!********************!*\
  !*** ./src/CSV.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CSV;
(function (CSV) {
    function parseField(f) {
        f = f.trim();
        if (parseFloat(f) !== NaN) {
            return parseFloat(f);
        }
        else {
            return f;
        }
    }
    function parse(txt) {
        const lines = txt.trim().split("\n");
        const header = lines[0];
        const fieldNames = header.split(',');
        const lineToRecord = (line) => {
            const fields = line.split(',');
            const record = {};
            fieldNames.forEach((fn, i) => {
                record[fn] = parseField(fields[i]);
            });
            return record;
        };
        return {
            head: fieldNames,
            body: lines.slice(1).map(lineToRecord)
        };
    }
    CSV.parse = parse;
    function dump(csv) {
        const lines = [];
        // head
        lines.push(csv.head.join(','));
        // body
        for (const r of csv.body) {
            const fields = [];
            for (const fn of csv.head) {
                fields.push(r[fn]);
            }
            lines.push(fields.join(','));
        }
        return lines.join('\n');
    }
    CSV.dump = dump;
})(CSV = exports.CSV || (exports.CSV = {}));


/***/ }),

/***/ "./src/Components/BackgroundDistributionEditor.tsx":
/*!*********************************************************!*\
  !*** ./src/Components/BackgroundDistributionEditor.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const Utility_1 = __webpack_require__(/*! ../Widget/Utility */ "./src/Widget/Utility.tsx");
const NumberEditor_1 = __webpack_require__(/*! ../Widget/NumberEditor */ "./src/Widget/NumberEditor.tsx");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
class BackgroundDistributionEditor extends Widget_1.Editor {
    makeContainer() {
        return (JSXFactory.createElement("div", { style: {
                "border-bottom": "1px solid black",
                "display": "flex",
                "flex-direction": "row",
                "padding-left": "0.5ex",
                "padding-right": "0.5ex"
            } }));
    }
    displayData(data, minor) {
        const alphabet = minor.alphabet;
        const content = alphabet.map((code) => {
            return (JSXFactory.createElement("span", null,
                JSXFactory.createElement("strong", null, code),
                ": ",
                data[code],
                "; "));
        });
        const btn = JSXFactory.createElement("span", { style: { "color": "blue", cursor: "pointer" } }, "Edit");
        JSXFactory.render(this.getDOM(), (JSXFactory.createElement("span", null, "Background Distribution: ")), JSXFactory.createElement("span", { style: { "flex-grow": "1" } }, content), btn);
        btn.addEventListener("click", () => {
            const ed = new BEditor();
            ed.initData(data, minor);
            Utility_1.ask(ed, {
                cancel: () => { },
                ok: () => {
                    const d = ed.getMajorData();
                    if (JSUtility_1.sum(...alphabet.map((code) => d[code])) === 1) {
                        this.updateMajorData(ed.getMajorData());
                    }
                    else {
                        alert("Invalid background distribution");
                    }
                }
            });
        });
    }
}
exports.BackgroundDistributionEditor = BackgroundDistributionEditor;
class BEditor extends Widget_1.Editor {
    makeContainer() { return JSXFactory.createElement("table", null); }
    displayData(data, minor) {
        const alphabet = minor.alphabet;
        // create editors
        const editorTable = {};
        for (const code of alphabet) {
            editorTable[code] = new NumberEditor_1.NumberEditor();
        }
        // build dom
        const doms = [];
        for (const code of alphabet) {
            doms.push(JSXFactory.createElement("tr", null,
                JSXFactory.createElement("td", null, code),
                JSXFactory.createElement("td", null, editorTable[code].getDOM())));
        }
        const header = JSXFactory.createElement("tr", null,
            JSXFactory.createElement("th", null, "Code"),
            JSXFactory.createElement("th", null, "Probability"));
        JSXFactory.render(this.getDOM(), header, ...doms);
        // initialize data
        for (const code of alphabet) {
            const ed = editorTable[code];
            ed.initData(data[code], {
                min: 0,
                max: 1,
                step: 0.001
            });
        }
        // others
        this.editorTable = editorTable;
    }
    getMajorData() {
        const dist = {};
        for (const code of Object.keys(this.editorTable)) {
            dist[code] = this.editorTable[code].getMajorData();
        }
        return dist;
    }
}


/***/ }),

/***/ "./src/Components/DefinitionViewer.tsx":
/*!*********************************************!*\
  !*** ./src/Components/DefinitionViewer.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
class DefinitionViewer extends Widget_1.Controller {
    displayData(data) {
        if (data === null) {
            JSXFactory.render(this.getDOM());
        }
        else {
            const renameButton = JSXFactory.createElement("button", { style: { "margin-right": "1em" } }, "Rename");
            const deleteButton = JSXFactory.createElement("button", null, "Delete");
            if (data.useless) {
                deleteButton.disabled = true;
                deleteButton.title = "You cannot delete this element, because it's currently in use.";
            }
            renameButton.addEventListener("click", () => {
                const newName = prompt("A new name");
                if (newName !== null && newName.length > 0) {
                    this.send({
                        kind: "rename-def",
                        oldName: data.name,
                        newName: newName
                    });
                }
            });
            deleteButton.addEventListener("click", () => {
                this.send({
                    kind: "delete-def",
                    name: data.name
                });
            });
            JSXFactory.render(this.getDOM(), JSXFactory.createElement("div", { style: {
                    "display": "flex", "flex-direction": "row", "border-bottom": "1px solid grey",
                    "padding-top": "0.5ex",
                    "padding-bottom": "0.5ex"
                } },
                JSXFactory.createElement("span", { style: {
                        "flex-grow": "1",
                        "display": "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        "font-weight": "bold"
                    } }, data.name),
                renameButton,
                deleteButton));
        }
    }
}
exports.DefinitionViewer = DefinitionViewer;


/***/ }),

/***/ "./src/Components/DistributionEditor.tsx":
/*!***********************************************!*\
  !*** ./src/Components/DistributionEditor.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const Button_1 = __webpack_require__(/*! ../Widget/Button */ "./src/Widget/Button.tsx");
const Pile_1 = __webpack_require__(/*! ../Widget/Pile */ "./src/Widget/Pile.tsx");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
const Utility_1 = __webpack_require__(/*! ../Widget/Utility */ "./src/Widget/Utility.tsx");
const DistributionViewer_1 = __webpack_require__(/*! ./DistributionViewer */ "./src/Components/DistributionViewer.tsx");
const NumberEditor_1 = __webpack_require__(/*! ../Widget/NumberEditor */ "./src/Widget/NumberEditor.tsx");
const CSV_1 = __webpack_require__(/*! ../CSV */ "./src/CSV.ts");
const Wrapper_1 = __webpack_require__(/*! ../Widget/Wrapper */ "./src/Widget/Wrapper.tsx");
class DistributionEditor extends Widget_1.Editor {
    init() {
        this.viewer = new DistributionViewer_1.DistributionViewer();
        JSXFactory.render(this.getDOM(), this.viewer.getDOM());
        this.viewer.bind({
            handle: (cmd) => {
                const ed = new DEditor();
                ed.initData(this.getMajorData(), undefined);
                Utility_1.ask(ed, {
                    ok: () => {
                        const newData = ed.getMajorData();
                        if (newData.probs.every((n) => { return 0 <= n && n <= 1; }) && JSUtility_1.floatEqual(JSUtility_1.sum(...newData.probs), 1)) {
                            this.updateMajorData(newData);
                        }
                        else {
                            console.log(newData);
                            alert("invalid distribution: either some probability is out of [0,1] or their sum does not equal to 1.");
                        }
                    },
                    cancel: () => {
                    }
                });
            }
        });
    }
    getMajorData() {
        return this.viewer.getData();
    }
    displayData(data) {
        this.viewer.initData(data);
    }
}
exports.DistributionEditor = DistributionEditor;
class DEditor extends Widget_1.Editor {
    init() {
        super.init();
    }
    makeContainer() {
        return JSXFactory.createElement("div", { style: { "display": "flex", "flex-direction": "column" } });
    }
    getMajorData() {
        return {
            from: this.fromEr.getMajorData(),
            probs: this.probsEr.getMajorData()
        };
    }
    displayData(data) {
        this.fromEr = new NumberEditor_1.NumberEditor();
        this.fromEr.initData(data.from, {
            min: 1,
            step: 1
        });
        this.fromEr.register(this, (d) => {
            this.probsEr.updateMinorData({
                from: d
            });
        });
        this.probsEr = new ProbsEditor();
        this.probsEr.initData(data.probs, {
            from: data.from
        });
        let csvButton = JSXFactory.createElement("button", null, "To/From CSV");
        csvButton.addEventListener("click", () => {
            let probs = this.probsEr.getMajorData();
            let csvText = CSV_1.CSV.dump({ head: ["Pr"], body: probs.map((p) => ({ "Pr": p })) });
            const textarea = JSXFactory.createElement("textarea", { cols: "30", rows: "10" });
            textarea.value = csvText;
            Utility_1.ask(new Wrapper_1.Wrapper(textarea), {
                cancel: () => { },
                ok: () => {
                    let tab = CSV_1.CSV.parse(textarea.value);
                    if (JSUtility_1.equal(tab.head, ["Pr"])) {
                        let probs = tab.body.map((r) => (r["Pr"]));
                        this.probsEr.updateMajorData(probs);
                    }
                }
            });
        });
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("label", { style: { "margin-bottom": "1ex" } },
            "From: ",
            this.fromEr.getDOM()), this.probsEr.getDOM(), csvButton);
    }
}
class ProbsEditor extends Widget_1.Editor {
    constructor() {
        super(...arguments);
        this.editors = [];
    }
    handle(cmd) {
        switch (cmd.message) {
            case "add-row": {
                const data = this.getMajorData();
                this.updateMajorData([...data, 0]);
                return;
            }
            case "del-row": {
                const data = this.getMajorData();
                this.updateMajorData((data.length > 0) ? data.slice(0, data.length - 1) : []);
                return;
            }
        }
    }
    makeContainer() {
        return JSXFactory.createElement("div", { style: { "display": "flex", "flex-direction": "column" } });
    }
    init() {
        super.init();
        this.addRowButton = new Button_1.Button();
        this.addRowButton.initData({
            label: "+",
            message: "add-row"
        });
        this.addRowButton.bind(this);
        this.delRowButton = new Button_1.Button();
        this.delRowButton.initData({
            label: "-",
            message: "del-row"
        });
        this.delRowButton.bind(this);
    }
    getMajorData() {
        return this.editors.map((e) => { return e.getMajorData(); });
    }
    displayData(data, minor) {
        this.editors = [];
        for (let i = 0; i < data.length; i++) {
            const ed = new NumberEditor_1.NumberEditor();
            ed.initData(data[i], {
                min: 0,
                max: 1,
                step: 0.001
            });
            this.editors.push(ed);
        }
        const pile = new Pile_1.HPile();
        pile.setChildren([this.addRowButton, this.delRowButton]);
        JSXFactory.render(this.getDOM(), ...this.editors.map((e, i) => (JSXFactory.createElement("label", null,
            minor.from + i,
            ": ",
            e.getDOM()))), JSXFactory.createElement("div", { style: { "padding-top": "1ex" } }, pile.getDOM()));
    }
}


/***/ }),

/***/ "./src/Components/DistributionViewer.tsx":
/*!***********************************************!*\
  !*** ./src/Components/DistributionViewer.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/SVGFactory */ "./src/JSX/SVGFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
class DistributionViewer extends Widget_1.Controller {
    init() {
        super.init();
        this.svg = (JSXFactory.createElement("svg", { height: "0", width: "0", style: {
                "stroke": "black",
                "fill": "white"
            } }));
        this.svg.addEventListener("click", () => {
            this.send("click");
        });
        this.getDOM().innerHTML = "";
        this.getDOM().appendChild(this.svg);
    }
    displayData(data) {
        const contentHeight = 100;
        const unitWidth = 30;
        const topPadding = 20;
        const bottomPadding = 20;
        const leftPadding = 10;
        const rightPadding = 10;
        const height = contentHeight + topPadding + bottomPadding;
        const heightProbRatio = contentHeight / Math.max(0, ...data.probs);
        const width = leftPadding + unitWidth * data.probs.length + rightPadding;
        this.svg.setAttribute('width', width.toString());
        this.svg.setAttribute('height', height.toString());
        JSXFactory.render(this.svg, ...data.probs.map((p, i) => {
            const index = data.from + i;
            const h = p * heightProbRatio;
            const w = unitWidth;
            const top = topPadding + contentHeight;
            const left = leftPadding + unitWidth * i;
            const label = p.toFixed(2);
            return (JSXFactory.createElement("g", { transform: JSUtility_1.format("translate(%,%)", left, top) },
                JSXFactory.createElement("rect", { x: 0, y: -h, width: w, height: h, fill: "lightblue", stroke: "white" }),
                JSXFactory.createElement("text", { x: unitWidth / 2, y: -h, fill: "black", stroke: "black", "dominant-baseline": "baseline", "text-anchor": "middle", "pointer-events": "none", "font-size": "0.6em" }, label),
                JSXFactory.createElement("text", { x: unitWidth / 2, y: 0, fill: "black", stroke: "black", "dominant-baseline": "hanging", "text-anchor": "middle", "pointer-events": "none" }, index)));
        }), JSXFactory.createElement("line", { x1: 0, y1: topPadding + contentHeight, x2: width, y2: topPadding + contentHeight, stroke: "black", fill: "black" }));
    }
}
exports.DistributionViewer = DistributionViewer;


/***/ }),

/***/ "./src/Components/ElementDefEditor.tsx":
/*!*********************************************!*\
  !*** ./src/Components/ElementDefEditor.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const SSPDL_1 = __webpack_require__(/*! ../SSPDL/SSPDL */ "./src/SSPDL/SSPDL.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const MotifEditor_1 = __webpack_require__(/*! ./MotifEditor */ "./src/Components/MotifEditor.tsx");
const SpacerEditor_1 = __webpack_require__(/*! ./SpacerEditor */ "./src/Components/SpacerEditor.tsx");
class ElementDefEditor extends Widget_1.Editor {
    displayData(data, extra) {
        const makeEditor = (def, alphabet, background) => {
            switch (def.kind) {
                case SSPDL_1.ElementKind.Motif: {
                    // editor
                    const ed = new MotifEditor_1.MotifEditor();
                    ed.initData(def, {
                        alphabet: alphabet,
                        background: background
                    });
                    ed.register(this, (newMotif) => {
                        const data = {
                            kind: SSPDL_1.ElementKind.Motif,
                            color: newMotif.color,
                            matrix: newMotif.matrix
                        };
                        this.updateMajorData(data);
                    });
                    return ed;
                }
                case SSPDL_1.ElementKind.GMotif: {
                    // editor
                    const ed = new MotifEditor_1.GMotifEditor();
                    ed.initData(def, {
                        alphabet: alphabet,
                        background: background
                    });
                    ed.register(this, (newGMotif) => {
                        const data = {
                            kind: SSPDL_1.ElementKind.GMotif,
                            color: newGMotif.color,
                            matrix: newGMotif.matrix,
                            distribution: newGMotif.distribution
                        };
                        this.updateMajorData(data);
                    });
                    return ed;
                }
                case SSPDL_1.ElementKind.Spacer: {
                    // editor
                    const ed = new SpacerEditor_1.SpacerEditor();
                    ed.initData(def, undefined);
                    ed.register(this, (newSpacer) => {
                        const data = {
                            kind: SSPDL_1.ElementKind.Spacer,
                            distribution: newSpacer.distribution
                        };
                        this.updateMajorData(data);
                    });
                    return ed;
                }
                default: {
                    throw new Error("internal");
                }
            }
        };
        if (data === null) {
            JSXFactory.render(this.getDOM());
        }
        else {
            const ed = makeEditor(data, extra.alphabet, extra.background);
            JSXFactory.render(this.getDOM(), JSXFactory.createElement("div", { style: { "padding-left": "1em", "padding-top": "1ex" } }, ed.getDOM()));
        }
    }
}
exports.ElementDefEditor = ElementDefEditor;


/***/ }),

/***/ "./src/Components/IndexViewer.tsx":
/*!****************************************!*\
  !*** ./src/Components/IndexViewer.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const SSPDL_1 = __webpack_require__(/*! ../SSPDL/SSPDL */ "./src/SSPDL/SSPDL.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const Box_1 = __webpack_require__(/*! ../SVGComponents/Box */ "./src/SVGComponents/Box.tsx");
class IndexViewer extends Widget_1.Controller {
    makeContainer() {
        return (JSXFactory.createElement("div", { style: {
                "flex-grow": "0",
                "width": "10em",
                "display": "flex",
                "flex-direction": "column",
                "flex-shrink": "0"
            } }));
    }
    init() {
        const motifButton = JSXFactory.createElement("button", null, "New Motif");
        const gmotifButton = JSXFactory.createElement("button", null, "New G-Motif");
        const spacerButton = JSXFactory.createElement("button", null, "New Spacer");
        motifButton.addEventListener("click", () => {
            this.send({
                kind: "new-element",
                elementKind: SSPDL_1.ElementKind.Motif
            });
        });
        gmotifButton.addEventListener("click", () => {
            this.send({
                kind: "new-element",
                elementKind: SSPDL_1.ElementKind.GMotif
            });
        });
        spacerButton.addEventListener("click", () => {
            this.send({
                kind: "new-element",
                elementKind: SSPDL_1.ElementKind.Spacer
            });
        });
        JSXFactory.render(this.getDOM(), this.itemContainer = JSXFactory.createElement("div", { style: { "flex-grow": "1", "overflow-y": "auto" } }), motifButton, gmotifButton, spacerButton);
    }
    displayData(data) {
        JSXFactory.render(this.itemContainer, ...data.map((x) => {
            const box = Box_1.Box({
                size: 10,
                fill: (x.kind === SSPDL_1.ElementKind.Spacer) ? "white" : x.color,
                stroke: (x.kind === SSPDL_1.ElementKind.Spacer) ? "black" : x.color,
            });
            const btn = (JSXFactory.createElement("button", { style: {
                    'display': "flex",
                    "flex-direction": "row",
                    'width': "100%"
                } },
                JSXFactory.createElement("span", { style: { "flex-grow": "0" } }, box),
                JSXFactory.createElement("span", { style: { "flex-grow": "1" } }, x.name),
                JSXFactory.createElement("span", { style: { "flex-grow": "0" } },
                    "(",
                    x.useCount,
                    ")")));
            btn.addEventListener("click", () => {
                this.send({
                    kind: "focus",
                    name: x.name
                });
            });
            return btn;
        }));
    }
}
exports.IndexViewer = IndexViewer;


/***/ }),

/***/ "./src/Components/ModelEditor.tsx":
/*!****************************************!*\
  !*** ./src/Components/ModelEditor.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const ModuleViewer_1 = __webpack_require__(/*! ./ModuleViewer */ "./src/Components/ModuleViewer.tsx");
const Utility_1 = __webpack_require__(/*! ../SSPDL/Utility */ "./src/SSPDL/Utility.ts");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
const StringViewer_1 = __webpack_require__(/*! ../Widget/StringViewer */ "./src/Widget/StringViewer.tsx");
const Menubar_1 = __webpack_require__(/*! ../Widget/Menubar */ "./src/Widget/Menubar.tsx");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const SSPDL_1 = __webpack_require__(/*! ../SSPDL/SSPDL */ "./src/SSPDL/SSPDL.ts");
const Utility_2 = __webpack_require__(/*! ../Widget/Utility */ "./src/Widget/Utility.tsx");
const Pile_1 = __webpack_require__(/*! ../Widget/Pile */ "./src/Widget/Pile.tsx");
const Button_1 = __webpack_require__(/*! ../Widget/Button */ "./src/Widget/Button.tsx");
const FileSaver = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/FileSaver.js");
const NumberEditor_1 = __webpack_require__(/*! ../Widget/NumberEditor */ "./src/Widget/NumberEditor.tsx");
const BackgroundDistributionEditor_1 = __webpack_require__(/*! ./BackgroundDistributionEditor */ "./src/Components/BackgroundDistributionEditor.tsx");
const Wrapper_1 = __webpack_require__(/*! ../Widget/Wrapper */ "./src/Widget/Wrapper.tsx");
const IndexViewer_1 = __webpack_require__(/*! ./IndexViewer */ "./src/Components/IndexViewer.tsx");
const DefinitionViewer_1 = __webpack_require__(/*! ./DefinitionViewer */ "./src/Components/DefinitionViewer.tsx");
const ElementDefEditor_1 = __webpack_require__(/*! ./ElementDefEditor */ "./src/Components/ElementDefEditor.tsx");
const CSV_1 = __webpack_require__(/*! ../CSV */ "./src/CSV.ts");
class ProbabilityEditor extends NumberEditor_1.NumberEditor {
    initData(data, extra = { min: 0, max: 1, step: 0.001 }) {
        super.initData(data, extra);
    }
}
class ModelEditor extends Widget_1.Editor {
    constructor() {
        super(...arguments);
        this.undoCount = 0;
        this.undoStack = [];
        this.redoStack = [];
    }
    interpreteNewElement(elementKind) {
        const model = this.getMajorData();
        const namespace = model.namespace;
        switch (elementKind) {
            case SSPDL_1.ElementKind.Motif: {
                const name = window.prompt("The name of new motif:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name);
                    }
                    else {
                        namespace[name] = {
                            kind: SSPDL_1.ElementKind.Motif,
                            color: "#888888",
                            matrix: []
                        };
                        this.updateMajorData(model);
                        this.handle({
                            kind: "focus",
                            name: name
                        });
                    }
                }
                return;
            }
            case SSPDL_1.ElementKind.GMotif: {
                const name = window.prompt("The name of new generalized motif:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name);
                    }
                    else {
                        namespace[name] = {
                            kind: SSPDL_1.ElementKind.GMotif,
                            distribution: { from: 1, probs: [1] },
                            color: "#000000",
                            matrix: []
                        };
                        this.updateMajorData(model);
                        this.handle({
                            kind: "focus",
                            name: name
                        });
                    }
                }
                return;
            }
            case SSPDL_1.ElementKind.Spacer: {
                const name = window.prompt("The name of new spacer:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name);
                    }
                    else {
                        namespace[name] = {
                            kind: SSPDL_1.ElementKind.Spacer,
                            distribution: { from: 1, probs: [1] },
                        };
                        this.updateMajorData(model);
                        this.handle({
                            kind: "focus",
                            name: name
                        });
                    }
                }
                return;
            }
        }
    }
    interpreteFocus(name) {
        const model = this.getMajorData();
        if (model.namespace[name] !== undefined) {
            let useless = false;
            Utility_1.tranverseModule(model.root, (e) => {
                if (e.name === name) {
                    useless = true;
                }
            });
            this.definitionViewer.initData({
                name: name,
                useless: useless
            });
            this.elementDefEr.initData(model.namespace[name], {
                alphabet: model.alphabet,
                background: model.background
            });
        }
        else {
            this.definitionViewer.initData(null);
            this.elementDefEr.initData(null, {
                alphabet: model.alphabet,
                background: model.background
            });
        }
    }
    interpreteRenameDef(oldName, newName) {
        const model = this.getMajorData();
        if (model.namespace[newName] !== undefined) {
            alert("The new name is already in use.");
            return;
        }
        else {
            model.namespace[newName] = model.namespace[oldName];
            delete model.namespace[oldName];
            model.root = Utility_1.transformModule(model.root, (e) => {
                if (e.name === oldName) {
                    return {
                        name: newName
                    };
                }
                else {
                    return e;
                }
            });
            this.updateMajorData(model);
            this.handle({
                kind: "focus",
                name: newName
            });
            return;
        }
    }
    handleUndo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.getMajorData());
            this.updateMajorData(this.undoStack.pop());
        }
        else {
            alert("no more undoable action");
        }
    }
    handleRedo() {
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.getMajorData());
            this.updateMajorData(this.redoStack.pop());
        }
        else {
            alert("no more redoable action");
        }
    }
    handleNeitherUndoNorRedo() {
        this.undoStack.push(this.getMajorData());
        this.redoStack = [];
    }
    interpreteEditNode(path, index) {
        const insertableElements = Object.keys(this.getMajorData().namespace);
        const that = this;
        const insertionControllee = new class {
            handle(cmd) {
                // insert element to node at *path*.
                const model = that.getMajorData();
                const rider = new Utility_1.StandardRider(model.root, path);
                rider.getModule().splice(index, 0, {
                    kind: "element",
                    name: cmd.message
                });
                that.updateMajorData(model);
                // close the popup
                popupConrollee.handle({
                    kind: "popup",
                    command: "close"
                });
            }
        };
        const widget = new Pile_1.Pile();
        widget.setChildren([
            new Wrapper_1.Wrapper(JSXFactory.createElement("span", null, "You may insert one of the elements.")),
            ...insertableElements.map((name) => {
                const btn = new Button_1.Button();
                btn.initData({
                    label: name,
                    message: name
                });
                btn.bind(insertionControllee);
                return btn;
            })
        ]);
        const popupConrollee = Utility_2.tell(widget, "Cancel");
    }
    interpreteEditElement(path) {
        const widget = new StringViewer_1.StringViewer();
        widget.initData("You may delete this element.");
        Utility_2.popup(widget, [
            { label: JSXFactory.createElement("span", { style: { "color": 'red' } }, "Delete"), key: "delete" },
            { label: "Cancel", key: "cancel" }
        ], {
            delete: () => {
                const data = this.getMajorData();
                const rider = new Utility_1.StandardRider(data.root, path);
                console.log(rider.getNodeKind(), rider, path);
                // return;
                rider.up();
                rider.getModule().splice(path[path.length - 1], 1);
                this.updateMajorData(data);
                return;
            },
            cancel: () => { }
        });
    }
    interpreteEditRepetition(path) {
        class RepetetionEditor extends Widget_1.Editor {
            init() {
                this.editor = new ProbabilityEditor();
                JSXFactory.render(this.getDOM(), JSXFactory.createElement("label", null,
                    "Pr(looping back) = ",
                    this.editor.getDOM()));
            }
            getMajorData() {
                return this.editor.getMajorData();
            }
            displayData(data) {
                this.editor.initData(data);
            }
        }
        const data = JSUtility_1.copy(this.getMajorData());
        const rider = new Utility_1.StandardRider(data.root, path);
        const repet = rider.getRepetition();
        const ed = new RepetetionEditor();
        ed.initData(repet.prob, undefined);
        Utility_2.popup(ed, [
            { label: JSXFactory.createElement("span", { style: { "color": "green" } }, "Submit"), key: "submit" },
            { label: JSXFactory.createElement("span", { style: { "color": "red" } }, "Delete"), key: "delete" },
            { label: "Cancel", key: "cancel" }
        ], {
            "submit": () => {
                const prob = ed.getMajorData();
                if (0 <= prob && prob <= 1) {
                    repet.prob = prob;
                    this.updateMajorData(data);
                }
                else {
                    alert("invalid probability");
                }
            },
            "delete": () => {
                const path = rider.getPath();
                const index = path[path.length - 1];
                rider.up();
                const m = rider.getModule();
                m.splice(index, 1);
                this.updateMajorData(data);
            },
            "cancel": () => { }
        });
    }
    interpreteEditAlternation(path) {
        class AlternationEditor extends Widget_1.Editor {
            handle(cmd) {
                switch (cmd.message) {
                    case 'add': {
                        this.updateMajorData(this.getMajorData().concat([0]));
                        return;
                    }
                    case 'del': {
                        let d = this.getMajorData();
                        this.updateMajorData(d.slice(0, d.length - 1));
                        return;
                    }
                    case 'csv': {
                        let d = this.getMajorData();
                        let csvText = CSV_1.CSV.dump({
                            head: ['Pr'],
                            body: d.map((p) => ({ 'Pr': p }))
                        });
                        const textarea = JSXFactory.createElement("textarea", { cols: "30", rows: "10" });
                        textarea.value = csvText;
                        Utility_2.ask(new Wrapper_1.Wrapper(textarea), {
                            ok: () => {
                                const csv = CSV_1.CSV.parse(textarea.value);
                                if (JSUtility_1.equal(csv.head, ['Pr'])) {
                                    this.updateMajorData(csv.body.map((r) => (r['Pr'])));
                                }
                                else {
                                    alert("You must not change the header.");
                                }
                            },
                            cancel: () => { }
                        });
                        return;
                    }
                    default: {
                        throw null;
                    }
                }
            }
            init() {
                this.pile = new Pile_1.Pile();
                JSXFactory.render(this.getDOM(), this.pile.getDOM());
            }
            displayData(data) {
                this.editors = data.map((p) => {
                    const ed = new ProbabilityEditor();
                    ed.initData(p);
                    return ed;
                });
                // add/delete row
                const addRowBtn = new Button_1.Button();
                const deleteRowBtn = new Button_1.Button();
                addRowBtn.initData({
                    label: "+",
                    message: "add"
                });
                deleteRowBtn.initData({
                    label: "-",
                    message: "del"
                });
                addRowBtn.bind(this);
                deleteRowBtn.bind(this);
                let hp = new Pile_1.HPile();
                hp.setChildren([addRowBtn, deleteRowBtn]);
                // input/output as CSV
                const ioBtn = new Button_1.Button();
                ioBtn.initData({
                    label: "To/From CSV",
                    message: "csv"
                });
                ioBtn.bind(this);
                this.pile.setChildren([
                    ...this.editors.map((ed, i) => {
                        return new Wrapper_1.Wrapper(JSXFactory.createElement("label", null,
                            i.toString() + ": ",
                            ed.getDOM()));
                    }),
                    hp, ioBtn
                ]);
            }
            getMajorData() {
                return this.editors.map((ed) => {
                    return ed.getMajorData();
                });
            }
        }
        const module = JSUtility_1.copy(this.getMajorData());
        const rider = new Utility_1.StandardRider(module.root, path);
        const alter = rider.getAlternation();
        const probs = alter.psubs.map(ps => ps.prob);
        const ed = new AlternationEditor();
        ed.initData(probs, undefined);
        function validateDistribution(dist) {
            let s = 0;
            let i = 0;
            for (let n of dist) {
                if (typeof n != 'number') {
                    throw Error('The ' + i + '-th item is not a number.');
                }
                if (!(0 <= n && n <= 1)) {
                    throw Error('The ' + i + '-th number goes out of range 0~1 (' + n + ').');
                }
                s += n;
                i++;
            }
            if (!JSUtility_1.floatEqual(s, 1)) {
                throw Error('The sum of probability does not sum up to 1.');
            }
        }
        Utility_2.popup(ed, [
            { label: JSXFactory.createElement("span", { style: { "color": "green" } }, "Submit"), key: "submit" },
            { label: JSXFactory.createElement("span", { style: { "color": "red" } }, "Delete"), key: "delete" },
            { label: "Cancel", key: "cancel" }
        ], {
            "submit": () => {
                const newDist = ed.getMajorData();
                try {
                    validateDistribution(newDist);
                    let psubs = [];
                    for (let i = 0; i < newDist.length; i++) {
                        psubs.push({
                            prob: newDist[i],
                            mod: (i < alter.psubs.length) ? alter.psubs[i].mod : []
                        });
                    }
                    alter.psubs = psubs;
                    this.updateMajorData(module);
                }
                catch (e) {
                    alert(e.message);
                }
            },
            "delete": () => {
                const path = rider.getPath();
                const index = path[path.length - 1];
                rider.up();
                const m = rider.getModule();
                m.splice(index, 1);
                this.updateMajorData(module);
            },
            "cancel": () => { }
        });
    }
    interpreteDeleteDef(name) {
        let useless = true;
        const model = this.getMajorData();
        console.log(model, name);
        Utility_1.tranverseModule(model.root, (e) => {
            if (e.name === name) {
                useless = false;
            }
        });
        if (useless) {
            delete model.namespace[name];
            this.updateMajorData(model);
            this.handle({
                kind: "focus",
                name: ""
            });
            return;
        }
        else {
            alert("This element is still in use, so you cannot delete it.");
            return;
        }
    }
    makeContainer() {
        return (JSXFactory.createElement("div", { style: {
                display: "flex",
                "flex-direction": "column",
                height: "100%"
            } }));
    }
    init() {
        super.init();
        const menubar = new Menubar_1.Menubar();
        menubar.initData([
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
        this.moduleVr = new ModuleViewer_1.ModuleViewer();
        this.moduleVr.bind(this);
        this.elementDefEr = new ElementDefEditor_1.ElementDefEditor();
        this.elementDefEr.register(this, (def) => {
            if (def !== null) {
                const model = this.getMajorData();
                const name = this.definitionViewer.getData().name;
                model.namespace[name] = def;
                this.updateMajorData(model);
            }
        });
        this.definitionViewer = new DefinitionViewer_1.DefinitionViewer();
        this.definitionViewer.bind(this);
        this.indexViewer = new IndexViewer_1.IndexViewer();
        this.indexViewer.bind(this);
        this.backgroundEr = new BackgroundDistributionEditor_1.BackgroundDistributionEditor();
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("div", { style: { "flex-grow": "0" } }, menubar.getDOM()), JSXFactory.createElement("div", { style: { "flex-grow": "0" } }, this.backgroundEr.getDOM()), JSXFactory.createElement("div", { style: { "flex-grow": "1", "height": "30%", "overflow": "auto" } }, this.moduleVr.getDOM()), JSXFactory.createElement("div", { style: { "flex-grow": "1", "height": "50%" } },
            JSXFactory.createElement("div", { style: {
                    "display": "flex",
                    "flex-direction": "row",
                    "border-top": "1px solid black",
                    "height": "100%"
                } },
                this.indexViewer.getDOM(),
                JSXFactory.createElement("div", { style: {
                        "flex-grow": "1",
                        "border-left": "1px solid black",
                        "overflow-y": "scroll"
                    } },
                    this.definitionViewer.getDOM(),
                    this.elementDefEr.getDOM()))));
    }
    displayData(data) {
        function getElementUse(module) {
            const elementUse = {};
            const rider = new Utility_1.StandardRider(data.root);
            function walk(rider) {
                if (rider.isElement()) {
                    const name = rider.getElementContent().name;
                    elementUse[name] = (elementUse[name] || 0) + 1;
                }
                else {
                    for (const r of rider.getChildRiders()) {
                        walk(r);
                    }
                }
            }
            walk(rider);
            return elementUse;
        }
        this.alphabet = data.alphabet;
        this.moduleVr.initData(Utility_1.transformModule(data.root, (e) => {
            const name = e.name;
            const elem = data.namespace[name];
            switch (elem.kind) {
                case SSPDL_1.ElementKind.Motif: {
                    return {
                        type: SSPDL_1.ElementKind.Motif,
                        name: name,
                        color: elem.color,
                    };
                }
                case SSPDL_1.ElementKind.GMotif: {
                    return {
                        type: SSPDL_1.ElementKind.GMotif,
                        name: name,
                        dist: elem.distribution,
                        color: elem.color,
                    };
                }
                case SSPDL_1.ElementKind.Spacer: {
                    return {
                        type: SSPDL_1.ElementKind.Spacer,
                        name: name
                    };
                }
                default: {
                    throw new Error();
                }
            }
        }));
        const elementUse = getElementUse(data.root);
        const makeIndex = (data, alphabet, elementUse) => {
            const index = [];
            const makeIndexItem = (name, def) => {
                switch (def.kind) {
                    case "motif": {
                        return {
                            name: name,
                            kind: SSPDL_1.ElementKind.Motif,
                            color: def.color,
                            useCount: elementUse[name] || 0
                        };
                    }
                    case "g-motif": {
                        return {
                            name: name,
                            kind: SSPDL_1.ElementKind.GMotif,
                            color: def.color,
                            useCount: elementUse[name] || 0
                        };
                    }
                    case "spacer": {
                        return {
                            name: name,
                            kind: SSPDL_1.ElementKind.Spacer,
                            useCount: elementUse[name] || 0
                        };
                    }
                    default: {
                        throw new Error("internal");
                    }
                }
            };
            for (const name of Object.keys(data).sort()) {
                index.push(makeIndexItem(name, data[name]));
            }
            return index;
        };
        this.indexViewer.initData(makeIndex(data.namespace, data.alphabet, elementUse));
        this.backgroundEr.initData(data.background, {
            alphabet: this.alphabet
        });
    }
    getMajorData() {
        return JSUtility_1.copy(super.getMajorData());
    }
    handle(cmd) {
        if (cmd.kind === "menubar") {
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
                        const alphabet = "ACGT".split("");
                        const bgd = {};
                        for (const code of alphabet) {
                            bgd[code] = 1 / alphabet.length;
                        }
                        this.updateMajorData({
                            namespace: {},
                            background: bgd,
                            alphabet: alphabet,
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
                                    this.updateMajorData(json);
                                });
                                reader.readAsText(file);
                            }
                        });
                        return;
                    }
                    case "File.Save": {
                        const blob = new Blob([JSON.stringify(this.getMajorData(), null, "\t")], { type: "text/plain;charset=utf-8" });
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
                case "delete-def": {
                    return this.interpreteDeleteDef(cmd.name);
                }
                case "rename-def": {
                    return this.interpreteRenameDef(cmd.oldName, cmd.newName);
                }
                case "focus": {
                    return this.interpreteFocus(cmd.name);
                }
                case "new-element": {
                    return this.interpreteNewElement(cmd.elementKind);
                }
                default: {
                    console.log(cmd);
                    return;
                }
            }
        }
    }
    interpreteMoveElementToNode(ePath, nPath, nindex) {
        const root1 = this.getMajorData().root;
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
        const model = this.getMajorData();
        model.root = root1;
        this.updateMajorData(model);
    }
    interpreteCopyElementToNode(ePath, nPath, nindex) {
        const data = this.getMajorData();
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
        this.updateMajorData({
            alphabet: this.alphabet,
            namespace: data.namespace,
            background: data.background,
            root: root1
        });
    }
    interpreteLinkNodes(path, p, q) {
        const data = this.getMajorData();
        const root1 = data.root;
        const rider = new Utility_1.StandardRider(root1, path);
        const module = rider.getModule();
        const piece = module.slice(JSUtility_1.min(p, q), JSUtility_1.max(p, q));
        const item = ((p < q)
            ? { kind: "alternation", psubs: [{ prob: 0.5, mod: piece }, { prob: 0.5, mod: [] }] }
            : { kind: "repetition", prob: 0.5, sub: piece });
        module.splice(JSUtility_1.min(p, q), Math.abs(p - q), item);
        return this.updateMajorData({
            alphabet: data.alphabet,
            namespace: data.namespace,
            background: data.background,
            root: root1
        });
    }
}
exports.ModelEditor = ModelEditor;


/***/ }),

/***/ "./src/Components/ModuleViewer.tsx":
/*!*****************************************!*\
  !*** ./src/Components/ModuleViewer.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/SVGFactory */ "./src/JSX/SVGFactory.ts");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
const Snap = __webpack_require__(/*! snapsvg */ "snapsvg");
const widget_1 = __webpack_require__(/*! ../widget */ "./src/widget.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const Utility_1 = __webpack_require__(/*! ../SSPDL/Utility */ "./src/SSPDL/Utility.ts");
class ModuleViewer extends Widget_1.Controller {
    init() {
        super.init();
        this.svg = JSXFactory.createElement("svg", { width: "0", height: "0" });
        this.paper = Snap(this.svg);
        this.getDOM().innerHTML = "";
        this.getDOM().appendChild(this.svg);
    }
    displayData(data) {
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
            const totalWidth = 100;
            const totalHeight = 50;
            const elementWidgth = totalWidth;
            const elementHeight = 30;
            let [x, y, w, h] = [
                (totalWidth - elementWidgth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidgth,
                elementHeight
            ];
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.PWMBox(paper, name, color, JSON.stringify(path), x, y, w, h, profaneHandlerGroup(path));
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
                node: paper
            };
        };
        const renderGMotif = (p, name, color) => {
            const totalWidth = 100;
            const totalHeight = 50;
            const elementWidth = totalWidth;
            const elementHeight = 30;
            let [x, y, w, h] = [
                (totalWidth - elementWidth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidth,
                elementHeight
            ];
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.PWMBox(paper, name, color, JSON.stringify(path), x, y, w, h, profaneHandlerGroup(path));
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
                node: paper
            };
            // const w = 100;
            // const h = 60;
            // const path: UPath = {
            //     kind: "element",
            //     path: rider.getPath()
            // };
            // PWMBox(paper, name, color, JSON.stringify(path), 0, 15, w, 30, profaneHandlerGroup(path));
            // // PWMBox(paper, name, color, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            // return {
            //     a: h / 2,
            //     d: h / 2,
            //     w: w,
            //     node: paper
            // };
        };
        const renderSpacer = (p, name) => {
            const totalWidth = 60;
            const totalHeight = 30;
            const elementWidth = 60;
            const elementHeight = 20;
            let [x, y, w, h] = [
                (totalWidth - elementWidth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidth,
                elementHeight
            ];
            const path = {
                kind: "element",
                path: rider.getPath()
            };
            widget_1.SpacerBox(paper, name, JSON.stringify(path), x, y, w, h, profaneHandlerGroup(path));
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
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
        const topPadding = 5;
        const botPadding = 5;
        const interModulePadding = 5;
        const probLabelOffsetY = -3;
        const probLabelOffsetX = 3;
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
            pp.text(leftEnd + probLabelOffsetX, para.z + probLabelOffsetY, para.prob.toFixed(2));
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
        const jointMid = (jointTop + jointBot) / 2;
        return {
            a: jointMid,
            d: totalHeight - jointMid,
            w: totalWidth,
            node: paper
        };
    }
    function renderRepetition(paper, rider) {
        const arrowHeight = 20;
        const horizontalPadding = 5;
        const probLabelOffsetX = 3;
        const rep = rider.getRepetition();
        const x = renderModule(paper.g(), rider.getChildRiders()[0]);
        x.node.transform(Snap.format("translate({x},{y})", {
            "x": horizontalPadding,
            "y": arrowHeight
        }));
        const pp = paper.g();
        // reverse arrow
        pp.path(Snap.format("M{x},{y} v-{h} h{w} v{h}", {
            "x": horizontalPadding / 2,
            "y": x.a + arrowHeight,
            "h": x.a + arrowHeight / 2,
            "w": x.w + horizontalPadding
        })).attr({
            "fill": "none"
        });
        // triangle
        pp.path(Snap.format("M{x},{y} l-5,-10 h10", {
            "x": horizontalPadding / 2,
            "y": x.a + arrowHeight - horizontalPadding / 2
        }));
        // dots
        const dotRadius = horizontalPadding / 2;
        pp.circle(dotRadius, x.a + arrowHeight, dotRadius);
        pp.circle(x.w + dotRadius * 3, x.a + arrowHeight, dotRadius);
        // probability label
        const labelX = x.w + dotRadius * 3 + probLabelOffsetX;
        const labelY = (x.a + arrowHeight) - (x.a + arrowHeight / 2) / 2;
        pp.text(labelX, labelY, rep.prob.toFixed(2)).attr({
            "dominant-baseline": "central"
        });
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
            w: x.w + 2 * horizontalPadding,
            node: paper
        };
    }
    return renderModule(paper, new Utility_1.Rider(m));
}


/***/ }),

/***/ "./src/Components/MotifEditor.tsx":
/*!****************************************!*\
  !*** ./src/Components/MotifEditor.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const ColorEditor_1 = __webpack_require__(/*! ../Widget/ColorEditor */ "./src/Widget/ColorEditor.tsx");
const DistributionEditor_1 = __webpack_require__(/*! ./DistributionEditor */ "./src/Components/DistributionEditor.tsx");
const PWMEditor_1 = __webpack_require__(/*! ./PWMEditor */ "./src/Components/PWMEditor.tsx");
class MotifEditor extends Widget_1.Editor {
    init() {
        this.colorEr = new ColorEditor_1.ColorEditor();
        this.pwmEr = new PWMEditor_1.PWMEditor();
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("label", null,
            "Color: ",
            this.colorEr.getDOM()), JSXFactory.createElement("label", null,
            "PWM:",
            this.pwmEr.getDOM()));
        this.colorEr.register(this, (data) => {
            this.emitDataChange();
        });
        this.pwmEr.register(this, (data) => {
            this.emitDataChange();
        });
    }
    displayData(data, minor) {
        this.colorEr.initData(data.color, undefined);
        this.pwmEr.initData(data.matrix, {
            alphabet: minor.alphabet,
            background: minor.background
        });
    }
    getMajorData() {
        return {
            color: this.colorEr.getMajorData(),
            matrix: this.pwmEr.getMajorData()
        };
    }
}
exports.MotifEditor = MotifEditor;
class GMotifEditor extends Widget_1.Editor {
    init() {
        super.init();
        this.distEr = new DistributionEditor_1.DistributionEditor();
        this.colorEr = new ColorEditor_1.ColorEditor();
        this.pwmEr = new PWMEditor_1.PWMEditor();
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("label", null,
            "Color: ",
            this.colorEr.getDOM()), JSXFactory.createElement("label", null,
            "PWM:",
            this.pwmEr.getDOM()), JSXFactory.createElement("label", null,
            "Distribution of #repetition:",
            this.distEr.getDOM()));
        const emitChange = () => this.emitDataChange();
        this.distEr.register(this, emitChange);
        this.colorEr.register(this, emitChange);
        this.pwmEr.register(this, emitChange);
    }
    displayData(data, minor) {
        this.distEr.initData(data.distribution, undefined);
        this.colorEr.initData(data.color, undefined);
        this.pwmEr.initData(data.matrix, {
            alphabet: minor.alphabet,
            background: minor.background
        });
    }
    getMajorData() {
        return {
            distribution: this.distEr.getMajorData(),
            color: this.colorEr.getMajorData(),
            matrix: this.pwmEr.getMajorData()
        };
    }
}
exports.GMotifEditor = GMotifEditor;


/***/ }),

/***/ "./src/Components/PWMEditor.tsx":
/*!**************************************!*\
  !*** ./src/Components/PWMEditor.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const Button_1 = __webpack_require__(/*! ../Widget/Button */ "./src/Widget/Button.tsx");
const NumberEditor_1 = __webpack_require__(/*! ../Widget/NumberEditor */ "./src/Widget/NumberEditor.tsx");
const Utility_1 = __webpack_require__(/*! ../Widget/Utility */ "./src/Widget/Utility.tsx");
const JSUtility_1 = __webpack_require__(/*! ../JSUtility */ "./src/JSUtility.ts");
const SeqLogo = __webpack_require__(/*! @baliga-lab/sequencelogo.js */ "./node_modules/@baliga-lab/sequencelogo.js/seqlogo.js");
const CSV_1 = __webpack_require__(/*! ../CSV */ "./src/CSV.ts");
const Wrapper_1 = __webpack_require__(/*! ../Widget/Wrapper */ "./src/Widget/Wrapper.tsx");
const StringEditor_1 = __webpack_require__(/*! ../Widget/StringEditor */ "./src/Widget/StringEditor.tsx");
class PEditor extends Widget_1.Editor {
    handle(cmd) {
        const handleFromConsensus = () => {
            let ed = new StringEditor_1.StringEditor();
            ed.initData("", undefined);
            Utility_1.ask(ed, {
                cancel: () => { },
                ok: () => {
                    let newData = [];
                    let alphabet = this.getMinorData().alphabet;
                    for (let ch of ed.getMajorData()) {
                        let d = {};
                        if (alphabet.indexOf(ch) >= 0) {
                            for (let code of alphabet) {
                                d[code] = (code == ch) ? 1 : 0;
                            }
                        }
                        else {
                            for (let code of alphabet) {
                                d[code] = 1 / alphabet.length;
                            }
                        }
                        newData.push(d);
                    }
                    this.updateMajorData(newData);
                }
            });
        };
        switch (cmd.message) {
            case "add-row": {
                const data = this.getMajorData();
                this.updateMajorData(data.concat([JSUtility_1.copy(this.getMinorData().background)]));
                return;
            }
            case "del-row": {
                const data = this.getMajorData();
                this.updateMajorData(data.slice(0, data.length - 1));
                return;
            }
            case "csv": {
                const alpha = this.getMinorData().alphabet;
                const data = this.getMajorData();
                const csvText = CSV_1.CSV.dump({ head: alpha, body: data });
                const textarea = JSXFactory.createElement("textarea", { cols: "30", rows: "10" });
                textarea.value = csvText;
                Utility_1.ask(new Wrapper_1.Wrapper(textarea), {
                    ok: () => {
                        const csv = CSV_1.CSV.parse(textarea.value);
                        console.log("ehhhh?", csv);
                        if (JSUtility_1.equal(csv.head, alpha)) {
                            this.updateMajorData(csv.body);
                        }
                        else {
                            alert("You must not change the header.");
                        }
                    },
                    cancel: () => { }
                });
                return;
            }
            case "consensus": {
                handleFromConsensus();
                return;
            }
        }
    }
    displayData(data, minor) {
        // To/From CSV
        const csvButton = new Button_1.Button();
        csvButton.initData({
            label: "To/From CSV",
            message: "csv"
        });
        csvButton.bind(this);
        // From Consensus
        const cssButton = new Button_1.Button();
        cssButton.initData({
            label: "From consensus",
            message: "consensus"
        });
        cssButton.bind(this);
        // add/delete row
        const addRowBtn = new Button_1.Button();
        const deleteRowBtn = new Button_1.Button();
        addRowBtn.initData({
            label: "+",
            message: "add-row"
        });
        deleteRowBtn.initData({
            label: "-",
            message: "del-row"
        });
        addRowBtn.bind(this);
        deleteRowBtn.bind(this);
        this.editorMaps = [];
        for (const row of data) {
            const editorMap = {};
            for (const code of minor.alphabet) {
                const e = new NumberEditor_1.NumberEditor();
                e.initData(row[code], {
                    min: 0,
                    max: 1,
                    step: 0.001
                });
                editorMap[code] = e;
            }
            this.editorMaps.push(editorMap);
        }
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("div", null,
            JSXFactory.createElement("table", null,
                JSXFactory.createElement("tr", null, minor.alphabet.map((b) => (JSXFactory.createElement("th", { style: { width: "6em" } }, b)))),
                this.editorMaps.map((table) => (JSXFactory.createElement("tr", null, minor.alphabet.map((code) => {
                    return JSXFactory.createElement("td", { style: { width: "6em" } }, table[code].getDOM());
                })))),
                JSXFactory.createElement("tr", null,
                    JSXFactory.createElement("td", { colspan: "2" }, addRowBtn.getDOM()),
                    JSXFactory.createElement("td", { colspan: "2" }, deleteRowBtn.getDOM()))),
            csvButton.getDOM(),
            cssButton.getDOM()));
    }
    getMajorData() {
        return this.editorMaps.map((table) => {
            const d = {};
            for (const code of Object.keys(table)) {
                d[code] = table[code].getMajorData();
            }
            return d;
        });
    }
}
function validatePWM(alphabet, pwm) {
    pwm.forEach((record, rowIndex) => {
        let sum = 0;
        for (const symbol of alphabet) {
            const p = record[symbol];
            if (!(0 <= p && p <= 1)) {
                throw Error("The probability at (" + rowIndex + "," + symbol + ") out of range.");
            }
            sum += p;
        }
        if (!JSUtility_1.floatEqual(sum, 1)) {
            throw Error("Row#" + (rowIndex + 1) + " sums up to " + sum + " (1 expected).");
        }
    });
}
class PWMEditor extends Widget_1.Editor {
    init() {
        super.init();
        this.viewer = new SeqLogoViewer();
        const content = JSXFactory.createElement("div", null, this.viewer.getDOM());
        content.addEventListener("click", () => {
            const ed = new PEditor();
            ed.initData(this.getMajorData(), this.getMinorData());
            Utility_1.ask(ed, {
                ok: () => {
                    const newData = ed.getMajorData();
                    try {
                        validatePWM(this.getMinorData().alphabet, newData);
                        this.updateMajorData(newData);
                    }
                    catch (e) {
                        alert("Invalid pwm: " + e.message);
                    }
                },
                cancel: () => { }
            });
        });
        JSXFactory.render(this.getDOM(), content);
    }
    displayData(data, minor) {
        this.viewer.initData({
            alphabet: minor.alphabet,
            pwm: data
        });
    }
}
exports.PWMEditor = PWMEditor;
class SeqLogoViewer extends Widget_1.Viewer {
    static newID() {
        SeqLogoViewer.count++;
        return "motif-viewer-canvas" + SeqLogoViewer.count.toString();
    }
    init() {
        super.init();
        this.id = SeqLogoViewer.newID();
        const logoEl = JSXFactory.createElement("div", { id: this.id });
        JSXFactory.render(this.getDOM(), logoEl);
    }
    displayData(data) {
        const transformMotif = (alphabet, pwm) => {
            return {
                alphabet: alphabet,
                values: pwm.map((row) => alphabet.map((code) => row[code]))
            };
        };
        JSUtility_1.later(() => {
            SeqLogo.makeLogo(this.id, transformMotif(data.alphabet, data.pwm), {});
        });
    }
}
SeqLogoViewer.count = 0;


/***/ }),

/***/ "./src/Components/SpacerEditor.tsx":
/*!*****************************************!*\
  !*** ./src/Components/SpacerEditor.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Widget_1 = __webpack_require__(/*! ../Widget/Widget */ "./src/Widget/Widget.tsx");
const DistributionEditor_1 = __webpack_require__(/*! ./DistributionEditor */ "./src/Components/DistributionEditor.tsx");
;
class SpacerEditor extends Widget_1.Editor {
    init() {
        super.init();
        this.distEd = new DistributionEditor_1.DistributionEditor();
        this.distEd.register(this, () => this.emitDataChange());
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("label", null,
            "Length distribution: ",
            this.distEd.getDOM()));
    }
    displayData(data) {
        this.distEd.initData(data.distribution, undefined);
    }
    getMajorData() {
        return {
            distribution: this.distEd.getMajorData()
        };
    }
}
exports.SpacerEditor = SpacerEditor;


/***/ }),

/***/ "./src/JSUtility.ts":
/*!**************************!*\
  !*** ./src/JSUtility.ts ***!
  \**************************/
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
function copy(x) {
    return JSON.parse(JSON.stringify(x));
}
exports.copy = copy;
function floatEqual(x, y) {
    const delta = 1E-5;
    return Math.abs(x - y) < delta;
}
exports.floatEqual = floatEqual;


/***/ }),

/***/ "./src/JSX/HTMLFactory.ts":
/*!********************************!*\
  !*** ./src/JSX/HTMLFactory.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function render(container, ...children) {
    container.innerHTML = "";
    for (const ch of children) {
        container.appendChild(ch);
    }
}
exports.render = render;
function createElement(tag, attr, ...children) {
    if (typeof tag === "function") {
        const builder = tag;
        const prop = attr;
        return builder(attr);
    }
    else {
        const e = document.createElement(tag);
        if (attr) {
            for (const key of Object.keys(attr)) {
                if (key === "id") {
                    e.id = attr.id;
                }
                else if (key === "class") {
                    for (const cls of attr.class) {
                        e.classList.add(cls);
                    }
                }
                else if (key === "style") {
                    const st = attr.style;
                    const styleList = Object.keys(st).map((k) => ({
                        name: k,
                        value: st[k]
                    }));
                    const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                    e.setAttribute("style", styleString);
                }
                else {
                    const a = attr;
                    e.setAttribute(key, a[key]);
                }
            }
            if (attr.style) {
                const st = attr.style;
                const styleList = Object.keys(st).map((k) => ({
                    name: k,
                    value: st[k]
                }));
                const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                e.setAttribute("style", styleString);
            }
        }
        if (children) {
            for (const ch of children) {
                if (typeof ch === "string" || typeof ch === 'number') {
                    e.appendChild(document.createTextNode(ch));
                }
                else if (ch instanceof Array) {
                    for (const c of ch) {
                        e.appendChild(c);
                    }
                }
                else if (ch instanceof Node) {
                    e.appendChild(ch);
                }
                else {
                    console.error("what's this?", ch);
                    throw new Error();
                }
            }
        }
        return e;
    }
}
exports.createElement = createElement;


/***/ }),

/***/ "./src/JSX/SVGFactory.ts":
/*!*******************************!*\
  !*** ./src/JSX/SVGFactory.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tag, attr, ...children) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attr) {
        for (const k of Object.keys(attr)) {
            if (k === "class") {
                for (const cls of attr.class) {
                    e.classList.add(cls);
                }
            }
            else if (k === "style") {
                const styleList = Object.keys(attr.style).map((k) => ({
                    name: k,
                    value: attr.style[k]
                }));
                const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                e.setAttribute("style", styleString);
            }
            else {
                e.setAttribute(k, attr[k]);
            }
        }
    }
    if (children) {
        for (const ch of children) {
            if (typeof ch === "string" || typeof ch === "number") {
                e.appendChild(document.createTextNode(ch + ""));
            }
            else if (ch instanceof SVGElement) {
                e.appendChild(ch);
            }
            else {
                console.log("???", ch);
            }
        }
    }
    return e;
}
exports.createElement = createElement;
function render(container, ...children) {
    container.innerHTML = "";
    for (const ch of children) {
        container.appendChild(ch);
    }
}
exports.render = render;


/***/ }),

/***/ "./src/SSPDL/SSPDL.ts":
/*!****************************!*\
  !*** ./src/SSPDL/SSPDL.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
var ElementKind;
(function (ElementKind) {
    ElementKind["Motif"] = "motif";
    ElementKind["GMotif"] = "g-motif";
    ElementKind["Spacer"] = "spacer";
})(ElementKind || (ElementKind = {}));
exports.ElementKind = ElementKind;


/***/ }),

/***/ "./src/SSPDL/Utility.ts":
/*!******************************!*\
  !*** ./src/SSPDL/Utility.ts ***!
  \******************************/
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
function tranverseModule(m, p) {
    return m.map((t) => {
        switch (t.kind) {
            case "element": {
                p(t);
                return;
            }
            case "alternation": {
                t.psubs.map((ps) => tranverseModule(ps.mod, p));
                return;
            }
            case "repetition": {
                tranverseModule(t.sub, p);
                return;
            }
        }
    });
}
exports.tranverseModule = tranverseModule;


/***/ }),

/***/ "./src/SVGComponents/Box.tsx":
/*!***********************************!*\
  !*** ./src/SVGComponents/Box.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/SVGFactory */ "./src/JSX/SVGFactory.ts");
exports.Box = (prop) => {
    return (JSXFactory.createElement("svg", { width: prop.size.toString(), height: prop.size.toString() },
        JSXFactory.createElement("rect", { x: 1, y: 1, width: prop.size - 2, height: prop.size - 2, fill: prop.fill, stroke: prop.stroke })));
};


/***/ }),

/***/ "./src/Widget/Button.tsx":
/*!*******************************!*\
  !*** ./src/Widget/Button.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class Button extends Widget_1.Controller {
    makeContainer() {
        return JSXFactory.createElement("button", { style: { width: "100%" } });
    }
    displayData(data) {
        const btn = this.getDOM();
        btn.addEventListener("click", () => {
            this.send({
                kind: "button",
                message: data.message
            });
        });
        JSXFactory.render(this.getDOM(), JSXFactory.createElement("span", null, data.label));
    }
}
exports.Button = Button;


/***/ }),

/***/ "./src/Widget/ColorEditor.tsx":
/*!************************************!*\
  !*** ./src/Widget/ColorEditor.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class ColorEditor extends Widget_1.Editor {
    makeContainer() {
        return JSXFactory.createElement("input", { type: "color" });
    }
    init() {
        super.init();
        this.inputElement = this.getDOM();
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data) {
        this.inputElement.value = data;
    }
    getMajorData() {
        return this.inputElement.value;
    }
}
exports.ColorEditor = ColorEditor;


/***/ }),

/***/ "./src/Widget/Menubar.tsx":
/*!********************************!*\
  !*** ./src/Widget/Menubar.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class Menubar extends Widget_1.Controller {
    makeContainer() {
        return (JSXFactory.createElement("div", { style: {
                display: "flex",
                "flex-direction": "row",
                "padding": "0",
                "margin": "0",
                "width": "100%",
                "background-color": "lightgrey"
            } }));
    }
    displayData(data) {
        const Button = (prop) => {
            // const btn = (
            //     <div style={{
            //         "display": "block",
            //         "cursor": "pointer",
            //         "padding": "0.2em 1em"
            //     }}>{prop.secondLevel}</div>
            // );
            const btn = JSXFactory.createElement("button", null, prop.secondLevel);
            btn.addEventListener("click", () => {
                this.send({
                    kind: "menubar",
                    firstLevel: prop.firstLevel,
                    secondLevel: prop.secondLevel
                });
            });
            return btn;
        };
        const MenubarItem = (prop) => {
            let dropdown;
            const item = (JSXFactory.createElement("div", { style: { "display": "inline" } },
                JSXFactory.createElement("div", { style: {
                        "cursor": "pointer",
                        "position": "relative",
                        "padding-left": "1em",
                        "padding-right": "1em",
                        "padding-top": "0.2em",
                        "padding-bottom": "0.2em",
                        "background-color": "lightgrey"
                    } }, prop.name),
                dropdown = (JSXFactory.createElement("div", { style: {
                        "flex-direction": "column",
                        "position": "absolute",
                        "display": "none",
                        "background-color": "white",
                        "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"
                    } }, prop.content.map((s) => (JSXFactory.createElement(Button, { firstLevel: prop.name, secondLevel: s })))))));
            item.addEventListener("mouseenter", () => {
                dropdown.style.display = "flex";
            });
            item.addEventListener("mouseleave", () => {
                dropdown.style.display = "none";
            });
            return item;
        };
        const container = this.getDOM();
        container.innerHTML = "";
        for (const m of data) {
            container.appendChild(JSXFactory.createElement(MenubarItem, { name: m.name, content: m.content }));
        }
    }
}
exports.Menubar = Menubar;


/***/ }),

/***/ "./src/Widget/NumberEditor.tsx":
/*!*************************************!*\
  !*** ./src/Widget/NumberEditor.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class NumberEditor extends Widget_1.Editor {
    makeContainer() {
        return JSXFactory.createElement("input", { type: "number", step: 0 });
    }
    init() {
        super.init();
        this.inputElement = this.getDOM();
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data, minor) {
        this.inputElement.value = data.toString();
        if (minor.step !== undefined) {
            this.inputElement.step = minor.step + "";
        }
        if (minor.min !== undefined) {
            this.inputElement.min = minor.min + "";
        }
        if (minor.max !== undefined) {
            this.inputElement.max = minor.max + "";
        }
    }
    getMajorData() {
        return parseFloat(this.inputElement.value);
    }
}
exports.NumberEditor = NumberEditor;


/***/ }),

/***/ "./src/Widget/Pile.tsx":
/*!*****************************!*\
  !*** ./src/Widget/Pile.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class Pile extends Widget_1.Frame {
    position(container, children) {
        JSXFactory.render(container, (JSXFactory.createElement("div", { style: { "display": "flex", "flex-direction": "column" } }, children.map((ch) => (ch.getDOM())))));
    }
}
exports.Pile = Pile;
class HPile extends Widget_1.Frame {
    position(container, children) {
        JSXFactory.render(container, (JSXFactory.createElement("div", { style: { "display": "flex", "flex-direction": "row" } }, children.map((ch) => (ch.getDOM())))));
    }
}
exports.HPile = HPile;


/***/ }),

/***/ "./src/Widget/StringEditor.tsx":
/*!*************************************!*\
  !*** ./src/Widget/StringEditor.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class StringEditor extends Widget_1.Editor {
    makeContainer() {
        return JSXFactory.createElement("input", { type: "text" });
    }
    init() {
        super.init();
        this.getDOM().addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data) {
        this.getDOM().value = data;
    }
    getMajorData() {
        return this.getDOM().value;
    }
}
exports.StringEditor = StringEditor;


/***/ }),

/***/ "./src/Widget/StringViewer.tsx":
/*!*************************************!*\
  !*** ./src/Widget/StringViewer.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class StringViewer extends Widget_1.Viewer {
    displayData(data) {
        JSXFactory.render(this.getDOM(), (JSXFactory.createElement("span", null, data)));
    }
}
exports.StringViewer = StringViewer;


/***/ }),

/***/ "./src/Widget/Utility.tsx":
/*!********************************!*\
  !*** ./src/Widget/Utility.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const Pile_1 = __webpack_require__(/*! ./Pile */ "./src/Widget/Pile.tsx");
const StringViewer_1 = __webpack_require__(/*! ./StringViewer */ "./src/Widget/StringViewer.tsx");
;
;
function popup(widget, exits, handlers) {
    const popupBox = (JSXFactory.createElement("div", { style: {
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        } },
        JSXFactory.createElement("div", { style: {
                "background-color": "white",
                "border": "1px solid grey",
                "padding": "1em",
                "max-width": "100%",
                "max-height": "100%",
                "overflow": "auto",
                "display": "flex",
                "flex-direction": "column",
                'align-items': 'center',
                'box-shadow': '0px 0px 3px 3px grey'
            } },
            JSXFactory.createElement("div", null, widget.getDOM()),
            JSXFactory.createElement("div", { style: {
                    display: "flex",
                    "margin-top": "1em",
                    "flex-direction": "row",
                    "justify-content": "flex-end",
                    "width": '100%'
                } }, exits.map((action) => {
                const btn = JSXFactory.createElement("button", { style: { width: "10em", "margin-left": "1em" } }, action.label);
                btn.addEventListener("click", () => {
                    popupBox.remove();
                    handlers[action.key]();
                });
                return btn;
            })))));
    document.body.appendChild(popupBox);
    return (key) => {
        popupBox.remove();
        if (handlers[key]) {
            handlers[key]();
            return;
        }
        else {
            console.error(key, handlers);
            throw Error();
        }
    };
}
exports.popup = popup;
function tell(widget, cypher = "OK") {
    const exit = popup(widget, [
        {
            label: cypher,
            key: "close"
        }
    ], {
        "close": () => { }
    });
    return new class {
        handle(cmd) {
            exit("close");
        }
    };
}
exports.tell = tell;
function ask(widget, handlers) {
    const exit = popup(widget, [
        {
            label: JSXFactory.createElement("span", { style: { color: "green" } }, "Ok"),
            key: "ok"
        },
        {
            label: "Cancel",
            key: "cancel"
        }
    ], handlers);
    return new class {
        handle(cmd) {
            if (cmd.command === "ok") {
                exit("ok");
            }
            else if (cmd.command === "cancel") {
                exit("cancel");
            }
        }
    };
}
exports.ask = ask;
function simpleAsk(question, ed, success, fail) {
    const vr = new StringViewer_1.StringViewer();
    vr.initData(question);
    const pile = new Pile_1.Pile();
    pile.setChildren([vr, ed]);
    ask(pile, {
        ok: () => {
            success(ed.getMajorData());
        },
        cancel: () => {
            fail();
        }
    });
}
exports.simpleAsk = simpleAsk;


/***/ }),

/***/ "./src/Widget/Widget.tsx":
/*!*******************************!*\
  !*** ./src/Widget/Widget.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSXFactory = __webpack_require__(/*! ../JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
class Widget {
    constructor() {
        this.dom = this.makeContainer();
        this.init();
    }
    makeContainer() {
        return JSXFactory.createElement("div", null);
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
    initData(data) {
        this.dataSetted = true;
        this.data = data;
        this.display();
    }
    getData() {
        if (this.dataSetted) {
            return this.data;
        }
        else {
            throw new Error("tried getting data before initialization");
        }
    }
    display() {
        this.displayData(this.getData());
    }
}
exports.Viewer = Viewer;
class Editor extends Widget {
    constructor() {
        super(...arguments);
        /*
         * Major Data: data editable by user input
         * Minor Data: not editable
         */
        this.dataChangeHandlers = new Set();
        this.majorDataSetted = false;
        this.minorDataSetted = false;
    }
    register(listener, handler) {
        this.dataChangeHandlers.add((data, source) => {
            if (source !== listener) {
                handler(data);
            }
        });
    }
    cancel(handler) {
        this.dataChangeHandlers.delete(handler);
    }
    emitDataChange(changeSource) {
        const data = this.getMajorData();
        changeSource = changeSource || this;
        for (const handler of this.dataChangeHandlers) {
            handler(data, changeSource);
        }
    }
    initData(data, extra) {
        this.majorDataSetted = true;
        this.majorData = data;
        this.minorData = extra;
        this.minorDataSetted = true;
        this.display();
    }
    updateMajorData(data, source) {
        if (!this.majorDataSetted) {
            debugger;
            throw new Error("update data before initialization");
        }
        else {
            this.majorData = data;
            this.display();
            this.emitDataChange(source || this);
        }
    }
    updateMinorData(extra) {
        if (!this.minorDataSetted) {
            debugger;
            throw new Error("update data before initialization");
        }
        else {
            this.minorData = extra;
            this.display();
        }
    }
    getMajorData() {
        if (this.majorDataSetted) {
            return this.majorData;
        }
        else {
            throw new Error("tried getting data before initialization");
        }
    }
    getMinorData() {
        if (this.minorDataSetted) {
            return this.minorData;
        }
        else {
            throw new Error("tried getting extra data before initialization");
        }
    }
    display() {
        this.displayData(this.majorData, this.minorData);
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


/***/ }),

/***/ "./src/Widget/Wrapper.tsx":
/*!********************************!*\
  !*** ./src/Widget/Wrapper.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./Widget */ "./src/Widget/Widget.tsx");
class Wrapper extends Widget_1.Widget {
    constructor(content) {
        super();
        this.content = content;
    }
    getDOM() {
        return this.content;
    }
}
exports.Wrapper = Wrapper;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ModelEditor_1 = __webpack_require__(/*! ./Components/ModelEditor */ "./src/Components/ModelEditor.tsx");
const JSXFactory = __webpack_require__(/*! ./JSX/HTMLFactory */ "./src/JSX/HTMLFactory.ts");
const e = JSXFactory.createElement("div", null);
const editor = new ModelEditor_1.ModelEditor();
editor.initData({
    alphabet: ["A", 'C', 'G', 'T'],
    namespace: {},
    background: { "A": 0.25, 'C': 0.25, 'G': 0.25, 'T': 0.25 },
    root: []
}, undefined);
document.body.appendChild(editor.getDOM());
document.body.style.padding = "0";


/***/ }),

/***/ "./src/widget.ts":
/*!***********************!*\
  !*** ./src/widget.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const JSUtility_1 = __webpack_require__(/*! ./JSUtility */ "./src/JSUtility.ts");
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
function SpacerBox(paper, label, pathString, x, y, width, height, handlerGroup) {
    paper = paper.g();
    const r = paper.rect(x, y, width, height).attr({
        "stroke": "white",
        "fill": "white",
        "smdl-path": pathString
    });
    const p = paper.path(Snap.format("M{x1},{y} V{h} M{x2},{y} V{h}", {
        "x1": x,
        "x2": x + width,
        "y": y,
        "h": y + height
    })).attr({
        "pointer-events": "none"
    });
    paper.text(x + width / 2, y + height / 2, label).attr({
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
function PWMBox(paper, label, fillColor, pathString, x, y, width, height, handlerGroup) {
    function fillToStroke(color) {
        const clr = Snap.color(color);
        const lightness = clr.l;
        return (lightness < 0.5) ? "white" : "black";
    }
    paper = paper.g();
    paper.transform(Snap.format("translate({x},{y})", {
        "x": x,
        "y": y
    }));
    const strokeColor = fillToStroke(fillColor);
    const r = paper.rect(0, 0, width, height, JSUtility_1.min(width / 3, height / 3)).attr({
        "stroke": strokeColor,
        "fill": fillColor,
        "smdl-path": pathString
    });
    paper.text(width / 2, height / 2, label).attr({
        "stroke": strokeColor,
        "fill": strokeColor,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.5 + "px"
    });
    registerHandlers(paper, handlerGroup);
    r.hover(() => {
        r.attr({
            "stroke": "blue"
        });
    }, () => {
        r.attr({
            "stroke": strokeColor
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