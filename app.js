
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

document.getElementById('unosForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const podatak = {
    datum: document.getElementById('datum').value,
    kolicina: parseFloat(document.getElementById('kolicina').value),
    cena: parseFloat(document.getElementById('cena').value),
    beraci: parseInt(document.getElementById('beraci').value),
    sati: parseFloat(document.getElementById('sati').value),
    trosakPoSatu: parseFloat(document.getElementById('trosakPoSatu').value)
  };
  const svi = JSON.parse(localStorage.getItem('berba') || '[]');
  svi.push(podatak);
  localStorage.setItem('berba', JSON.stringify(svi));
  document.getElementById('uspehPoruka').textContent = "✅ Sačuvano!";
  this.reset();
});
