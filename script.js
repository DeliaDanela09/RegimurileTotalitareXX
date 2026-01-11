const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll(".section");

/* Schimbare secțiuni */
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("data-target");

    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    sections.forEach(sec => sec.classList.remove("active"));
    const activeSection = document.getElementById(target);
    activeSection.classList.add("active");

    // reset animații imagini când schimbi secțiunea
    activeSection.querySelectorAll(".image-card").forEach(card => {
      card.classList.remove("show");
    });
  });
});

/* Animație cinematică pe scroll */
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 150); // efect de „cascade”
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".image-card").forEach(card => {
  observer.observe(card);
});

/* efect 3D mic când miști mouse-ul peste poză */
document.querySelectorAll(".image-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 25;
    const rotateY = (x - centerX) / 25;

    card.style.transform = `
      scale(1.12)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});
