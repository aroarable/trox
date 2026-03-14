(function(){
  'use strict';

  // ---- DevTools detection via size difference ----
  var devtoolsOpen = false;
  var threshold = 160;

  function checkDevTools(){
    var widthDiff  = window.outerWidth  - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;
    if(widthDiff > threshold || heightDiff > threshold){
      if(!devtoolsOpen){
        devtoolsOpen = true;
        bust();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  // ---- DevTools detection via debugger timing trick ----
  function timerTrap(){
    var start = performance.now();
    (function(){ debugger; })();
    var end = performance.now();
    if(end - start > 100){
      bust();
    }
  }

  // ---- Redirect ----
  function bust(){
    // Clear page content instantly before redirect so code is never visible
    document.documentElement.innerHTML = '';
    window.location.replace('404.html');
  }

  // ---- Block Right Click ----
  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // ---- Block keyboard shortcuts ----
  document.addEventListener('keydown', function(e){
    var k = e.key || e.keyCode;
    var ctrl  = e.ctrlKey  || e.metaKey;
    var shift = e.shiftKey;

    // F12
    if(k === 'F12' || k === 123){ e.preventDefault(); e.stopPropagation(); bust(); return false; }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if(ctrl && shift && (k==='i'||k==='I'||k==='j'||k==='J'||k==='c'||k==='C')){ e.preventDefault(); e.stopPropagation(); bust(); return false; }
    // Ctrl+U (view source)
    if(ctrl && (k==='u'||k==='U')){ e.preventDefault(); e.stopPropagation(); return false; }
    // Ctrl+S (save)
    if(ctrl && (k==='s'||k==='S')){ e.preventDefault(); e.stopPropagation(); return false; }
    // Ctrl+A (select all)
    if(ctrl && (k==='a'||k==='A')){ e.preventDefault(); e.stopPropagation(); return false; }
    // F5 reload tricks - allow but block Ctrl+Shift+R hard refresh
    if(ctrl && shift && (k==='r'||k==='R')){ e.preventDefault(); e.stopPropagation(); return false; }
  }, true);

  // ---- Block text selection ----
  document.addEventListener('selectstart', function(e){ e.preventDefault(); return false; }, true);

  // ---- Block drag ----
  document.addEventListener('dragstart', function(e){ e.preventDefault(); return false; }, true);

  // ---- Continuous checks ----
  setInterval(checkDevTools, 500);
  setInterval(timerTrap, 1500);

  // ---- Override console to detect if devtools was opened ----
  var _c = console;
  var fakeConsole = {};
  ['log','warn','error','info','debug','table','dir'].forEach(function(m){
    fakeConsole[m] = function(){};
  });
  // Detect console open via getter trick
  var img = new Image();
  Object.defineProperty(img, 'id', {
    get: function(){
      bust();
    }
  });
  // Wrap in try so it doesn't crash if browser blocks
  try{ console.log('%c', img); } catch(e){}

  // Override console to noop after check
  try{
    Object.keys(_c).forEach(function(k){
      try{ console[k] = function(){}; } catch(e){}
    });
  } catch(e){}

})();
