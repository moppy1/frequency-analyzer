// @ts-nocheck
'use strict';
// detect-browser.js v1.0.0
// Get Browser Data

// MIT License

// Copyright (c) 2018 Ahmad Raza

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


function isMobile() {
	return /Mobi/.test(navigator.userAgent);
}
//Added by MS
function isMobileDevice() 
{
  window.mobileAndTabletCheck = function()
  {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
  return window.mobileAndTabletCheck();
}
function isTouchDevice()
{
  try
  {
    document.createEvent("TouchEvent");
    return true;
  }
  catch (e)
  {
    return false;
  }
}
function isElectron()
{
	if(navigator && navigator.userAgent)
		return navigator.userAgent.indexOf('Electron') != -1;
	else
		return false;
}
function getBrowserName() {
	// Opera 8.0+
	if ((window.opr && window.opr.addons)
		|| window.opera
		|| navigator.userAgent.indexOf(' OPR/') >= 0) {
		return 'Opera';
	}

	// Firefox 1.0+
	if (typeof InstallTrigger !== 'undefined') {
		return 'Firefox';
	}

	// Safari 3.0+ "[object HTMLElementConstructor]"
	if (/constructor/i.test(window.HTMLElement) || (function (p) {
		return p.toString() === '[object SafariRemoteNotification]';
	})(!window['safari'])) {
		return 'Safari';
	}

	// Internet Explorer 6-11
	if (/* @cc_on!@*/false || document.documentMode) {
		return 'Internet Explorer';
	}

	// Edge 20+
	if (!(document.documentMode) && window.StyleMedia) {
		return 'Microsoft Edge';
	}
	
	// Chrome
	if (window.chrome) {
		return 'Chrome';
	}
}

function getOSName() {
	var os;
	if (isMobile()) {
		if (/Windows/.test(navigator.userAgent)) {
			os = 'Windows';
			if (/Phone 8.0/.test(navigator.userAgent)) {
				os += ' Phone 8.0';
			} else if (/Phone 10.0/.test(navigator.userAgent)) {
				os += ' Phone 10.0';
			}
		} else if (/Android/.test(navigator.userAgent)) {
			function androidVersion() {
				if (/Android/.test(navigator.appVersion)) {
					var v = (navigator.appVersion).match(/Android (\d+).(\d+)/);
					return v;
				}
			}

			var ver = androidVersion();
			os = ver[0];
		} else if (/iPhone;/.test(navigator.userAgent)) {
			function iOSversion() {
				if (/iP(hone|od|ad)/.test(navigator.appVersion)) {
					var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
					return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
				}
			}

			var ver = iOSversion();
			os = 'iOS ' + ver[0] + '.' + ver[1] + '.' + ver[2];
		} else if (/iPad;/.test(navigator.userAgent)) {
			function iOSversion() {
				if (/iP(hone|od|ad)/.test(navigator.appVersion)) {
					var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
					return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
				}
			}

			var ver = iOSversion();
			os = 'iOS ' + ver[0] + '.' + ver[1] + '.' + ver[2];
		} else if (/BBd*/.test(navigator.userAgent)) {
			os = 'BlackBerry';
		}
	} else {
		if (/Windows/.test(navigator.userAgent)) {
			os = 'Windows';
			if (/5.1;/.test(navigator.userAgent)) {
				os += ' XP';
			} else if (/6.0;/.test(navigator.userAgent)) {
				os += ' Vista';
			} else if (/6.1;/.test(navigator.userAgent)) {
				os += ' 7';
			} else if (/6.2/.test(navigator.userAgent)) {
				os += ' 8';
			} else if (/10.0;/.test(navigator.userAgent)) {
				os += ' 10';
			}

			if (/64/.test(navigator.userAgent)) {
				os += ' 64-bit';
			} else {
				os += ' 32-bit';
			}
		} else if (/Macintosh/.test(navigator.userAgent)) {
			os = 'Macintosh';
			if (/OS X/.test(navigator.userAgent)) {
				os += ' OS X';
			}
		}
	}

	return os;
}



function getBrowser() {
	return {
		os: getOSName(),
		browser: getBrowserName(),
		language: navigator.language,
		languages: navigator.languages,
		user_agent: navigator.userAgent,
		device: isMobile() ? 'Mobile' : 'Desktop',
		referrer: document.referrer || 'N/A',
		online: navigator.onLine,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screen_resolution: screen.width + ' x ' + screen.height,
		cookie_enabled: navigator.cookieEnabled,
		isTouchDevice: isTouchDevice(),
		isMobileDevice: isMobileDevice(),
		isElectron: isElectron()
	};
}


// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://ip-api.com/json');
// xhr.onreadystatechange = function () {
// 	if (xhr.readyState == 4) {
// 		if (xhr.status == 200) {
// 			var IPdata = xhr.responseText;
// 			jsonResponse = JSON.parse(IPdata);
// 		}
// 	}
// };
// xhr.send(null);
