// Funkcija za prebacivanje između tabova
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = (tab.id === tabId) ? 'block' : 'none';
    });
}

// Podaci za preporuke đubriva
const recommendations = {
    "Malina": {
        "Konvencionalni": [
            { name: "Agriliquid N20", desc: "Tečno azotno đubrivo sa 35% organske materije", amount: "150 kg/ha" },
            { name: "Hyperphoska BLEU SK", desc: "NPK đubrivo za voćarske kulture", amount: "150 kg/ha" }
        ],
        "Organski": [
            { name: "Nervosol Organic NPK 4‑3‑4", desc: "Organsko đubrivo na bazi konjskog i živinskog stajnjaka", amount: "350 kg/ha" }
        ],
        "Mikrobiološki": [
            { name: "Baktersol N", desc: "Bioaktivator na bazi azotofiksirajućih bakterija", amount: "5 l/ha" }
        ]
    },
    "Paradajz": {
        "Konvencionalni": [
            { name: "Superferti Bi‑activ NPK", desc: "Za intenzivan porast i plodonošenje", amount: "200 kg/ha" }
        ],
        "Organski": [
            { name: "Panorama Bio Plus", desc: "Organski preparat sa aminokiselinama", amount: "350 kg/ha" }
        ],
        "Mikrobiološki": [
            { name: "Algomarine Bio SK PK", desc: "Alge i mikroorganizmi za koren", amount: "5 l/ha" }
        ]
    },
    "Kukuruz": {
        "Konvencionalni": [
            { name: "Agriliquid N20", desc: "Tečno azotno đubrivo sa 35% organske materije", amount: "150 kg/ha" },
            { name: "Superferti Bi‑activ NPK", desc: "Za visoke prinose", amount: "200 kg/ha" }
        ],
        "Organski": [
            { name: "Panorama Bio Plus", desc: "Organski stimulator rasta", amount: "350 kg/ha" }
        ],
        "Mikrobiološki": [
            { name: "Baktersol P", desc: "Mikroorganizmi za fosfor", amount: "5 l/ha" }
        ]
    },
    "Pšenica": {
        "Konvencionalni": [
            { name: "Agriliquid N20", desc: "Tečno azotno đubrivo sa 35% organske materije", amount: "150 kg/ha" },
            { name: "Hyperphoska BLEU SK", desc: "Za bolji razvoj korena", amount: "150 kg/ha" }
        ],
        "Organski": [
            { name: "Nervosol Organic NPK 4‑3‑4", desc: "Organsko đubrivo na bazi konjskog i živinskog stajnjaka", amount: "350 kg/ha" }
        ],
        "Mikrobiološki": [
            { name: "Mastro Starter NP", desc: "Mikroorganizmi za poboljšanje zemljišta", amount: "6 l/ha" }
        ]
    }
    // Dodaj ostale kulture po potrebi
};

// Funkcija za dobijanje preporuke đubriva
function getRecommendation() {
    const parcel = document.getElementById("parcel").value.trim();
    const culture = document.getElementById("culture").value;
    const type = document.getElementById("type").value;
    const result = document.getElementById("result");

    if (!parcel || !culture || !type) {
        result.innerHTML = "Molimo popunite sva polja.";
        return;
    }

    const list = (recommendations[culture] && recommendations[culture][type]) || [];

    if (list.length === 0) {
        result.innerHTML = `Nema preporuka za kombinaciju: ${culture} (${type})`;
        return;
    }

    result.innerHTML = `<strong>Preporuka za <em>${culture}</em> (${type.toLowerCase()} uzgoj):</strong><ul>` +
        list.map(item => `<li><strong>${item.name}</strong> (${item.amount})<br/><small>${item.desc}</small></li>`).join("") +
        "</ul>";
}

// Baza znanja i saveta
const knowledgeBase = {
    "Malina": "Malina je voćna kultura koja voli blago kiselo zemljište pH 5.5-6.5. Česte bolesti su plamenjača i siva plesan. Preporučuje se redovna kontrola i pravovremena zaštita.",
    "Plamenjača maline": "Plamenjača se kontroliše prskanjem fungicidima u ranoj fazi razvoja, naročito nakon kišnih perioda.",
    "Siva plesan": "Siva plesan je gljivična bolest koja može uzrokovati propadanje plodova, preporučuje se dobar protok vazduha i zaštitni tretmani.",
    "Saveti za đubrenje": "Đubrenje maline treba prilagoditi analizi zemljišta, koristi organska i mikrobiološka đubriva za zdrav rast.",
    // Dodaj po želji još stavki
};

// Prikaz detalja za temu iz baze znanja
function showKnowledge(topic) {
    const detail = document.getElementById('knowledge-detail');
    detail.innerHTML = knowledgeBase[topic] || "Nema dostupnih informacija za ovu temu.";
}

// Napravi listu tema u bazi znanja
function loadKnowledgeTopics() {
    const list = document.getElementById('knowledge-list');
    list.innerHTML = '';
    Object.keys(knowledgeBase).forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        li.onclick = () => showKnowledge(topic);
        list.appendChild(li);
    });
}

// Funkcija za analizu zemljišta i preporuke
function saveSoilAnalysis() {
    const parcel = document.getElementById('parcel-soil').value.trim();
    const ph = parseFloat(document.getElementById('ph').value);
    const n = parseInt(document.getElementById('n').value);
    const p = parseInt(document.getElementById('p').value);
    const k = parseInt(document.getElementById('k').value);
    const org = parseFloat(document.getElementById('org').value);
    const resultDiv = document.getElementById('soil-result');

    let advice = `<h3>Preporuke za parcelu <em>${parcel}</em>:</h3><ul>`;

    if (ph < 5.5) {
        advice += "<li>pH je nizak – preporučuje se krečnjenje zemljišta.</li>";
    } else if (ph > 7.5) {
        advice += "<li>pH je visok – moguće je dodati sumporne materije za zakiseljavanje.</li>";
    } else {
        advice += "<li>pH je u optimalnom opsegu.</li>";
    }

    if (n < 50) {
        advice += "<li>Nivo azota je nizak – preporučuje se đubrenje azotom.</li>";
    } else {
        advice += "<li>Nivo azota je dobar.</li>";
    }

    if (p < 30) {
        advice += "<li>Nivo fosfora je nizak – preporučuje se đubrenje fosforom.</li>";
    } else {
        advice += "<li>Nivo fosfora je dobar.</li>";
    }

    if (k < 100) {
        advice += "<li>Nivo kalijuma je nizak – preporučuje se đubrenje kalijumom.</li>";
    } else {
        advice += "<li>Nivo kalijuma je dobar.</li>";
    }

    if (org < 2) {
        advice += "<li>Nizak procenat organske materije – preporučuje se dodavanje organskog đubriva ili komposta.</li>";
    } else {
        advice += "<li>Organska materija je na dobrom nivou.</li>";
    }

    advice += "</ul>";

    resultDiv.innerHTML = advice;
}

// Po učitavanju stranice
window.onload = () => {
    showTab('recommendation'); // Prikaži prvi tab
    loadKnowledgeTopics();

    document.getElementById('soil-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveSoilAnalysis();
    });
};
