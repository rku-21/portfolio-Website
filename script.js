document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".content-section");
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    let activeSectionId = document.querySelector(".content-section.active-section")?.id || sections[0]?.id;

    function applyDesktopTabs() {
        sections.forEach((section) => {
            section.classList.toggle("active-section", section.id === activeSectionId);
        });

        tabButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.section === activeSectionId);
        });
    }

    function applyLayoutMode() {
        if (desktopQuery.matches) {
            applyDesktopTabs();
            return;
        }

        sections.forEach((section) => section.classList.add("active-section"));
        tabButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.section === activeSectionId);
        });
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!desktopQuery.matches) return;
            activeSectionId = button.dataset.section;
            applyDesktopTabs();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", applyLayoutMode);
    } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(applyLayoutMode);
    }

    window.addEventListener("resize", applyLayoutMode);
    applyLayoutMode();

    const projectHeads = document.querySelectorAll(".project-head");
    projectHeads.forEach((head) => {
        head.addEventListener("click", () => {
            const card = head.closest(".project-card");
            if (!card) return;

            const isOpen = card.classList.contains("open");
            card.classList.toggle("open", !isOpen);
            head.setAttribute("aria-expanded", String(!isOpen));
        });
    });

    const statValues = document.querySelectorAll(".stat-card .value");
    function animateValue(element) {
        const target = Number(element.dataset.target || 0);
        const decimals = Number(element.dataset.decimals || 0);
        const suffix = element.dataset.suffix || "";
        const duration = 1400;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            if (decimals > 0) {
                element.textContent = value.toFixed(decimals) + suffix;
            } else {
                element.textContent = Math.floor(value) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    const statsGrid = document.getElementById("statsGrid");
    if (statsGrid) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    statValues.forEach((valueNode) => animateValue(valueNode));
                    observer.disconnect();
                });
            },
            { threshold: 0.35 }
        );

        observer.observe(statsGrid);
    }

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const submitButton = this.querySelector("button[type='submit']");
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Sending...";

            try {
                const formData = new FormData(this);
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                });

                submitButton.innerHTML = "<i class='fas fa-check'></i> Sent";
                this.reset();
            } catch (error) {
                submitButton.innerHTML = "<i class='fas fa-xmark'></i> Failed";
            }

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 2200);
        });
    }
});
