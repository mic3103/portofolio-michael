var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("asu").style.top = "0";
  } else {
    document.getElementById("asu").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

const roles = ["WEB DEVELOPER", "VIDEO EDITOR", "MUSIC PRODUCER", "GRAPHIC DESIGNER"];
    let index = 0;
    let charIndex = 0;
    let currentText = "";
    let isDeleting = false;
    const speed = 100;
    
    function typeEffect() {
        const typewriter = document.getElementById("typewriter");

        if (!isDeleting && charIndex < roles[index].length) {
            currentText += roles[index][charIndex];
            charIndex++;
            setTimeout(typeEffect, speed);
        } else if (isDeleting && charIndex > 0) {
            currentText = currentText.slice(0, -1);
            charIndex--;
            setTimeout(typeEffect, speed / 2);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                index = (index + 1) % roles.length;
            }
            setTimeout(typeEffect, 1000);
        }

        typewriter.innerHTML = `<mark>${currentText}</mark>`;
    }

    document.addEventListener("DOMContentLoaded", () => {
        typeEffect();
    });


    document.addEventListener("DOMContentLoaded", function () {
        let awardsList = document.querySelector("#awards ul");
        let awardsItems = Array.from(awardsList.children);
    
        awardsItems.sort((a, b) => {
            let yearA = parseInt(a.querySelector("span").textContent);
            let yearB = parseInt(b.querySelector("span").textContent);
            return yearB - yearA; // Urutkan dari yang terbaru ke terlama
        });
    
        awardsList.innerHTML = ""; // Kosongkan dulu list
        awardsItems.forEach(item => awardsList.appendChild(item)); // Masukkan item kembali dalam urutan baru
    });

    

    document.addEventListener("DOMContentLoaded", function () {
        let eduList = document.querySelector("#education ul");
        let eduItems = Array.from(eduList.children);
    
        eduItems.sort((a, b) => {
            let textA = a.querySelector("span").textContent;
            let textB = b.querySelector("span").textContent;
    
            let yearA = textA.includes("Now") ? Infinity : Math.max(...(textA.match(/\d{4}/g) || [0]).map(Number));
            let yearB = textB.includes("Now") ? Infinity : Math.max(...(textB.match(/\d{4}/g) || [0]).map(Number));
    
            return yearB - yearA; // Urutkan dari yang terbaru ke yang terlama
        });
    
        eduList.innerHTML = ""; // Kosongkan dulu list
        eduItems.forEach(item => eduList.appendChild(item)); // Masukkan item kembali dalam urutan baru
    });

    
    document.addEventListener("DOMContentLoaded", function () {
        let expList = document.querySelector("#experience ul");
        let expItems = Array.from(expList.children);
    
        expItems.sort((a, b) => {
            let textA = a.querySelector("span").textContent;
            let textB = b.querySelector("span").textContent;
    
            let extractYear = (text) => {
                let years = text.match(/\d{4}/g);
                return years ? Math.max(...years.map(Number)) : 0; // Ambil tahun terbesar
            };
    
            let yearA = extractYear(textA);
            let yearB = extractYear(textB);
    
            return yearB - yearA; // Urutkan dari terbaru ke terlama
        });
    
        expList.innerHTML = ""; // Kosongkan dulu list
        expItems.forEach(item => expList.appendChild(item)); // Masukkan item kembali dalam urutan baru
    });

    
    function revealOnScroll() {
        const elements = document.querySelectorAll('.hidden');
        const windowHeight = window.innerHeight;

        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                el.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Panggil sekali untuk elemen yang sudah terlihat di awal