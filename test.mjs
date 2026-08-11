import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
assert.equal(files.length,5,'site must contain five HTML pages');
const docs=Object.fromEntries(await Promise.all(files.map(async f=>[f,await readFile(f,'utf8')])));
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
assert.match(docs['progress.html'],/2027\/01–03/);
console.log(`Validated ${files.length} pages and shared proposal terms.`);
