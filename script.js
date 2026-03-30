document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".content-section");

    function activateSection(sectionId) {
        sections.forEach((section) => {
            section.classList.toggle("active-section", section.id === sectionId);
        });

        tabButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.section === sectionId);
        });
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activateSection(button.dataset.section);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    const projectHeads = document.querySelectorAll(".project-head");
    projectHeads.forEach((head) => {
        head.addEventListener("click", () => {
            const card = head.closest(".project-card");
            if (!card) return;

            const isOpen = card.classList.contains("open");
            projectHeads.forEach((item) => {
                const container = item.closest(".project-card");
                if (container) container.classList.remove("open");
                item.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                card.classList.add("open");
                head.setAttribute("aria-expanded", "true");
            }
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
