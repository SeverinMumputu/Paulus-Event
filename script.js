
        // 2. MOBILE MENU TOGGLE
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}
// 🔹 FERMER LE MENU MOBILE AU CLIC SUR UN LIEN
const mobileLinks = document.querySelectorAll('#mobile-menu a');

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});
//Cliquer en dehors pour fermer le bloc hamburger
document.addEventListener('click', (e) => {
    if (
        !menu.contains(e.target) &&
        !btn.contains(e.target) &&
        !menu.classList.contains('hidden')
    ) {
        menu.classList.add('hidden');
    }
});


        // 3. CAROUSEL HERO LOGIC
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

function changeSlide(index) {
    if (!slides.length || !dots.length) return;

    slides.forEach(s => {
        s.classList.remove('opacity-100');
        s.classList.add('opacity-0');
    });

    dots.forEach(d => {
        d.classList.remove('bg-paulus-gold', 'w-6');
        d.classList.add('bg-white', 'w-3');
    });

    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides[currentSlide]?.classList.remove('opacity-0');
    slides[currentSlide]?.classList.add('opacity-100');

    dots[currentSlide]?.classList.remove('bg-white', 'w-3');
    dots[currentSlide]?.classList.add('bg-paulus-gold', 'w-6');
}


        // Auto play
        setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 5000);

        // 4. RESERVATION LOGIC
        function showWhatsapp() {
            document.getElementById('reservation-action').classList.add('hidden');
            document.getElementById('whatsapp-block').classList.remove('hidden');
        }


        //Toast
    function showToast(message) {
    let toast = document.createElement("div");
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#1a1a1a";
    toast.style.color = "#fff";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity .3s ease";

    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.style.opacity = "1");

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

//Téléchargement réel
const selectedImages = new Set();

async function downloadImage(url) {
    try {
        showToast("Téléchargement en cours...");

        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur de téléchargement");

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = url.split("/").pop();
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(blobUrl);

        showToast("Téléchargement terminé");
    } catch (e) {
        showToast("Impossible de télécharger l’image");
        console.error(e);
    }
}
function openViewer(url) {
    const viewer = document.getElementById("image-viewer");
    const img = document.getElementById("viewer-image");

    img.src = url;
    viewer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeViewer() {
    const viewer = document.getElementById("image-viewer");
    const img = document.getElementById("viewer-image");

    viewer.classList.add("hidden");
    img.src = "";
    document.body.style.overflow = "";
}

// Fermer avec ESC
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeViewer();
});


        // 5. GALLERY LOGIC (Advanced Filtering)
        const galleryData = [
            { id: 1, event: 'mariage-kalonji', category: 'Entrée', url: 'arrivee_invite.jpg', desc: 'Arrivée des invités - 18h00' },
            { id: 2, event: 'mariage-kalonji', category: 'Entrée', url: 'entree_mariee.jpg', desc: 'Entrée des mariés - 18h50' },
            { id: 3, event: 'mariage-kalonji', category: 'Cérémonie', url: 'Presentation_MC.jpg', desc: 'Présentation du couple par le MC - 19h00' },
            { id: 4, event: 'mariage-kalonji', category: 'Cérémonie', url: 'couple_kalonji.jpg', desc: 'Prise photo du couple - 21h00' },
            { id: 5, event: 'mariage-kalonji', category: 'Danse', url: 'danse.jpg', desc: 'Quelques pas de danses des mariés - 20h00' },
            { id: 6, event: 'mariage-kalonji', category: 'Service', url: 'debut_service.jpg', desc: 'Début de service des boissons - 21h20' },
            { id: 7, event: 'mariage-kalonji', category: 'Repas', url: 'Partage.jpg', desc: 'Partage du gâteau - 22h20' },
            { id: 8, event: 'mariage-kalonji', category: 'Photo', url: 'mains_2.jpg', desc: 'Séance photo avec la mariée - 22h20' },
            
            { id: 9, event: 'paulus_mariiage_kalonji', category: 'Coordination', url: 'supervision.jpg', desc: 'Supervision et ajustements - 17h00' },
            { id: 10, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'Mise_en_place.jpg', desc: 'Mise en place du personnel - 17h15' },
            { id: 11, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'Mise_en_place_2.jpg', desc: 'Mise en place du personnel - 17h15' },
            { id: 12, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'arrivee_invite.jpg', desc: 'Accueil des invités - 18h00' },
            { id: 13, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'reception.jpg', desc: 'Réception des invités - 18h05' },
            { id: 14, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'positionnement.jpg', desc: 'Positionnement par secteurs - 18h15' },
            { id: 15, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'debut_service.jpg', desc: 'Partage de boissons - 21h20' },
            { id: 16, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'photo_ensemble_1.jpg', desc: 'Photo ensemble 1 - 22h20' },
            { id: 17, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'photo_ensemble_2.jpg', desc: 'Photo ensemble 2 - 22h20' },
            { id: 18, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'photo_ensemble_4.jpg', desc: 'Photo ensemble 3 - 22h20' },
            { id: 19, event: 'paulus_mariiage_kalonji', category: 'Service', url: 'photo_ensemble_3.jpg', desc: 'Photo ensemble 4 - 22h20' },

        ];

        const galleryContainer = document.getElementById('gallery-container');
        const filterBtns = document.querySelectorAll('.gallery-filter-btn');

        function renderGallery(items) {
            galleryContainer.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300';
                card.innerHTML = `
                    <img src="${item.url}" alt="${item.desc}" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span class="text-paulus-gold text-xs font-bold uppercase tracking-widest mb-1">${item.category}</span>
                        <h4 class="text-white font-serif text-lg">${item.desc}</h4>
                        <div class="mt-4 flex gap-2">
                             <button 
  onclick="openViewer('${item.url}')"
  class="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
>
   <i data-lucide="zoom-in" class="w-4 h-4"></i>
</button>

                             <button 
  class="bg-paulus-gold hover:bg-yellow-600 p-2 rounded-full text-white transition-colors"
  onclick="downloadImage('${item.url}')"
>
   <i data-lucide="download" class="w-4 h-4"></i>
</button>

                        </div>
                    </div>
                `;
                galleryContainer.appendChild(card);
            });
            lucide.createIcons();
        }

        function filterGallery(filter) {
            // UI Buttons Active State
            filterBtns.forEach(btn => {
                btn.classList.remove('bg-paulus-gold', 'text-white', 'border-paulus-gold');
                btn.classList.add('text-gray-600', 'border-gray-300');
            });
            // Highlight active button (target logic simplified for demo)
            event.target.classList.remove('text-gray-600', 'border-gray-300');
            event.target.classList.add('bg-paulus-gold', 'text-white', 'border-paulus-gold');

            // Data filtering
            if (filter === 'all') {
                renderGallery(galleryData);
            } else {
                const filtered = galleryData.filter(item => item.event === filter);
                renderGallery(filtered);
            }
        }

       function downloadAll() {
    if (selectedImages.size === 0) {
        showToast("Aucune image sélectionnée");
        return;
    }

    showToast("Téléchargement de la sélection...");

    let delay = 0;

    selectedImages.forEach(url => {
        setTimeout(() => {
            const link = document.createElement("a");
            link.href = url;
            link.download = url.split("/").pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, delay);

        delay += 300; // évite le blocage navigateur
    });
}


        // Init Gallery
        renderGallery(galleryData);

        // 6. SCROLL OBSERVER FADE IN
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });

        // 7. HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (!header) return;

    const inner = header.querySelector('.flex.items-center');
    const h24 = header.querySelector('.flex.items-center.h-24');

    if (window.scrollY > 50) {
        header.classList.add('shadow-md', 'h-20');
        h24?.classList.remove('h-24');
        inner?.classList.add('h-20');
    } else {
        header.classList.remove('shadow-md', 'h-20');
        inner?.classList.remove('h-20');
        inner?.classList.add('h-24');
    }
});

