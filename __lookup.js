const fs = require("fs");
const h = fs.readFileSync("src/app/components/admin/admin-quotes/admin-quotes.component.html", "utf8");
// mostrar contexto de uso
["quotes-list","row-2"].forEach(function(cls){
  const re = new RegExp(cls);
  let m;
  while ((m = re.exec(h)) !== null) {
    const s = Math.max(0, m.index - 60);
    const e = Math.min(h.length, m.index + 80);
    console.log(cls + " @ " + m.index + " -> " + JSON.stringify(h.substring(s, e)));
  }
});
