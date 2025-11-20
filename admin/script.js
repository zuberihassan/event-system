async function load() {
  const res = await fetch("http://localhost:5000/api/guests");
  const guests = await res.json();

  const total = guests.length;
  const attended = guests.filter(g => g.attended === true).length;
  const remaining = total - attended;

  document.getElementById("total").textContent = total;
  document.getElementById("attended").textContent = attended;
  document.getElementById("remaining").textContent = remaining;
}

load();
