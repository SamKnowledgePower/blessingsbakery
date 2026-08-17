const months=[
  {id:1,title:'正式啟動與幸福烘焙翻拍',focus:'先把既有內容變成會員核心資產',tasks:['集中拍攝工作日 01','幸福烘焙既有 5–6 堂盤點','幸福烘焙第一批翻拍','公開旗艦長片 01','短影音第 1–4 支','社群圖文第 1–4 則','會員直播協作 01','Sourdough Taiwan 線上體驗 01','書籍 QR／LINE／Email／網站解鎖流程確認']},
  {id:2,title:'兩級會員與公開導流',focus:'建立內容觀看與直播提問兩種權益',tasks:['集中拍攝工作日 02','幸福烘焙第二批翻拍','公開旗艦長片 02','短影音第 5–8 支','社群圖文第 5–8 則','SEO 文稿 01','會員直播協作 02','Sourdough Taiwan 實體體驗 01','250／400 元與權益標示待會議確認']},
  {id:3,title:'第一季讀回與舊學員銜接',focus:'驗證會員內容與原買斷權益能否並存',tasks:['集中拍攝工作日 03','幸福烘焙翻拍收斂','公開旗艦長片 03','短影音第 9–12 支','社群圖文第 9–12 則','會員直播協作 03','Sourdough Taiwan 線上體驗 02','舊學員觀看／提問技術流程測試','2026 年底會員里程碑檢核']},
  {id:4,title:'既有課程會員化',focus:'依盤點逐步整理下一批既有內容',tasks:['集中拍攝工作日 04','下一批既有課程翻拍 01','公開旗艦長片 04','短影音第 13–16 支','社群圖文第 13–16 則','SEO 文稿 02','會員直播協作 04','Sourdough Taiwan 實體體驗 02','會員觀看／提問／續訂觀察']},
  {id:5,title:'書籍名單與轉換優化',focus:'優化 LINE 綁定、影片解鎖與會員 CTA',tasks:['集中拍攝工作日 05','下一批既有課程翻拍 02','公開旗艦長片 05','短影音第 17–20 支','社群圖文第 17–20 則','會員直播協作 05','Sourdough Taiwan 線上體驗 03','書籍讀者解鎖與付費會員轉換檢核']},
  {id:6,title:'夥伴申請制度建立',focus:'把體驗、付費會員與年度申請接起來',tasks:['集中拍攝工作日 06','公開旗艦長片 06','短影音第 21–24 支','社群圖文第 21–24 則','SEO 文稿 03','會員直播協作 06','Sourdough Taiwan 實體體驗 03','付費會員申請門檻頁面','一年期合作與年度審核草案']},
  {id:7,title:'首批理念夥伴培育',focus:'從體驗與會員中篩選社區型烘焙坊',tasks:['集中拍攝工作日 07','既有課程翻拍依盤點執行','公開旗艦長片 07','短影音第 25–28 支','社群圖文第 25–28 則','會員直播協作 07','Sourdough Taiwan 線上體驗 04','夥伴理念／場地／設備初步盤點']},
  {id:8,title:'認證與營運資料測試',focus:'測試原料、銷售、回報與品管循環',tasks:['集中拍攝工作日 08','公開旗艦長片 08','短影音第 29–32 支','社群圖文第 29–32 則','SEO 文稿 04','會員直播協作 08','Sourdough Taiwan 實體體驗 04','首批夥伴銷售回報與 ERP 欄位協作']},
  {id:9,title:'產品解鎖與年度規範',focus:'建立黑麥／布里歐與年度審核條件',tasks:['集中拍攝工作日 09','既有課程翻拍依盤點執行','公開旗艦長片 09','短影音第 33–36 支','社群圖文第 33–36 則','會員直播協作 09','Sourdough Taiwan 線上體驗 05','黑麥／布里歐解鎖條件草案','年度審核規範草案']},
  {id:10,title:'內容與夥伴案例擴散',focus:'用真實會員與工坊案例擴大信任',tasks:['集中拍攝工作日 10','公開旗艦長片 10','短影音第 37–40 支','社群圖文第 37–40 則','SEO 文稿 05','會員直播協作 10','Sourdough Taiwan 實體體驗 05','會員／工坊案例內容整理']},
  {id:11,title:'收益閉環討論與制度收斂',focus:'只把已驗證的收益關係寫入正式制度',tasks:['集中拍攝工作日 11','公開旗艦長片 11','短影音第 41–44 支','社群圖文第 41–44 則','會員直播協作 11','Sourdough Taiwan 線上體驗 06','會員／原料／工坊收益閉環會議','內容、會員與夥伴 SOP 初稿']},
  {id:12,title:'全年交付與下一年度擴張',focus:'完成移交、年度審核與 10 家目標檢核',tasks:['集中拍攝工作日 12','公開旗艦長片 12','短影音第 45–48 支','社群圖文第 45–48 則','SEO 文稿 06','會員直播協作 12','Sourdough Taiwan 實體體驗 06','既有課程翻拍清單與完成度結算','正式成品與執行紀錄移交','首年 10 家社區型烘焙坊目標檢核']}
];
const metrics=[['短影音',0,48],['社群圖文',0,48],['旗艦長片',0,12],['SEO 文稿',0,6],['會員直播協作',0,12],['Sourdough 體驗',0,12],['幸福烘焙翻拍',0,1],['拍攝工作日',0,12]];
document.querySelector('#metrics').innerHTML=metrics.map(([label,n,total])=>`<article class="metric"><strong>${n} / ${total}</strong><span>${label}</span><div class="bar"><i style="--p:${Math.min(100,n/total*100)}%"></i></div></article>`).join('');
const dates=['2026.10','2026.11','2026.12','2027.01','2027.02','2027.03','2027.04','2027.05','2027.06','2027.07','2027.08','2027.09'];
document.querySelector('#progress-months').innerHTML=months.map(m=>`<details class="month"><summary><div class="month-num">${String(m.id).padStart(2,'0')}<small>${dates[m.id-1]}</small></div><div class="month-title">${m.title}</div><div class="month-focus">${m.focus}</div><div class="month-progress">0 / ${m.tasks.length}</div><div class="chev">▶</div></summary><div class="month-body">${m.tasks.map(name=>`<div class="task"><span class="check"></span><span class="task-name">${name}</span><span class="task-links"><span class="task-state">尚未開始</span></span></div>`).join('')}</div></details>`).join('');
