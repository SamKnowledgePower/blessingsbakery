import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
assert.equal(files.length,5,'site must contain five HTML pages');
const docs=Object.fromEntries(await Promise.all(files.map(async f=>[f,await readFile(f,'utf8')])));
const progressData=await readFile('progress.js','utf8');
for(const [file,html] of Object.entries(docs)){
  assert.match(html,/lang="zh-Hant"/,`${file}: language missing`);
  assert.match(html,/name="viewport"/,`${file}: responsive viewport missing`);
  if(file==='progress.html'){
    assert.match(html,/progress-dashboard\.css/,`${file}: dashboard styles missing`);
    assert.match(html,/progress\.js/,`${file}: dashboard data missing`);
  }else{
    assert.match(html,/styles\.css/,`${file}: shared styles missing`);
    assert.match(html,/site\.js/,`${file}: shared navigation missing`);
  }
  assert.doesNotMatch(html,/占星|塔羅|GD 健身房|Takara/,`${file}: unrelated proposal content found`);
}
for(const link of ['service.html','contract.html','progress.html','map.html']) assert.match(docs['index.html'],new RegExp(link.replace('.','\\.')),`homepage missing ${link}`);
const homeText=docs['index.html'].replace(/<[^>]+>/g,' ');
for(const pattern of [/48\s*支(?:正式)?短影音/,/48\s*則社群圖文/,/12\s*支公開旗艦長片/,/6\s*篇網站／SEO 文稿/,/12\s*次會員直播/,/12\s*場 Sourdough 體驗/,/NT\$348,000/]) assert.match(homeText,pattern,`homepage missing ${pattern}`);
assert.match(docs['service.html'],/2026\/10\/01–2027\/09\/30/);
assert.match(docs['contract.html'],/2026\/10\/01–2027\/09\/30/);
for(const file of ['documents/blessings-bakery-contract.docx','documents/blessings-bakery-service-guide.docx']){
  assert.ok((await stat(file)).size>20000,`${file}: full document missing`);
}
assert.match(docs['contract.html'],/兩級 YouTube 會員/);
assert.match(docs['contract.html'],/麥芮忻烘焙廚房/,'contract page must show the confirmed client legal name');
assert.match(docs['service.html'],/Sourdough Taiwan/);
for(const file of ['index.html','service.html','contract.html','progress.html']) assert.match(docs[file],/待下一次會議確認/,`${file}: unresolved decisions must be explicit`);
assert.match(progressData,/2027\.01/);
assert.equal((progressData.match(/id:\d+/g)||[]).length,12,'progress must include M1–M12');
assert.equal((docs['index.html'].match(/data-preview=/g)||[]).length,4,'all four resources need preview buttons');
assert.match(docs['index.html'],/1wVQKVJLxvjaqGIQXbnSYuO2jsxhqQz04KYH2okPHIsk\/edit/,'contract Google Doc link is incorrect');
assert.match(docs['index.html'],/10bF_wMkciBFYMOeUycFGjg626X1vX0cDp7h_rVTFyoI\/edit/,'service guide Google Doc link is incorrect');
assert.match(docs['contract.html'],/1wVQKVJLxvjaqGIQXbnSYuO2jsxhqQz04KYH2okPHIsk\/edit/,'contract page must open the contract Google Doc');
assert.match(docs['service.html'],/10bF_wMkciBFYMOeUycFGjg626X1vX0cDp7h_rVTFyoI\/edit/,'service page must open the service guide Google Doc');
assert.match(docs['map.html'],/year-one-growth-engine\.svg/,'year-one map missing');
assert.match(docs['map.html'],/partner-expansion-system\.svg/,'partner expansion map missing');
assert.match(docs['index.html'],/id="system-maps"/,'proposal homepage must embed the system maps');
assert.match(docs['index.html'],/assets\/year-one-growth-engine\.svg/,'proposal homepage missing year-one map embed');
assert.match(docs['index.html'],/assets\/partner-expansion-system\.svg/,'proposal homepage missing partner map embed');
assert.doesNotMatch(docs['index.html'],/開啟完整地圖說明/,'embedded maps should not repeat a separate expansion CTA');
const yearMap=await readFile('assets/year-one-growth-engine.svg','utf8');
const partnerMap=await readFile('assets/partner-expansion-system.svg','utf8');
for(const marker of ['兩級 YouTube 會員','Sourdough Taiwan','待下一次會議確認']) assert.match(`${yearMap}\n${partnerMap}\n${Object.values(docs).join('\n')}`,new RegExp(marker),`canonical proposal missing ${marker}`);
assert.match(yearMap,/會員第一級/);
assert.match(yearMap,/會員第二級/);
assert.match(yearMap,/幸福烘焙/);
assert.match(yearMap,/不敗的酸麵包製作/);
assert.match(partnerMap,/一年期申請／年度審核/);
for(const file of ['index.html','service.html','contract.html','progress.html']){
  assert.match(docs[file],/幸福烘焙/,`${file}: missing 幸福烘焙`);
  assert.match(docs[file],/不敗的酸麵包製作|不敗課程/,`${file}: missing 不敗的酸麵包製作`);
}
assert.doesNotMatch(`${yearMap}\n${partnerMap}`,/72 支純會員影片|3 天做出＿＿麵包|科學做麵包學員/);
console.log(`Validated ${files.length} pages and shared proposal terms.`);
