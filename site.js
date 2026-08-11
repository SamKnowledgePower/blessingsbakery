const pages=[['提案首頁','index.html'],['事業大地圖','map.html'],['服務說明書','service.html'],['合作契約','contract.html'],['專案進度','progress.html'],['管理入口','admin.html']];
document.querySelectorAll('[data-nav]').forEach(el=>{el.innerHTML=`<nav class="nav"><div class="wrap navin"><a class="brand" href="index.html">BLESSINGS BAKERY</a><div class="links">${pages.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}</div></div></nav>`});
document.querySelectorAll('[data-footer]').forEach(el=>{el.innerHTML=`<footer><div class="wrap">Blessings Bakery × Sam Knowledge Power｜一年期知識事業共建提案</div></footer>`});
