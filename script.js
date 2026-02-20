// Bagian Fitur dan Toggle

const toggleButton = document.getElementById("toggleFeatures");
const semuaKartu = document.querySelectorAll(".feature-card");
const bagianFitur = document.querySelector(".features");

let opened = false;

// fungsi toggle untuk tombol show more dan show less madam
toggleButton.addEventListener("click", () => {
    opened = !opened;

    semuaKartu.forEach((kartu, urutan) => {
        if (urutan >= 3) {
            if (opened) {
                kartu.style.display = "block";
                setTimeout(() => {
                    kartu.classList.remove("hidden");
                    kartu.classList.add("animate-in");
                }, urutan * 100); 
            } else {
                kartu.classList.remove("animate-in");
                setTimeout(() => {
                    kartu.classList.add("hidden");
                    kartu.style.display = "none";
                }, 300);
            }
        }
    });

    if (opened) {
        setTimeout(() => pantauKartuBaru(), 500);
    }

    toggleButton.innerHTML = opened
        ? `Show Less <img src="public/image/SVG/iconnaik.svg" alt="Arrow up icon"/>`
        : `Show More <img src="public/image/SVG/iconturun.svg" alt="Arrow down icon"/>`;
});

// Scroll reveal animations
// Penjelasan mengenai opsi pengamat :
// Jadi untuk opsi pengamat/observer options kami buat untuk maintain atau membatasi elemen di halaman, apakah sedang 
// terlihat di layar atau tidak, dengan root null berarti kita menggunakan viewport sebagai acuan, threshold 0.1 berarti animasi akan dikeluarkan ketika 10% dari elemen terlihat, dan rootMargin untuk memberikan sedikit ruang sebelum animasi digunakan (dalam hal ini 100px sebelum nantinya masing masing elemen nanti kelihatan semua).
// index = urutan buat toggle fitur nya mulai dari 0,1,2 yang pertama muncul dilayar madam, nanti buat sisanya tuh di hidden
const opsiPengamat = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

// fungsi callback untuk pengamat, yang akan dipanggil setiap kali elemen itu masuk atau keluar dari viewport. Di dalam fungsi ini, kita memeriksa apakah elemen sedang terlihat dilayar atau tidak
// Jika elemen terlihat, kita menambahkan kelas "animate-in" untuk menghasilkan animasi masuk. kemudian kita menggunakan setTimeout untuk memberikan efek stagger pada animasi, sehingga setiap card akan muncul dengan sedikit delay berdasarkan urutannya.
const fungsiPengamat = (daftarElemen) => {
    daftarElemen.forEach((elemen) => {
        if (elemen.isIntersecting) {
            const kartu = elemen.target;
            const urutan = parseInt(kartu.getAttribute("data-index"));
            
            setTimeout(() => {
                kartu.classList.add("animate-in");
            }, urutan * 100);
        } else {
            const kartu = elemen.target;
            kartu.classList.remove("animate-in");
        }
    });
};

const pengamat = new IntersectionObserver(fungsiPengamat, opsiPengamat);

semuaKartu.forEach((kartu, urutan) => {
    if (urutan < 3) {
        pengamat.observe(kartu);
    }
});

const pantauKartuBaru = () => {
    semuaKartu.forEach((kartu, urutan) => {
        if (urutan >= 3 && !kartu.classList.contains('hidden')) {
            pengamat.observe(kartu);
        }
    });
};