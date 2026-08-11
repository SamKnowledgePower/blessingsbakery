const pages=[['提案首頁','index.html'],['合作契約','contract.html'],['服務說明書','service.html'],['進度表','progress.html'],['商模地圖','map.html']];
document.querySelectorAll('[data-nav]').forEach(el=>{el.innerHTML=`<nav class="nav"><div class="wrap navin"><a class="brand" href="index.html">BLESSINGS BAKERY</a><div class="links">${pages.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}</div></div></nav>`});
document.querySelectorAll('[data-footer]').forEach(el=>{el.innerHTML=`<footer><div class="wrap">Blessings Bakery × Sam Knowledge Power｜一年期知識事業共建提案</div></footer>`});
