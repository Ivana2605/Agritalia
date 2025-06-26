// JavaScript source code
// Ključ za lokalnu memoriju
const STORAGE_KEY = "agrialiaBerbaMalinePodaci";

function ucitajPodatke() {
    const podaciJson = localStorage.getItem(STORAGE_KEY);
    return podaciJson ? JSON.parse(podaciJson) : [];
}

function sacuvajPodatke(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

// Logika za index.html
if (document.getElementById("berbaForm")) {
    const forma = document.getElementById("berbaForm");
    forma.addEventListener("submit", (e) => {
        e.preventDefault();

        const noviUnos = {
            datum: forma.datum.value,
            kolicina: parseFloat(forma.kolicina.value),
            cena: parseFloat(forma.cena.value),
            beraci: parseInt(forma.beraci.value),
            sati: parseFloat(forma.sati.value),
            trosakSat: parseFloat(forma.trosakSat.value),
        };

        // Minimalna validacija (input required već postoji)
        if (!noviUnos.datum) {
            alert("Unesite datum!");
            return;
        }

        let podaci = ucitajPodatke();
        podaci.push(noviUnos);
        sacuvajPodatke(podaci);

        alert("Podaci su sačuvani.");

        forma.reset();
    });

    document.getElementById("btnIzvestaj").addEventListener("click", () => {
        window.location.href = "izvestaj.html";
    });
}

// Logika za izvestaj.html
if (document.getElementById("izvestajTabela")) {
    const podaci = ucitajPodatke();
    const tbody = document.querySelector("#izvestajTabela tbody");

    let totalKolicina = 0;
    let totalPrihod = 0;
    let totalBeraci = 0;
    let totalSati = 0;
    let totalTrosak = 0;
    let totalZarada = 0;

    podaci.forEach((p) => {
        const prihod = p.kolicina * p.cena;
        const trosak = p.sati * p.trosakSat;
        const zarada = prihod - trosak;

        totalKolicina += p.kolicina;
        totalPrihod += prihod;
        totalBeraci += p.beraci;
        totalSati += p.sati;
        totalTrosak += trosak;
        totalZarada += zarada;

        const red = document.createElement("tr");
        red.innerHTML = `
            <td>${p.datum}</td>
            <td>${p.kolicina.toFixed(2)}</td>
            <td>${p.cena.toFixed(2)}</td>
            <td>${prihod.toFixed(2)}</td>
            <td>${p.beraci}</td>
            <td>${p.sati.toFixed(2)}</td>
            <td>${trosak.toFixed(2)}</td>
            <td>${zarada.toFixed(2)}</td>
        `;
        tbody.appendChild(red);
    });

    document.getElementById("totalKolicina").textContent = totalKolicina.toFixed(2);
    document.getElementById("totalPrihod").textContent = totalPrihod.toFixed(2);
    document.getElementById("totalBeraci").textContent = totalBeraci;
    document.getElementById("totalSati").textContent = totalSati.toFixed(2);
    document.getElementById("totalTrosak").textContent = totalTrosak.toFixed(2);
    document.getElementById("totalZarada").textContent = totalZarada.toFixed(2);

    document.getElementById("btnNazad").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
