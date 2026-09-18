/* =====================================
   ROUTE & ROUTINE - MAIN JAVASCRIPT
===================================== */


/* =====================================
   GOOGLE ANALYTICS
===================================== */

function loadAnalytics() {

    if (window.gtag) {
        return;
    }

    const script = document.createElement("script");

    script.async = true;

    script.src =
        "https://www.googletagmanager.com/gtag/js?id=G-CPT8ZZ804E";

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());

    gtag("config", "G-CPT8ZZ804E");

}


/* =====================================
   COOKIE BANNER
===================================== */

function initialiseCookieBanner() {

    const consent =
        localStorage.getItem("routeRoutineAnalyticsConsent");

    const banner = document.createElement("div");

    banner.id = "cookie-banner";

    banner.className = "cookie-banner";

    banner.setAttribute("role", "dialog");

    banner.setAttribute(
        "aria-label",
        "Cookie preferences"
    );

    banner.innerHTML = `

        <div class="cookie-banner-content">

            <div class="cookie-banner-text">

                <h3>We use analytics</h3>

                <p>
                    We use Google Analytics to understand how visitors
                    use our website and improve our services.
                    You can choose whether to allow analytics.
                    See our
                    <a href="privacy-policy.html">
                        Privacy Policy
                    </a>
                    for more information.
                </p>

            </div>

            <div class="cookie-banner-buttons">

                <button
                    type="button"
                    class="cookie-reject"
                    id="cookie-reject">

                    Reject

                </button>

                <button
                    type="button"
                    class="cookie-accept"
                    id="cookie-accept">

                    Accept

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(banner);


    const acceptButton =
        document.getElementById("cookie-accept");

    const rejectButton =
        document.getElementById("cookie-reject");


    function hideBanner() {

        banner.style.display = "none";

    }


    function showBanner() {

        banner.style.display = "block";

    }


    if (consent === "accepted") {

        hideBanner();

        loadAnalytics();

    }

    else if (consent === "rejected") {

        hideBanner();

    }

    else {

        showBanner();

    }


    acceptButton.addEventListener("click", function() {

        localStorage.setItem(
            "routeRoutineAnalyticsConsent",
            "accepted"
        );

        hideBanner();

        loadAnalytics();

    });


    rejectButton.addEventListener("click", function() {

        localStorage.setItem(
            "routeRoutineAnalyticsConsent",
            "rejected"
        );

        hideBanner();

    });


    const cookiePreferences =
        document.getElementById("cookie-preferences");

    if (cookiePreferences) {

        cookiePreferences.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showBanner();

            }
        );

    }

}


/* =====================================
   ACCORDION
===================================== */

function initialiseAccordions() {

    const acc =
        document.querySelectorAll(".accordion");

    acc.forEach(button => {

        button.addEventListener("click", () => {

            const panel =
                button.nextElementSibling;

            if (panel.style.maxHeight) {

                panel.style.maxHeight = null;

                panel.style.padding = "0 14px";

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            else {

                panel.style.maxHeight =
                    panel.scrollHeight + 40 + "px";

                panel.style.padding =
                    "12px 14px";

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

}


/* =====================================
   SCROLL ANIMATION
===================================== */

function initialiseScrollAnimation() {

    const reveals =
        document.querySelectorAll(".reveal");


    function revealOnScroll() {

        reveals.forEach(item => {

            if (
                item.getBoundingClientRect().top <
                window.innerHeight - 100
            ) {

                item.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();

}


/* =====================================
   SERVICE SELECTOR
===================================== */

function initialiseServiceSelector() {

    const serviceType =
        document.getElementById("serviceType");

    const route =
        document.getElementById("route-options");

    const routine =
        document.getElementById("routine-options");


    if (
        !serviceType ||
        !route ||
        !routine
    ) {

        return;

    }


    route.style.display = "none";

    routine.style.display = "none";


    serviceType.addEventListener(
        "change",
        function() {

            route.style.display = "none";

            routine.style.display = "none";


            if (this.value === "route") {

                route.style.display = "block";

            }


            if (this.value === "routine") {

                routine.style.display = "block";

            }

        }
    );

}


/* =====================================
   MOBILE MENU
===================================== */

function initialiseMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (
        !menuToggle ||
        !navLinks
    ) {

        return;

    }


    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");


            menuToggle.textContent =
                isOpen ? "✕" : "☰";


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove("active");

                    menuToggle.textContent = "☰";

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =====================================
   PACKAGE HASH LINKS
===================================== */

function initialisePackageHashLinks() {

    const hash =
        window.location.hash;


    if (!hash) {

        return;

    }


    const id =
        hash.substring(1);


    const selectedList =
        document.getElementById(id);


    if (selectedList) {

        const button =
            document.querySelector(
                '.package-category[onclick*="' + id + '"]'
            );


        if (
            button &&
            typeof showPackages === "function"
        ) {

            showPackages(id, button);

        }

    }

}


/* =====================================
   INITIALISE WEBSITE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initialiseCookieBanner();

        initialiseAccordions();

        initialiseScrollAnimation();

        initialiseServiceSelector();

        initialiseMobileMenu();

        initialisePackageHashLinks();

    }
);