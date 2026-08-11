import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
assert.equal(files.length,5,'site must contain five HTML pages');
const docs=Object.fromEntries(await Promise.all(files.map(async f=>[f,await readFile(f,'utf8')])));
const progressData=await readFile('progress.js','utf8');
for(const [file,html] of Object.entries(docs)){
  assert.match(html,/lang="zh-Hant"/,`${file}: language missing`);
  assert.match(html,/name="viewport"/,`${file}: responsive viewport missing`);
  assert.match(html,/styles\.css/,`${file}: shared styles missing`);
  assert.match(html,/site\.js/,`${file}: shared navigation missing`);
  assert.doesNotMatch(html,/占星|塔羅|GD 健身房|Takara/,`${file}: unrelated proposal content found`);
}
for(const link of ['map.html','service.html','contract.html','progress.html']) assert.match(docs['index.html'],new RegExp(link.replace('.','\\.')),`homepage missing ${link}`);
const homeText=docs['index.html'].replace(/<[^>]+>/g,' ');
for(const pattern of [/48\s*支(?:正式)?短影音/,/48\s*篇社群貼文/,/12\s*支會員前導片/,/NT\$348,000/]) assert.match(homeText,pattern,`homepage missing ${pattern}`);
assert.match(docs['service.html'],/2026\/10\/01–2027\/09\/30/);
assert.match(docs['contract.html'],/2026\/10\/01–2027\/09\/30/);
for(const file of ['documents/blessings-bakery-contract.docx','documents/blessings-bakery-service-guide.docx']){
  assert.ok((await stat(file)).size>20000,`${file}: full document missing`);
  assert.match(docs[file.includes('contract')?'contract.html':'service.html'],new RegExp(file.replaceAll('.','\\.')),`${file}: download link missing`);
}
assert.match(docs['contract.html'],/完整草案共 22 條/);
assert.match(docs['service.html'],/Google Maps/);
assert.match(progressData,/2027\.01/);
assert.equal((progressData.match(/id:'M(?:\d+)'/g)||[]).length,13,'progress must include M0 and M1–M12');
assert.equal((docs['index.html'].match(/data-preview=/g)||[]).length,4,'all four resources need preview buttons');
assert.match(docs['index.html'],/1BrORCEgT3sc90gSsql45itluGme7pr3MJOXL0guxU10\/edit/,'contract Google Doc link is incorrect');
assert.match(docs['index.html'],/1vswIHhkM4zhPCzpfsXSP5O72jWinq8L4gd9PMmm-oXU\/edit/,'service guide Google Doc link is incorrect');
assert.match(docs['contract.html'],/1BrORCEgT3sc90gSsql45itluGme7pr3MJOXL0guxU10\/edit/,'contract page must open the contract Google Doc');
assert.match(docs['service.html'],/1vswIHhkM4zhPCzpfsXSP5O72jWinq8L4gd9PMmm-oXU\/edit/,'service page must open the service guide Google Doc');
console.log(`Validated ${files.length} pages and shared proposal terms.`);
