const pages=[['提案首頁','index.html'],['事業地圖','map.html'],['合作契約','contract.html'],['服務說明書','service.html'],['進度表','progress.html']];
document.querySelectorAll('[data-nav]').forEach(el=>{el.innerHTML=`<nav class="nav"><div class="wrap navin"><a class="brand" href="index.html">BLESSINGS BAKERY</a><div class="links">${pages.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}</div></div></nav>`});
document.querySelectorAll('[data-footer]').forEach(el=>{el.innerHTML=`<footer><div class="wrap">Blessings Bakery × Sam Knowledge Power｜一年期知識事業共建提案</div></footer>`});
const previewButtons=document.querySelectorAll('[data-preview]');
if(previewButtons.length){
  document.body.insertAdjacentHTML('beforeend','<dialog class="preview-dialog"><div class="preview-bar"><strong></strong><div><a target="_blank" rel="noopener">新分頁開啟</a><button type="button" aria-label="關閉預覽">關閉</button></div></div><iframe title="頁內預覽"></iframe></dialog>');
  const dialog=document.querySelector('.preview-dialog'),frame=dialog.querySelector('iframe'),title=dialog.querySelector('strong'),open=dialog.querySelector('a');
  const close=()=>{dialog.close();frame.src='about:blank';document.body.classList.remove('preview-open')};
  previewButtons.forEach(button=>button.addEventListener('click',()=>{frame.src=button.dataset.preview;title.textContent=button.dataset.previewTitle||'頁內預覽';open.href=button.dataset.preview;dialog.showModal();document.body.classList.add('preview-open')}));
  dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('cancel',event=>{event.preventDefault();close()});dialog.addEventListener('click',event=>{if(event.target===dialog)close()});
}
