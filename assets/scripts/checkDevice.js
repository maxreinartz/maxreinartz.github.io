/*
  Creeper76's Software License
  
  Copyright (c) 2024 Creeper76

  This software is licensed under the terms of Creeper76's Software License.
  See the LICENSE file for more details.

  This software is provided "as is", without warranty of any kind, express or implied.
  The author(s) of the software are not liable for any damages or losses arising from the use of the software.
*/

function getDeviceType() {
  if (isMobileDevice()) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  const browsers = {
    Chrome: /chrome/i,
    Safari: /safari/i,
    FireFox: /firefox/i,
    BestBrowserEver_Aka_InternetExplorer_LoveYouMicrosoft: /msie|trident/i,
    Edge: /edge/i,
    Opera: /opera|OPR/i
  };

  for (let key in browsers) {
    if (browsers[key].test(userAgent)) {
      return key;
    }
  }

  return "Unknown | Agent: " + userAgent;
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export {getDeviceType, getBrowser};