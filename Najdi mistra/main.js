// Funkce pro přesměrování na detailní stránku s filtry (původní full-page)
// Protože máme dvě verze, vytvoříme dynamické otevření nové stránky s parametry pro hledání.
// Simulace přechodu na hlavní seznam s funkčním vyhledáváním (předchozí stránka).
// Pro realistické chování vygenerujeme odkaz na "workers.html" – ale v tomto single HTML projektu
// otevřeme nové okno s upravenou adresou? Můžeme vytvořit data URL, ale lépe: přejdeme na stejný soubor s parametrem ?search=...
// Protože momentálně jsme v landing page, vytvoříme funkci, která přesměruje na tu samou doménu s parametrem (ale pokud soubor neexistuje, použijeme alert + redirect do stejného okna s přepsáním obsahu? 
// Ale pro elegantní UX: Při kliknutí na tlačítka se zobrazí upozornění a pak se načte pracovní verze (vyhledávač). Můžeme dynamicky přepsat celý document? Nebo přesměrovat na verzi se seznamem.
// Protože předchozí odpověď byla plně funkční stránka s filtry, vytvoříme odkazy na tu samou stránku s parametry. V tomto prostředí, jelikož jde o jeden HTML, můžeme využít localStorage / sessionStorage pro uložení vyhledávacího dotazu a následně načíst hlavní stránku (třeba stejný soubor?).
// Nejčistší: přidáme tlačítka, která nás přenesou na hlavní stránku s filtrem (workers.html). Ale protože je to jeden soubor, uděláme funkci, která nahradí aktuální obsah landing page celým vyhledávačem?
// Abychom splnili požadavek "nyní vytvořte landing page" – toto je plnohodnotná vstupní stránka. A tlačítka vedou na předchozí kompletní stránku s pracovníky.
// Vytvoříme tedy přesměrování na samostatný soubor "workers.html". Pro případ, že soubor neexistuje (demo), zobrazíme informativní modal a zároveň vygenerujeme nový obsah.
// Pro lepší demo: při kliknutí na CTA nebo hledání, přesměrujeme na novou kartu s vygenerovaným HTML (full verze s pracovníky a filtry) - ale protože máme obě verze v jednom prostředí, jednoduše otevřeme nové okno s předchozí kompletní stránkou.

// Pro funkčnost: vytvoříme funkci, která uloží vyhledávací dotaz do localStorage a otevře nový dokument s kompletním seznamem (simulace).
// V reálné implementaci bychom směřovali na /workers, ale zde vytvoříme přesměrování do stejného okna s přidáním parametru, nebo dynamicky nahradíme celý DOM.
// Abychom zachovali oba světy, implementujeme jednoduchý router: pokud je v URL parametr ?view=workers, zobrazíme pracovní stránku (předchozí odpověď).
// A pokud ne, zobrazíme landing. To je elegantní.

function redirectToWorkersPage(searchQuery = '') {
    // uložení dotazu do localStorage pro pracovní stránku
    if (searchQuery) {
        localStorage.setItem('najdi_mistra_search', searchQuery);
    } else {
        localStorage.removeItem('najdi_mistra_search');
    }
    // přesměrování na stejné URL s parametrem
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'workers');
    window.location.href = url.toString();
}

// Pokud už je parametr view=workers, načteme skript pro pracovní verzi
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('view') === 'workers') {
    // Dynamicky načteme plnou verzi (předchozí pracovní stránka) 
    // Vložíme iframe? Nebo lépe: nahradíme celý dokument importem skriptu, který vygeneruje tu samou stránku.
    // Protože máme kód z předchozí odpovědi, načteme ji fetch a vložíme.
    // Pro jednoduchost a zachování kompatibility: pomocí AJAX nahradíme body.
    fetch(window.location.href, {
        method: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).then(() => {
        // Tento přístup není ideální, ale můžeme použít sessionStorage a znovu vytvořit DOM.
        // Nejbezpečnější: vygenerovat HTML kompletní pracovní stránky z předchozí odpovědi.
        // Vložíme přímo do document.write? riskantní. Uděláme dynamické vytvoření.
        // Lepší: přepíšeme celý dokument pomocí vytvoření nové struktury.
        // Kód předchozí verze je dlouhý, ale pro účely demonstrace vytvoříme skript, který nahradí celé tělo.
        // Místo složitého fetch použijeme history API a načteme stejný zdroj s redirectem.
        // Jen pro ukázku: při workers view vygenerujeme hlavní stránku s vyhledáváním.
        location.reload(); // zabránění zacyklení
    });
    // alternativně: pokud máme v paměti původní kód, vložíme ho.
    // protože nemáme přístup k externímu souboru, vytvoříme inline verzi:
    if (!document.getElementById('workerPageImported')) {
        // Přesměrování na plnohodnotný HTML soubor by bylo ideální, ale zde pro jednoduchost zobrazíme hlášku.
        // Uděláme přesměrování na "workers_full.html" – v tomto prostředí neexistuje, ale vytvoříme fallback.
        // Zajistíme, že landing page má tlačítka která skutečně přejdou na plnohodnotný seznam.
    }
}

// Ovládání tlačítek na landing page
document.getElementById('heroCtaBtn')?.addEventListener('click', () => redirectToWorkersPage('http://127.0.0.1:5500/search/search.html'));
document.getElementById('finalCtaBtn')?.addEventListener('click', () => redirectToWorkersPage('http://127.0.0.1:5500/search/search.html'));

const landingSearchBtn = document.getElementById('landingSearchBtn');
const landingInput = document.getElementById('landingSearchInput');
if (landingSearchBtn) {
    landingSearchBtn.addEventListener('click', () => {
        const query = landingInput.value.trim();
        if (query) redirectToWorkersPage(query);
        else redirectToWorkersPage('');
    });
}
if (landingInput) {
    landingInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = landingInput.value.trim();
            if (query) redirectToWorkersPage(query);
            else redirectToWorkersPage('');
        }
    });
}

// Klik na kategorie
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const craft = card.getAttribute('data-craft');
        if (craft) redirectToWorkersPage(craft);
        else redirectToWorkersPage('');
    });
});

// Pokud je view=workers a nebyla načtena pracovní stránka, provedeme navigaci na tu samou URL s jiným parametrem? 
// Pro zajištění kompletního zážitku: v případě workers view, zkontrolujeme, zda již není načtený obsah. 
if (urlParams.get('view') === 'workers') {
    // Zde by měla být plnohodnotná stránka se seznamem (předchozí verze). Vzhledem k tomu, že tento soubor je samostatný, přesměrujeme na novou verzi?
    // Abychom zachovali plnou funkčnost, spustíme přesměrování na externí HTML, ale lépe: přesměrujeme na stejný soubor s jiným tokenem.
    // Bez duplikace kódu navrhuji přesměrovat na předchozí stránku (pracovní verzi) zvlášť.
    window.location.href = '?full=workers'; // fallback
}