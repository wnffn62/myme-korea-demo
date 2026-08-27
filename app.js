(() => {
  'use strict';

  const STORAGE_KEY = 'myme_korea_domestic_v1';
  const AUTH_KEY = 'myme_customer_auth_v1';
  const PUBLIC_URL = 'https://wnffn62.github.io/myme-korea-demo/';
  const QR_TOKEN = 'MYME-CUSTOMER-DEMO-2026';
  const app = document.getElementById('app');
  const entryParams = new URLSearchParams(location.search);
  let pendingQrEntry = entryParams.get('login') === 'qr' && entryParams.get('token') === QR_TOKEN;
  let gateMode = pendingQrEntry ? 'confirm' : 'welcome';

  const icons = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/>',
    link: '<path d="M10.4 13.6a4.5 4.5 0 0 0 6.4.1l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1"/><path d="M13.6 10.4a4.5 4.5 0 0 0-6.4-.1l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1"/>',
    journey: '<path d="M4 19V9m0 0 4-4m-4 4 4 4"/><path d="M8 9h5a7 7 0 0 1 7 7v3"/>',
    compare: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2.9-1.2 1.8M12 17h.01"/>',
    bank: '<path d="m3 10 9-6 9 6M5 10h14M6 10v7m4-7v7m4-7v7m4-7v7M3 20h18"/>',
    credit: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 9h18M16 15h2"/>',
    tax: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v5h5M10 13h6m-6 4h6"/>',
    health: '<path d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11Z"/><path d="M12 9v6m-3-3h6"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4m-3 14h2"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 13h7m-7 4h7"/>',
    store: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M8 20v-6h5v6M3 10a3 3 0 0 0 5 0 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5 0"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 3 4.5 6v5c0 4.8 3 8 7.5 10 4.5-2 7.5-5.2 7.5-10V6z"/><path d="m9 12 2 2 4-4"/>',
    spark: '<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chart: '<path d="M4 20V9m6 11V4m6 16v-7m5 7H2"/>',
    eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    export: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 21h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/>',
    wallet: '<path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12"/><path d="M15 11h7v5h-7a2.5 2.5 0 0 1 0-5Z"/>',
    mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8"/>',
    coins: '<circle cx="9" cy="9" r="5"/><path d="M14 7.5a5 5 0 1 1-6.5 6.5M7 9h4M9 7v4"/>',
    gavel: '<path d="m14 5 5 5M12 7l5 5M4 20l7-7M9 4l4-2 6 6-2 4zM3 21h8"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zm4 4h3v3h-3zm0-4h3m-7 7h3"/>',
  };

  const sourceCatalog = [
    { id:'bank', category:'금융 데이터', name:'은행·계좌', desc:'꾸준한 소득과 계좌 흐름을 보여줘요', icon:'bank', class:'', points:55, purpose:'소득 흐름과 기존 대출 납입 현황을 설명', fields:'계좌 기본정보, 월별 입출금 요약, 대출 잔액·월 납입액' },
    { id:'credit', category:'금융 데이터', name:'신용·대출', desc:'신용점수와 성실 납입 이력을 확인해요', icon:'credit', class:'', points:50, purpose:'현재 대출과 성실 납입 이력을 확인', fields:'신용점수, 대출 종류·잔액, 납입·보증 요약' },
    { id:'card', category:'금융 데이터', name:'카드·결제', desc:'생활비와 정기 결제 흐름을 보여줘요', icon:'card', class:'', points:35, purpose:'생활비와 정기 결제 비중을 구분', fields:'월 사용액, 카테고리 합계, 결제 예정액' },
    { id:'tax', category:'공공 데이터', name:'국세·소득', desc:'소득금액증명·부가세·사업 기간', icon:'tax', class:'public', points:50, purpose:'신고된 소득과 사업 지속성을 설명', fields:'소득금액증명, 사업자 상태, 신고 요약' },
    { id:'health', category:'공공 데이터', name:'건강보험·연금', desc:'자격·재직·납부 기간', icon:'health', class:'public', points:50, purpose:'재직과 납부 지속성을 확인', fields:'자격득실, 사업장, 보험료 납부 기간' },
    { id:'public', category:'공공 데이터', name:'전자증명서', desc:'주민등록·사업자·소득 서류', icon:'doc', class:'public', points:30, purpose:'신원과 자격 서류를 반복 제출하지 않게 관리', fields:'증명서명, 발급일, 유효상태' },
    { id:'telecom', category:'생활·일 데이터', name:'통신·공과금', desc:'납부 지속성·연체 여부', icon:'phone', class:'life', points:30, purpose:'정기 납부 지속성을 보조 근거로 확인', fields:'가입 기간, 납부 완료 월수, 연체 여부' },
    { id:'platform', category:'생활·일 데이터', name:'플랫폼·매출', desc:'PG·배달·프리랜서 정산 흐름', icon:'store', class:'life', points:45, purpose:'급여명세가 없는 소득의 지속성을 보완', fields:'월별 정산액, 정산 횟수, 반품·취소 요약' },
  ];

  const products = [
    { id:'hana', initial:'H', name:'제휴 은행 A', type:'직장인·프리랜서 신용', rate:5.42, max:5000, term:60, tags:['중도상환수수료 없음','소득 확인 필요'], profiles:['employee','freelancer'] },
    { id:'bankb', initial:'B', name:'제휴 은행 B', type:'생활안정 신용', rate:5.88, max:4200, term:48, tags:['오늘 신청 가능','재직 6개월+'], profiles:['employee'] },
    { id:'capital', initial:'C', name:'제휴 금융사 C', type:'소득흐름 기반', rate:6.34, max:3000, term:60, tags:['플랫폼 정산 반영','변동소득 검토'], profiles:['freelancer','business'] },
    { id:'savings', initial:'S', name:'제휴 저축은행 D', type:'사업자 운영·대환', rate:7.12, max:6000, term:72, tags:['국세·매출 근거','대환 선택'], profiles:['business'] },
  ];

  const levels = [
    { min:0, name:'시작', text:'내 현황을 알아가는 단계' },
    { min:120, name:'탐색', text:'필요한 데이터를 선택하는 단계' },
    { min:260, name:'구축', text:'소득·대출·생활비 정보를 모으는 단계' },
    { min:430, name:'보호', text:'동의와 변동을 주기적으로 관리하는 단계' },
    { min:650, name:'완성', text:'신청 전 내 금융정보를 확인한 단계' },
  ];

  const scoreScenarioMax = { bank:4, credit:0, card:3, tax:10, health:6, public:2, telecom:8, platform:8 };

  const defaultState = {
    screen:'home', profile:'employee', connected:{ bank:true, credit:true },
    checkin:false, streak:4, consentReviewed:false, filter:'rate',
    amount:2000, term:36, income:360, existing:65, essential:155,
    currentBalance:2400, currentRate:8.1, targetRate:6.0, remainingTerm:36,
    lessonDone:false, auctionRun:false, selectedBid:null, auctionReviewed:false,
    voiceConsent:false, advisorUsed:false, stableReviewed:false, stableAmount:500,
    advisorMessages:[{role:'ai',text:'대출 조건, 신용점수, 역경매, 스테이블코인을 쉬운 말로 설명해드려요.'}],
    largeText:false, notifications:true, watchRate:true, modal:null, toast:'',
  };

  function loadState() {
    try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
    catch (_) { return { ...defaultState }; }
  }
  let state = loadState();
  let customerAuth = (()=>{ try { return JSON.parse(localStorage.getItem(AUTH_KEY)||'null'); } catch(_) { return null; } })();

  function save() {
    const saved = { ...state, modal:null, toast:'', screen:state.screen };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
  function completeCustomerLogin(method) {
    customerAuth={method,loggedInAt:new Date().toISOString(),customer:'my:ME 고객'};
    localStorage.setItem(AUTH_KEY,JSON.stringify(customerAuth));
    pendingQrEntry=false; gateMode='welcome';
    if(location.search) history.replaceState({},'',location.pathname);
    render(); window.scrollTo(0,0);
  }
  function svg(name, cls='icon') { return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`; }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function won(value) { return `${Math.round(value).toLocaleString('ko-KR')}만원`; }
  function fmt(value) { return Number(value).toLocaleString('ko-KR'); }
  function connectedSources() { return sourceCatalog.filter(s => !!state.connected[s.id]); }
  function coverage() { return Math.round(connectedSources().reduce((sum,s) => sum + s.points,0) / sourceCatalog.reduce((sum,s) => sum + s.points,0) * 100); }
  function coverageGain(source) { return Math.round(source.points / sourceCatalog.reduce((sum,s) => sum + s.points,0) * 100); }
  function xp() {
    return 65 + connectedSources().reduce((sum,s) => sum + s.points,0) + (state.checkin ? 25 : 0) + (state.consentReviewed ? 30 : 0) + (state.lessonDone ? 20 : 0) + (state.auctionReviewed ? 20 : 0) + (state.advisorUsed ? 15 : 0) + (state.stableReviewed ? 15 : 0) + 35;
  }
  function scoreScenario(source) { return { min:0, max:scoreScenarioMax[source.id] || 0 }; }
  function scoreImpactValue(source) { return scoreScenario(source).max > 0 ? `+0~${scoreScenario(source).max}점` : '분석 정확도 UP'; }
  function scoreScenarioTotal() { return connectedSources().reduce((sum,s)=>sum+(scoreScenarioMax[s.id]||0),0); }
  function levelInfo() {
    const score = xp();
    let idx = 0;
    levels.forEach((level,i) => { if (score >= level.min) idx = i; });
    const current = levels[idx];
    const next = levels[idx+1];
    const progress = next ? Math.round((score-current.min)/(next.min-current.min)*100) : 100;
    return { index:idx+1, current, next, progress:Math.min(100,Math.max(0,progress)) };
  }
  function burden() {
    const rate = 6.2 / 100 / 12;
    const months = Number(state.term);
    const principal = Number(state.amount) * 10000;
    const payment = rate ? principal * rate * Math.pow(1+rate,months) / (Math.pow(1+rate,months)-1) : principal/months;
    const monthly = payment / 10000;
    const disposable = Math.max(0, Number(state.income)-Number(state.existing)-Number(state.essential)-monthly);
    const ratio = Number(state.income) ? ((Number(state.existing)+monthly)/Number(state.income))*100 : 0;
    return { monthly, disposable, ratio };
  }
  function installment(principalWon, annualRate, months) {
    const monthlyRate = Number(annualRate) / 100 / 12;
    if (!months) return 0;
    return monthlyRate ? principalWon * monthlyRate * Math.pow(1+monthlyRate,months) / (Math.pow(1+monthlyRate,months)-1) : principalWon/months;
  }
  function refinance() {
    const principal = Number(state.currentBalance) * 10000;
    const months = Number(state.remainingTerm);
    const currentMonthly = installment(principal,state.currentRate,months);
    const targetMonthly = installment(principal,state.targetRate,months);
    return {
      currentMonthly:currentMonthly/10000,
      targetMonthly:targetMonthly/10000,
      monthlySave:Math.max(0,(currentMonthly-targetMonthly)/10000),
      totalSave:Math.max(0,(currentMonthly-targetMonthly)*months/10000),
    };
  }
  function coachAdvice() {
    const b = burden();
    const missing = sourceCatalog.filter(s=>!state.connected[s.id]);
    const priority = state.profile === 'employee' ? ['health','tax','card'] : state.profile === 'freelancer' ? ['platform','tax','card'] : ['tax','platform','bank'];
    const next = priority.map(id=>missing.find(s=>s.id===id)).find(Boolean) || missing[0];
    if (b.ratio > 40) return { tone:'info', title:'월 자금계획을 더 여유롭게 만들어봐요', text:`현재 월소득 대비 대출 납입 비율은 참고값 ${b.ratio.toFixed(1)}%예요. 기존 대출 조건과 생활비를 함께 살펴보면 선택 폭을 넓힐 수 있어요.`, action:'compare', label:'내 월 자금 흐름 살펴보기' };
    if (next) return { tone:'info', title:`${next.name}을 연결하면 더 선명해져요`, text:`금융정보 범위가 약 ${coverageGain(next)}%p 넓어지고, 신용점수 변화 가능성은 +0~${scoreScenario(next).max}점 시나리오로 확인할 수 있어요.`, action:`source:${next.id}`, label:`${next.name} 연결하기` };
    return { tone:'safe', title:'비교할 준비가 충분해요', text:'연결한 정보와 예상 월 납입액을 함께 보며 내게 맞는 조건을 찾아보세요.', action:'compare', label:'내 조건 비교하기' };
  }
  function auctionBids() {
    const profileAdj = state.profile==='business' ? .34 : state.profile==='freelancer' ? .22 : 0;
    return products.filter(p=>p.profiles.includes(state.profile)).map((p,i)=>({
      ...p,
      offeredRate:Number((p.rate+profileAdj+(i*.07)).toFixed(2)),
      offeredMax:Math.min(p.max,Math.max(500,Math.round((Number(state.income)*10+coverage()*18)/100)*100)),
      status:Number(state.amount)<=p.max?'bid':'review',
    })).sort((a,b)=>a.offeredRate-b.offeredRate);
  }
  function stableQuote() {
    const krw=Number(state.stableAmount)*10000;
    const fee=Math.round(krw*.004);
    const fx=1380;
    return { fee, usdc:(krw-fee)/fx };
  }
  function profileName() { return ({employee:'직장인',freelancer:'프리랜서',business:'개인사업자'})[state.profile]; }

  function badgeData() {
    const ids = connectedSources().map(s=>s.id);
    return [
      { name:'본인확인', desc:'내 유형과 목적 설정', icon:'user', on:true },
      { name:'동의주권', desc:'목적·보유·철회 확인', icon:'shield', on:state.consentReviewed },
      { name:'현금흐름', desc:'계좌+결제/매출 근거', icon:'wallet', on:ids.includes('bank') && (ids.includes('card')||ids.includes('platform')) },
      { name:'월 자금여유', desc:'소득·대출·생활비 확인', icon:'chart', on:true },
      { name:'데이터균형', desc:'금융+공공+생활 연결', icon:'target', on:ids.some(id=>['bank','credit','card'].includes(id)) && ids.some(id=>['tax','health','public'].includes(id)) && ids.some(id=>['telecom','platform'].includes(id)) },
      { name:'정기관리', desc:'5일 연속 변화 확인', icon:'calendar', on:state.streak >= 5 },
    ];
  }

  function missions() {
    const remaining = sourceCatalog.filter(s=>!state.connected[s.id]);
    const recommended = state.profile === 'employee' ? ['health','tax','card'] : state.profile === 'freelancer' ? ['platform','tax','card'] : ['tax','platform','card'];
    const nextSource = recommended.map(id=>sourceCatalog.find(s=>s.id===id)).find(s=>s&&!state.connected[s.id]) || remaining[0];
    return [
      { id:'checkin', title:'오늘의 금융정보 확인', desc:'연결 상태와 대출 변화를 확인해요.', points:25, done:state.checkin, action:'checkin' },
      { id:nextSource ? nextSource.id : 'all', title:nextSource ? `${nextSource.name} 연결하기` : '필요한 금융정보 연결 완료', desc:nextSource ? nextSource.desc : '추가 연결은 선택이에요.', points:nextSource ? nextSource.points : 0, done:!nextSource, action:nextSource ? `source:${nextSource.id}` : '' },
      { id:'consent', title:'내 동의 범위 확인', desc:'목적·보유기간·철회 경로를 한 번에 확인해요.', points:30, done:state.consentReviewed, action:'consent' },
    ];
  }
  function nextMission() { return missions().find(m=>!m.done) || missions()[0]; }

  function header() {
    return `<header class="app-header"><div class="brand-lockup"><div class="brand-mark">m:M</div><div class="brand-copy"><strong>my:ME</strong><span>KOREA · EVIDENCE WALLET</span></div></div><div class="header-actions"><button class="icon-btn voice-entry" data-action="advisor" aria-label="AI 음성상담">${svg('mic')}</button><button class="icon-btn" data-action="help" aria-label="서비스 안내">${svg('help')}</button><button class="icon-btn" data-action="alerts" aria-label="알림">${svg('bell')}<i class="dot"></i></button></div></header>`;
  }

  function bottomNav() {
    const items = [['home','home','홈'],['connect','link','연결'],['journey','journey','성장'],['compare','compare','비교'],['my','user','내 정보']];
    return `<nav class="bottom-nav" aria-label="주요 메뉴">${items.map(([id,ic,label])=>`<button data-nav="${id}" class="${state.screen===id?'on':''}" ${state.screen===id?'aria-current="page"':''}>${svg(ic)}<span>${label}</span></button>`).join('')}</nav>`;
  }

  function node(id, cls, iconName) {
    const source=sourceCatalog.find(s=>s.id===id);
    return `<div class="node ${cls} ${state.connected[id]?'on':''}" title="${source?.name||id}">${svg(iconName)}<span>${source?.name||id}</span></div>`;
  }

  function homeScreen() {
    const cov = coverage();
    const mission = nextMission();
    const li = levelInfo();
    const coach = coachAdvice();
    return `<section class="screen" data-screen-view="home">
      <div class="passport">
        <div class="passport-top"><div><small>MY CREDIT GROWTH MAP</small><h1>내 데이터를 연결하면<br>신용점수 개선에 도움이 돼요</h1></div><span class="demo-pill"><i></i>기능 체험</span></div>
        <div class="constellation"><div class="orbit"></div><div class="passport-core"><div><strong>${cov}%</strong><span>정보 연결도</span></div></div>
          ${node('bank','n1','bank')}${node('credit','n2','credit')}${node('tax','n3','tax')}${node('health','n4','health')}${node('telecom','n5','phone')}${node('platform','n6','store')}
        </div>
        <div class="passport-stats"><div><span>연결한 데이터</span><strong>${connectedSources().length} / ${sourceCatalog.length}개</strong></div><div><span>나의 성장 단계</span><strong>Lv.${li.index} ${li.current.name}</strong></div><div><span>최근 확인</span><strong>방금 전</strong></div></div>
      </div>
      <div class="notice safe"><b>연결할수록 더 나은 대출조건을 찾는 데 도움이 돼요</b>소득과 성실한 금융생활을 더 잘 보여주면, 한도와 금리 제안을 더 정확하게 비교할 수 있어요.</div>
      <article class="coach-card ${coach.tone}"><div class="coach-orb">${svg('spark')}</div><div><span class="eyebrow">MY:ME COACH</span><h2>${coach.title}</h2><p>${coach.text}</p><button class="coach-link" data-action="coach">${coach.label} ${svg('arrow')}</button></div></article>
      <article class="next-mission"><div class="mission-meta"><span class="eyebrow">NEXT MISSION</span><span class="xp">+${mission.points} XP</span></div><h3>${mission.title}</h3><p>${mission.desc}</p><div class="progress-track"><i style="width:${li.progress}%"></i></div><button class="primary wide" style="margin-top:14px" data-mission="${mission.action}">${mission.done?'다시 확인하기':'미션 시작하기'} ${svg('arrow')}</button></article>
      <div class="section-head"><h2>오늘의 금융 한눈에 보기</h2><button data-nav="journey">내 성장 보기</button></div>
      <div class="stat-grid"><div class="stat-card"><span>이번 달 대출 납입</span><strong>${won(state.existing)}</strong><em>일정 준비 완료</em></div><div class="stat-card"><span>생활비 후 남는 금액</span><strong>${won(burden().disposable)}</strong><em>여유자금 계획</em></div><div class="stat-card"><span>더 나은 금리 찾기</span><strong>${state.watchRate?'찾는 중':'설정 가능'}</strong><em>${state.watchRate?'안정적으로 확인 중':'한 번에 알림 켜기'}</em></div></div>
      <div class="section-head"><h2>최근 확인한 내용</h2></div>
      <div class="timeline"><div class="timeline-item"><span class="timeline-ic">${svg('bank')}</span><div><b>은행·대출 정보가 새로워졌어요</b><small>잔액과 이번 달 납입 예정액을 확인했어요.</small></div><span class="status">최신</span></div><div class="timeline-item"><span class="timeline-ic">${svg('shield')}</span><div><b>내 데이터 동의 범위</b><small>${state.consentReviewed?'사용 목적과 보유기간을 확인했어요.':'한 번 확인하면 더 안심할 수 있어요.'}</small></div><span class="status">${state.consentReviewed?'완료':'확인'}</span></div><div class="timeline-item"><span class="timeline-ic">${svg('clock')}</span><div><b>더 나은 금리 기회를 찾고 있어요</b><small>소득·신용 변화가 생기면 알려드려요.</small></div><span class="status">ON</span></div></div>
    </section>`;
  }

  function connectScreen() {
    const grouped = [...new Set(sourceCatalog.map(s=>s.category))];
    return `<section class="screen" data-screen-view="connect"><span class="eyebrow">MYDATA CONNECTION</span><h1 class="screen-title">연결할수록<br>신용점수 개선에 도움이 돼요</h1><p class="screen-lead">소득과 성실한 납입기록을 더 잘 보여주고, 예상 점수 변화와 대출조건 비교 효과를 확인하세요.</p>
      <div class="profile-switch" role="group" aria-label="소득 유형"><button data-profile="employee" class="${state.profile==='employee'?'on':''}">직장인</button><button data-profile="freelancer" class="${state.profile==='freelancer'?'on':''}">프리랜서</button><button data-profile="business" class="${state.profile==='business'?'on':''}">개인사업자</button></div>
      <article class="score-lab"><div class="score-lab-head"><div><span class="eyebrow">MY SCORE GROWTH</span><h2>신용점수 개선 예상 범위</h2></div><strong>+0~${scoreScenarioTotal()}<small>점</small></strong></div><p>연결한 소득·납입 정보가 신용평가에 반영되면 점수 개선에 도움이 될 수 있어요. 숫자는 현재 데이터 기준의 예시 범위예요.</p><div class="score-scale"><i style="width:${Math.min(100,scoreScenarioTotal()/41*100)}%"></i></div><button data-action="score-policy">내 점수 개선 범위 알아보기</button></article>
      <div class="notice info"><b>${profileName()}에게 먼저 추천해요</b>${state.profile==='employee'?'건강보험·국세 소득·카드 고정지출':state.profile==='freelancer'?'플랫폼 정산·국세 소득·계좌 입금 흐름':'국세 신고·PG 매출·사업용 계좌'}를 우선 확인하면 좋습니다.</div>
      ${grouped.map(cat=>`<div class="category-label">${cat}</div><div class="source-list">${sourceCatalog.filter(s=>s.category===cat).map(s=>`<article class="source-card ${state.connected[s.id]?'is-connected':''}"><div class="source-icon ${s.class}">${svg(s.icon)}</div><div class="source-copy"><div class="source-title-row"><h3>${s.name}</h3>${state.connected[s.id]?`<span class="connected">${svg('check')} 연결 완료</span>`:''}</div><p>${s.desc}</p></div><div class="score-impact"><span class="score-arrow">↗</span><div><small>${scoreScenario(s).max>0?'예상 신용점수 변화':'신용분석 효과'}</small><strong>${scoreImpactValue(s)}</strong></div><span class="coverage-chip">정보 범위 +${coverageGain(s)}%p</span></div>${state.connected[s.id]?`<button class="connected-action" disabled>${svg('check')} 안전하게 연결됐어요</button>`:`<button class="connect-btn gain" data-source="${s.id}"><span>${s.name} 연결하기</span><small>연결 완료 시 +${s.points} XP</small></button>`}</article>`).join('')}</div>`).join('')}
      <div class="notice safe"><b>안전한 체험으로 데이터 연결 효과를 먼저 확인해보세요</b>현재는 브라우저 체험 버전이며, 정식 서비스에서는 마이데이터 사업자와 제휴기관 정보를 연결해요.</div>
    </section>`;
  }

  function journeyScreen() {
    const li = levelInfo(); const score = xp(); const nextAt = li.next?.min || score;
    return `<section class="screen" data-screen-view="journey"><span class="eyebrow">EVIDENCE JOURNEY</span><h1 class="screen-title">하나씩 연결하며<br>내 신용 성장 지도를 완성해요</h1><p class="screen-lead">금융정보를 확인하고 관리할 때마다 XP·레벨·배지가 쌓여요. 실제 대출조건은 금융기관이 별도로 결정해요.</p>
      <div class="level-card"><div class="level-top"><div class="level-number">${li.index}</div><div class="level-copy"><span>LEVEL ${li.index}</span><h2>${li.current.name}</h2><p>${li.current.text}</p></div></div><div class="level-xp"><span>${score} XP</span><span>${li.next?`${nextAt} XP까지 ${nextAt-score}`:'최종 단계'}</span></div><div class="progress-track" style="margin-top:8px"><i style="width:${li.progress}%"></i></div></div>
      <div class="streak"><div><strong>연속 ${state.streak + (state.checkin?1:0)}일 관리 중</strong><p>오늘은 연결 상태만 확인해도 충분해요.</p></div><span class="flame">${state.streak + (state.checkin?1:0)}▲</span></div>
      <article class="credit-map"><div class="credit-map-head"><div><span class="eyebrow">SCORE QUEST</span><h2>신용 성장 지도</h2></div><strong>+0~${scoreScenarioTotal()}점</strong></div><p>연결한 정보가 신용평가에 반영될 때 기대할 수 있는 개선 예시를 보여드려요.</p><div class="credit-steps">${sourceCatalog.slice(0,5).map(s=>`<button class="credit-step ${state.connected[s.id]?'on':''}" ${state.connected[s.id]?'disabled':`data-mission="source:${s.id}"`}><span>${state.connected[s.id]?svg('check'):svg(s.icon)}</span><b>${s.name}</b><small>${scoreScenario(s).max>0?`+0~${scoreScenario(s).max}`:'분석 UP'}</small></button>`).join('')}</div></article>
      <div class="section-head"><h2>오늘의 미션</h2><button data-action="xp-policy">XP 기준</button></div><div class="mission-list">${missions().map(m=>`<article class="mission-card ${m.done?'done':''}"><span class="mission-check">${m.done?svg('check'):svg('target')}</span><div><h3>${m.title}</h3><p>${m.desc}</p></div>${m.done?'<span class="xp">완료</span>':`<button class="connect-btn" data-mission="${m.action}">+${m.points}</button>`}</article>`).join('')}</div>
      <div class="section-head"><h2>금융 퀘스트</h2><button data-action="lesson-policy">XP 안내</button></div><article class="lesson-card ${state.lessonDone?'done':''}"><div class="lesson-number">01</div><div><span class="eyebrow">3분 학습 · +20 XP</span><h3>더 낮은 금리로 얼마나 절약할 수 있을까요?</h3><p>절약되는 이자와 수수료를 함께 비교해 내게 유리한 갈아타기 조건을 찾아봐요.</p><button class="secondary small-btn" data-action="lesson">${state.lessonDone?'다시 알아보기':'퀘스트 시작'}</button></div></article>
      <div class="section-head"><h2>내 배지</h2><button data-action="badges">배지 기준</button></div><div class="badge-grid">${badgeData().map(b=>`<article class="badge-card ${b.on?'on':''}"><div class="badge-medal">${svg(b.icon)}</div><strong>${b.name}</strong><span>${b.desc}</span></article>`).join('')}</div>
      <div class="notice safe"><b>좋은 금융관리 습관에 XP를 드려요</b>데이터 확인, 동의 관리, 금융 학습처럼 신용 성장에 도움이 되는 행동을 즐겁게 이어갈 수 있어요.</div>
    </section>`;
  }

  function sortedProducts() {
    const list = products.filter(p=>p.profiles.includes(state.profile));
    return [...list].sort((a,b)=>state.filter==='limit'?b.max-a.max:a.rate-b.rate);
  }

  function compareScreen() {
    const b = burden(); const refi = refinance(); const bids = auctionBids(); const ready = coverage() >= 45;
    return `<section class="screen" data-screen-view="compare"><span class="eyebrow">LOAN READINESS</span><h1 class="screen-title">신청하기 전에<br>내 조건을 쉽게 비교해요</h1><p class="screen-lead">금리, 한도, 매달 납입할 금액을 한눈에 살펴보세요. 현재 수치는 기능 시연용 예시예요.</p>
      <article class="auction-card"><div class="auction-hero"><div><span class="eyebrow">LICENSED LENDER AUCTION</span><h2>여러 금융사의 제안을 한 번에 받아봐요</h2><p>한 번 입력한 정보로 금리, 한도, 제안 이유를 나란히 비교하고 내게 맞는 조건을 고를 수 있어요.</p></div><div class="gavel-orb">${svg('gavel')}</div></div>
        ${state.auctionRun?`<div class="bid-list">${bids.map((bid,i)=>`<button class="bid-row ${state.selectedBid===bid.id?'selected':''}" data-bid="${bid.id}"><span class="bid-rank">${i+1}</span><div><b>${bid.name}</b><small>${bid.status==='bid'?'맞춤 조건 도착':'조건 확인 중'} · 제휴 전 체험 예시</small></div><strong>${bid.offeredRate.toFixed(2)}%<small>최대 ${fmt(bid.offeredMax)}만원</small></strong></button>`).join('')}</div><div class="auction-foot"><small>금리와 함께 전체 비용, 기간, 수수료까지 살펴보면 더 잘 맞는 조건을 고를 수 있어요.</small><button class="secondary small-btn" data-auction-run>제안 다시 보기</button></div>`:`<div class="auction-stage"><div class="lender-dot">A</div><div class="lender-dot">B</div><div class="lender-dot">C</div><i></i><div class="auction-user">${fmt(state.amount)}<small>만원 희망</small></div></div><button class="primary wide" data-auction-run>금융사 제안 받아보기 ${svg('arrow')}</button>`}
      </article>
      <div class="capacity-card"><h2>내 월 납입 계획 미리 보기</h2><p>금리 6.2% 예시로 매달 납입할 금액과 생활비 후 남는 금액을 계산해요.</p>
        <div class="field"><label><span>필요 금액</span><b>${fmt(state.amount)}만원</b></label><input data-range="amount" type="range" min="300" max="8000" step="100" value="${state.amount}"></div>
        <div class="select-row"><div class="select-wrap"><label>나누어 낼 기간</label><select data-select="term"><option value="24" ${state.term==24?'selected':''}>24개월</option><option value="36" ${state.term==36?'selected':''}>36개월</option><option value="48" ${state.term==48?'selected':''}>48개월</option><option value="60" ${state.term==60?'selected':''}>60개월</option></select></div><div class="select-wrap"><label>소득 유형</label><select data-select="profile"><option value="employee" ${state.profile==='employee'?'selected':''}>직장인</option><option value="freelancer" ${state.profile==='freelancer'?'selected':''}>프리랜서</option><option value="business" ${state.profile==='business'?'selected':''}>개인사업자</option></select></div></div>
        <div class="field"><label><span>월 소득</span><b>${fmt(state.income)}만원</b></label><input data-range="income" type="range" min="100" max="1500" step="10" value="${state.income}"></div>
        <div class="field"><label><span>현재 대출 월 납입액</span><b>${fmt(state.existing)}만원</b></label><input data-range="existing" type="range" min="0" max="500" step="5" value="${state.existing}"></div>
        <div class="field"><label><span>월 필수지출</span><b>${fmt(state.essential)}만원</b></label><input data-range="essential" type="range" min="30" max="800" step="5" value="${state.essential}"></div>
        <div class="capacity-result"><div class="big-result"><div><small>예상 월 납입액</small><strong>${b.monthly.toFixed(1)}만원</strong></div><span class="demo-pill"><i></i>참고 계산</span></div><div class="result-grid"><div><small>생활비와 대출 납입 후 남는 금액</small><b>${won(b.disposable)}</b></div><div><small>월소득 대비 대출 납입 비율</small><b>${b.ratio.toFixed(1)}%</b></div></div></div>
      </div>
      <article class="refi-card"><div class="refi-head"><div><span class="eyebrow">SWITCH LAB</span><h2>갈아타기 절감액 실험</h2></div><span class="sample-tag">참고 계산</span></div><p>같은 원금·남은 기간의 원리금균등상환을 가정합니다.</p>
        <div class="field"><label><span>현재 대출 잔액</span><b>${fmt(state.currentBalance)}만원</b></label><input data-range="currentBalance" type="range" min="300" max="10000" step="100" value="${state.currentBalance}"></div>
        <div class="rate-inputs"><label>현재 금리<input data-number="currentRate" type="number" min="1" max="20" step="0.1" value="${state.currentRate}"><span>%</span></label><label>비교 금리<input data-number="targetRate" type="number" min="1" max="20" step="0.1" value="${state.targetRate}"><span>%</span></label><label>남은 기간<select data-select="remainingTerm"><option value="12" ${state.remainingTerm==12?'selected':''}>12개월</option><option value="24" ${state.remainingTerm==24?'selected':''}>24개월</option><option value="36" ${state.remainingTerm==36?'selected':''}>36개월</option><option value="60" ${state.remainingTerm==60?'selected':''}>60개월</option></select></label></div>
        <div class="refi-result"><div><small>매달 절약 가능액</small><strong>${refi.monthlySave.toFixed(1)}만원</strong></div><div><small>전체 이자 절약 가능액</small><strong>${fmt(refi.totalSave.toFixed(0))}만원</strong></div></div><small class="calc-note">중도상환수수료·인지비용·우대조건은 제외한 참고값이에요. 실제 절약액은 금융사 조건에 따라 달라질 수 있어요.</small>
      </article>
      <div class="notice safe"><b>${ready?'맞춤 조건을 비교할 준비가 충분해요':'금융정보를 더 연결하면 한도·금리 비교가 정확해져요'}</b>현재 정보 연결도 ${coverage()}%. ${ready?'연결한 정보를 바탕으로 제안 이유까지 함께 살펴보세요.':'소득과 납입 정보를 더 보여주면 선택할 수 있는 금융조건을 넓히는 데 도움이 될 수 있어요.'}</div>
      <div class="section-head"><h2>전체 예시 상품</h2></div><div class="filter-pills"><button data-filter="rate" class="${state.filter==='rate'?'on':''}">금리 낮은 순</button><button data-filter="limit" class="${state.filter==='limit'?'on':''}">한도 높은 순</button><button data-filter="refi" class="${state.filter==='refi'?'on':''}">대환 포함</button></div>
      <div class="product-list">${sortedProducts().map(p=>`<article class="product-card"><div class="product-top"><div class="product-brand"><div class="product-logo">${p.initial}</div><div><h3>${p.name}</h3><span>${p.type}</span></div></div><span class="sample-tag">예시 상품</span></div><div class="rate-row"><div><span>금리 예시</span><strong>${p.rate.toFixed(2)}%</strong></div><div><span>한도 예시</span><strong>${fmt(p.max)}만원</strong></div></div><div class="reason-chips">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="card-foot"><small>제휴사가 실제 심사·승인·금리·한도를 결정해요.</small><button class="secondary small-btn" data-product="${p.id}">반영 정보 보기</button></div></article>`).join('')}</div>
    </section>`;
  }

  function myScreen() {
    const q=stableQuote();
    return `<section class="screen" data-screen-view="my"><span class="eyebrow">MY CONTROL</span><h1 class="screen-title">내 데이터는<br>내가 계속 관리해요</h1><p class="screen-lead">데이터 연결 상태와 더 나은 금리 기회를 한 곳에서 확인하세요.</p>
      <div class="vault-card"><div class="vault-head"><div><h2>내가 선택한 금융정보</h2><p>연결한 정보를 한눈에 관리해요</p></div><strong>${connectedSources().length}</strong></div><div class="vault-list">${connectedSources().length?connectedSources().map(s=>`<div class="vault-item"><div><b>${s.name}</b><small>${s.purpose} · 언제든 연결 관리</small></div><button class="revoke" data-revoke="${s.id}">연결 해제</button></div>`).join(''):'<div class="vault-item"><div><b>첫 금융정보를 연결해보세요</b><small>연결 메뉴에서 신용 성장에 도움이 되는 정보를 선택할 수 있어요.</small></div></div>'}</div></div>
      <div class="section-head"><h2>더 나은 금리 알림</h2></div><div class="rate-watch"><div class="rate-watch-top"><div><h2>금리가 더 좋아질 때 알려드려요</h2><p>소득·신용·대출 납입 이력을 확인해 금리인하요구권을 살펴볼 시점을 알려드려요.</p></div><span class="watch-state">${state.watchRate?'알림 켬':'알림 끔'}</span></div><div class="watch-line"><div><span>소득 정보</span><b>최신 상태</b></div><div><span>대출 납입</span><b>잘 반영됨</b></div><div><span>다음 확인</span><b>7일 후</b></div></div></div>
      <div class="section-head"><h2>스테이블코인 제휴 송금</h2><button data-action="stable-policy">이용 안내</button></div><article class="stable-card"><div class="stable-head"><div class="coin-orb">${svg('coins')}</div><div><span class="eyebrow">OPTIONAL GLOBAL RAIL</span><h2>USDC 정산 미리 보기</h2><p>국내 일반대출과 분리된 선택 기능이에요.</p></div><span class="sample-tag">시연</span></div><div class="field"><label><span>보낼 금액</span><b>${fmt(state.stableAmount)}만원</b></label><input data-range="stableAmount" type="range" min="10" max="3000" step="10" value="${state.stableAmount}"></div><div class="stable-flow"><span>원화</span><b>›</b><span>신고 사업자</span><b>›</b><span>USDC</span><b>›</b><span>현지 수령</span></div><div class="stable-quote"><div><small>예상 이용 비용</small><b>${Math.round(q.fee/10000).toLocaleString('ko-KR')}만원</b></div><div><small>예상 수령 수량</small><b>${q.usdc.toFixed(2)} USDC</b></div></div><button class="secondary wide" data-action="stablecoin">이용 구조 알아보기</button></article>      <div class="section-head"><h2>앱 설정</h2></div><div class="setting-list"><div class="setting-row"><div><b>금리·대출 소식 받기</b><br><small>내게 필요한 변화만 알려드려요</small></div><button class="toggle ${state.notifications?'on':''}" data-toggle="notifications" aria-pressed="${state.notifications}"><i></i></button></div><div class="setting-row"><div><b>더 나은 금리 알림</b><br><small>신청 전 조건과 동의를 다시 확인해요</small></div><button class="toggle ${state.watchRate?'on':''}" data-toggle="watchRate" aria-pressed="${state.watchRate}"><i></i></button></div><div class="setting-row"><div><b>글자 더 크게 보기</b><br><small>금액과 안내문을 한 단계 키워요</small></div><button class="toggle ${state.largeText?'on':''}" data-toggle="largeText" aria-pressed="${state.largeText}"><i></i></button></div><button class="setting-row" style="width:100%;border:0;background:#fff;text-align:left" data-action="export"><div><b>내 금융정보 내려받기</b><br><small>시연 정보를 JSON 파일로 저장해요</small></div>${svg('export')}</button><button class="setting-row" style="width:100%;border:0;background:#fff;text-align:left;color:var(--danger)" data-action="reset"><div><b>시연 상태 처음으로 돌리기</b><br><small>이 브라우저에 저장된 시연 상태만 지워요</small></div>${svg('trash')}</button></div>
      <button class="customer-session" data-customer-logout>${svg('qr')}<span><b>고객 로그인 화면 다시 보기</b><small>QR 로그인과 시작 화면을 다시 확인해요</small></span>${svg('arrow')}</button>
      <div class="notice info"><b>안전한 체험 버전으로 모든 기능을 먼저 살펴보세요</b>입력한 내용은 이 브라우저에만 저장돼요. 정식 서비스에서는 동의 후 마이데이터와 금융사 조건 조회를 연결해요.</div>
    </section>`;
  }

  function modalView() {
    if (!state.modal) return '';
    const m = state.modal;
    let content = '';
    if (m.type === 'source') {
      const s = sourceCatalog.find(item=>item.id===m.id);
      content = m.step === 2 ? `<div class="connecting"><div class="spinner"></div><h3>${s.name} 연결 중</h3><p>신용 성장에 활용할 정보를 안전하게 준비하고 있어요.</p></div>` : `<div class="sheet-head"><div><span class="eyebrow">PURPOSED CONSENT</span><h2>${s.name} 연결</h2><p>연결하면 어떤 도움을 받을 수 있는지 확인해보세요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>연결하면 좋은 점</b><span>${s.purpose}</span></div></div><div class="consent-row"><span class="consent-check">${svg('check')}</span><div><b>가져올 정보</b><span>${s.fields}</span></div></div><div class="consent-row"><span class="consent-check">${svg('chart')}</span><div><b>${scoreScenario(s).max>0?'신용점수 개선 예상 범위':'더 정확한 신용분석'}</b><span>${scoreScenario(s).max>0?`신용평가에 적격하게 반영될 때 +0~${scoreScenario(s).max}점 개선에 도움이 될 수 있어요.`:'현재 신용상태를 정확하게 확인해 맞춤 조건 비교에 활용할 수 있어요.'} 실제 점수와 조건은 KCB·NICE 및 금융기관이 결정해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>내가 계속 관리해요</b><span>필요할 때 연결 상태를 확인하고 언제든 해제할 수 있어요.</span></div></div></div><div class="notice safe"><b>안전한 체험 연결이에요</b>현재는 브라우저에 연결 상태만 저장해 실제 데이터 없이 효과를 먼저 확인할 수 있어요.</div><button class="primary wide" data-connect="${s.id}">${s.name} 연결하고 성장 시작 ${svg('arrow')}</button>`;
    } else if (m.type === 'product') {
      const p = products.find(item=>item.id===m.id);
      content = `<div class="sheet-head"><div><span class="eyebrow">EVIDENCE PREVIEW</span><h2>${p.name}</h2><p>${p.type} · 조건 미리 보기</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="notice safe"><b>현재 금융정보 ${coverage()}%를 활용할 수 있어요</b>${connectedSources().map(s=>s.name).join(' · ')}</div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>기대할 수 있는 제안</b><span>제휴 금융기관이 연결된 정보를 확인해 금리와 한도를 제안해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>더 연결하면 좋은 정보</b><span>${sourceCatalog.filter(s=>!state.connected[s.id]).map(s=>s.name).join(' · ') || '맞춤 비교에 필요한 정보를 모두 연결했어요'}</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>내 정보 확인하기</b><span>연결한 정보를 직접 확인하고 수정 요청도 할 수 있어요.</span></div></div></div><div class="notice info"><b>조건을 편하게 미리 살펴보세요</b>${p.rate.toFixed(2)}%·${fmt(p.max)}만원은 체험용 예시이며, 실제 조건은 금융기관이 제안해요.</div><button class="secondary wide" data-close>다른 조건도 비교하기</button>`;
    } else if (m.type === 'lesson') {
      content = `<div class="sheet-head"><div><span class="eyebrow">FINANCIAL QUEST 01</span><h2>갈아타기로 절약액 키우기</h2><p>더 유리한 금리와 전체 절약액을 함께 찾아봐요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="lesson-copy"><b>절약액을 정확하게 보는 방법</b><p>줄어드는 이자에서 수수료와 부대비용을 함께 계산하면 실제로 아낄 수 있는 금액을 확인할 수 있어요.</p></div><div class="quiz-box"><b>더 알뜰한 선택은 무엇일까요?</b><button data-quiz="wrong">금리가 조금이라도 낮으면 바로 이동</button><button data-quiz="correct">이자 절약액과 수수료·조건을 함께 비교</button><button data-quiz="wrong">한도가 가장 큰 상품으로 이동</button></div><div class="notice safe"><b>학습할수록 XP가 쌓여요</b>금융지식을 쌓는 즐거움을 위한 보상이며, 실제 금융조건은 금융기관이 결정해요.</div>`;
    } else if (m.type === 'coach') {
      const coach = coachAdvice();
      content = `<div class="sheet-head"><div><span class="eyebrow">MY:ME COACH</span><h2>${coach.title}</h2><p>현재 입력값과 연결 상태를 바탕으로 쉽게 정리했어요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>지금 확인된 내용</b><span>금융정보 범위 ${coverage()}% · 월소득 대비 대출 납입 비율 ${burden().ratio.toFixed(1)}% · 아직 연결하지 않은 정보 ${sourceCatalog.filter(s=>!state.connected[s.id]).length}개</span></div></div><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>다음에 해볼 일</b><span>${coach.text}</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>참고해 주세요</b><span>실제 승인·신용점수·금리는 금융기관과 신용평가사가 결정해요.</span></div></div></div><button class="primary wide" data-coach-action="${coach.action}">${coach.label} ${svg('arrow')}</button>`;
    } else if (m.type === 'advisor') {
      const messages=Array.isArray(state.advisorMessages)?state.advisorMessages:defaultState.advisorMessages;
      content = `<div class="sheet-head"><div><span class="eyebrow">AI VOICE ADVISOR</span><h2>AI 음성상담</h2><p>궁금한 기능과 조건을 말하거나 글로 물어보세요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="advisor-log" aria-live="polite">${messages.map(msg=>`<div class="chat ${msg.role}">${esc(msg.text)}</div>`).join('')}</div><div class="quick-chips"><button data-advisor-question="내 신용점수는 왜 오르나요?">점수 변화 알아보기</button><button data-advisor-question="역경매는 어떻게 작동하나요?">금융사 제안 방식</button><button data-advisor-question="스테이블코인은 안전한가요?">해외송금 알아보기</button><button data-advisor-question="사람 상담을 원해요">상담원 연결</button></div><div class="advisor-compose"><textarea id="advisorInput" maxlength="300" rows="2" placeholder="주민번호·계좌번호는 입력하지 마세요."></textarea><div class="row-actions"><button class="voice-btn" data-advisor-mic>${svg('mic')} 음성으로 말하기</button><button class="primary" data-advisor-send>보내기</button></div></div><div class="notice info"><b>음성상담 이용 안내</b>마이크를 켜기 전에 먼저 동의를 받아요. 녹음 파일은 저장하지 않으며, 현재 답변은 기능 시연용이에요.</div>`;
    } else if (m.type === 'voice-consent') {
      content = `<div class="sheet-head"><div><span class="eyebrow">MICROPHONE CONSENT</span><h2>말로 편하게 상담해보세요</h2><p>마이크 이용 방법을 확인하고 바로 시작할 수 있어요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('mic')}</span><div><b>말하면 바로 글로 바꿔드려요</b><span>브라우저 음성인식으로 질문을 빠르게 입력해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('lock')}</span><div><b>대화는 가볍고 안전하게</b><span>앱은 녹음 파일을 만들지 않고 질문에 답하는 데만 사용해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('user')}</span><div><b>상담원에게 이어서 물어볼 수 있어요</b><span>더 자세한 도움이 필요하면 사람 상담으로 이어갈 수 있어요.</span></div></div></div><button class="primary wide" data-voice-consent>동의하고 음성상담 시작</button>`;
    } else if (m.type === 'stablecoin') {
      content = `<div class="sheet-head"><div><span class="eyebrow">PARTNER SETTLEMENT</span><h2>빠르고 투명한 해외정산 구조</h2><p>신고된 전문 사업자와 연결해 비용과 예상 도착액을 먼저 보여주는 방식이에요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>확인된 사업자와 안전하게 연결</b><span>FIU 신고, 본인확인, 트래블룰과 제재주소 확인을 거친 파트너를 사용해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('coins')}</span><div><b>원할 때 선택해서 이용</b><span>국내 대출 비교와 분리된 선택 기능으로 이용 여부를 직접 정해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>비용과 예상 수령액을 한눈에 확인</b><span>환율, 수수료, 예상 도착액을 송금 전에 비교할 수 있어요.</span></div></div></div><div class="notice info"><b>정식 연결을 준비하고 있어요</b>현재는 이용 구조를 체험할 수 있으며, 파트너 API와 계약·법률검토 후 실제 송금을 연결해요.</div><button class="primary wide" data-stable-review>이용 구조 확인하고 +15 XP</button>`;
    } else {
      const titles = { help:'my:ME 국내판 안내', alerts:'새 알림', consent:'내 동의 범위', 'xp-policy':'XP 받는 방법', 'lesson-policy':'금융 퀘스트 안내', 'score-policy':'점수 변화 범위 안내', 'stable-policy':'스테이블코인 이용 안내', badges:'배지 받는 방법', reset:'시연 상태 처음으로 돌리기' };
      const bodies = {
        help:'my:ME는 내가 동의한 소득·대출·생활 데이터를 모아 금융조건을 쉽고 투명하게 비교하도록 돕는 서비스예요.',
        alerts:'은행·대출 정보가 최신 상태예요. 더 나은 금리 기회가 생기면 바로 알려드릴게요.',
        consent:`현재 ${connectedSources().length}개 금융정보가 연결되어 있어요. 각 정보는 월 자금 흐름 이해, 정보 수정, 필요한 변화 알림에만 사용해요.`,
        'xp-policy':'본인확인, 데이터 연결, 동의 관리, 정기적인 금융정보 확인을 완료할 때마다 XP가 쌓여요. 건강한 금융관리 습관을 즐겁게 이어가도록 도와드려요.',
        'lesson-policy':'짧은 학습과 이해 확인을 마칠 때마다 XP가 쌓여요. XP는 금융지식과 관리 습관의 성장을 보여주며, 실제 금융조건은 금융기관이 결정해요.',
        'score-policy':'소득과 성실한 납입 정보가 신용평가에 반영되면 신용점수 개선과 더 정확한 대출조건 비교에 도움이 될 수 있어요. 표시 숫자는 예시 범위이며 실제 점수는 KCB·NICE가 결정해요.',
        'stable-policy':'국내 대출 비교와 분리된 선택 기능이에요. FIU 신고 사업자와 연결해 비용과 예상 수령액을 투명하게 비교하는 구조를 체험할 수 있어요.',
        badges:'데이터 이용 동의 확인, 소득 흐름 연결, 월 자금계획 확인, 여러 종류의 정보 연결, 5일 연속 관리로 배지를 받을 수 있어요.',
        reset:'연결·XP·미션·시뮬레이터 상태를 처음으로 돌립니다. 실제 외부 데이터는 삭제하지 않습니다.'
      };
      content = `<div class="sheet-head"><div><span class="eyebrow">MY:ME</span><h2>${titles[m.type]||'안내'}</h2><p>${bodies[m.type]||''}</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div>${m.type==='consent'?'<button class="primary wide" style="margin-top:20px" data-confirm-consent>동의 범위를 확인했어요</button>':m.type==='reset'?'<div class="row-actions" style="margin-top:22px"><button class="quiet-btn" data-close>취소</button><button class="danger-btn" data-reset-confirm>초기화</button></div>':'<button class="secondary wide" style="margin-top:20px" data-close>확인</button>'}`;
    }
    return `<div class="modal-backdrop" role="presentation" data-backdrop><section class="sheet" role="dialog" aria-modal="true"><div class="sheet-handle"></div>${content}</section></div>`;
  }

  function customerGate() {
    if (gateMode==='confirm') return `<div class="customer-gate"><main class="gate-shell gate-confirm"><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong></div><div class="gate-success">${svg('qr')}</div><span class="gate-kicker">QR CUSTOMER LOGIN</span><h1>QR 로그인 링크가<br>확인됐어요</h1><p>내 데이터를 연결해 신용 성장 가능성과 맞춤 대출조건을 바로 확인해보세요.</p><div class="gate-benefits"><div>${svg('spark')}<span><b>신용 성장 지도</b>데이터별 예상 개선 범위를 확인해요</span></div><div>${svg('gavel')}<span><b>금융사 제안 비교</b>금리와 한도를 한눈에 살펴봐요</span></div><div>${svg('shield')}<span><b>내가 선택한 정보</b>연결 범위를 직접 관리해요</span></div></div><button class="primary wide gate-primary" data-qr-confirm>QR로 my:ME 시작하기 ${svg('arrow')}</button><small class="gate-caption">고객 체험 로그인 · 실제 본인인증과 금융조회는 정식 서비스에서 연결됩니다.</small></main></div>`;
    if (gateMode==='qr') return `<div class="customer-gate"><main class="gate-shell qr-shell"><button class="gate-back" data-gate-back>${svg('arrow')} 다른 방법</button><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong></div><span class="gate-kicker">SCAN TO START</span><h1>휴대폰 카메라로<br>QR을 스캔하세요</h1><p>카카오톡 QR 스캐너나 기본 카메라로 촬영하면 휴대폰에서 바로 시작할 수 있어요.</p><div class="qr-frame"><img src="customer_qr.png" alt="my:ME 고객 체험 로그인 QR 코드"><i></i></div><div class="qr-steps"><span>1</span>QR 촬영 <b>›</b><span>2</span>링크 열기 <b>›</b><span>3</span>로그인 완료</div><button class="secondary wide" data-copy-link>고객 실행 링크 복사</button><small class="gate-caption">${PUBLIC_URL}</small></main></div>`;
    return `<div class="customer-gate"><main class="gate-shell"><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong><span>고객 체험</span></div><section class="gate-hero"><span class="gate-kicker">MY CREDIT GROWTH</span><h1>내 데이터로<br>신용 성장의 기회를 키워요</h1><p>연결할수록 신용점수 개선과 더 정확한 한도·금리 비교에 도움이 돼요.</p><div class="gate-visual"><div class="gate-score"><strong>+0~</strong><span>데이터별<br>개선 예상</span></div><div class="gate-orbit o1">${svg('bank')}<small>소득</small></div><div class="gate-orbit o2">${svg('credit')}<small>신용</small></div><div class="gate-orbit o3">${svg('chart')}<small>성장</small></div></div></section><div class="gate-actions"><button class="primary wide gate-primary" data-open-qr>${svg('qr')} QR로 간편로그인</button><button class="secondary wide" data-guest-start>이 휴대폰에서 바로 시작</button></div><div class="gate-trust">${svg('shield')}<span><b>고객 체험 로그인</b>실제 개인정보 입력 없이 주요 기능을 먼저 확인해요.</span></div></main></div>`;
  }

  function render() {
    document.body.classList.toggle('large-text', !!state.largeText);
    if (!customerAuth || pendingQrEntry) { app.innerHTML=customerGate(); return; }
    const screens = { home:homeScreen, connect:connectScreen, journey:journeyScreen, compare:compareScreen, my:myScreen };
    app.innerHTML = `<div class="app-shell">${header()}<main id="app-main">${(screens[state.screen]||homeScreen)()}</main>${bottomNav()}${modalView()}${state.toast?`<div class="toast" role="status">${state.toast}</div>`:''}</div>`;
  }

  function showToast(message) {
    state.toast = message; render();
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(()=>{ state.toast=''; render(); },2600);
  }
  function celebrate() {
    const layer = document.createElement('div'); layer.className='confetti';
    const colors=['#6b35e2','#36d2aa','#ffb84d','#2b5fa8','#d66fa1'];
    for(let i=0;i<22;i++) { const piece=document.createElement('i'); const angle=(Math.PI*2*i)/22; const dist=80+Math.random()*160; piece.style.setProperty('--x',`${Math.cos(angle)*dist}px`); piece.style.setProperty('--y',`${Math.sin(angle)*dist-80}px`); piece.style.setProperty('--r',`${Math.random()*540}deg`); piece.style.setProperty('--c',colors[i%colors.length]); layer.appendChild(piece); }
    document.body.appendChild(layer); setTimeout(()=>layer.remove(),950);
  }
  function openSource(id) { state.modal={type:'source',id,step:1}; render(); }
  function runMission(action) {
    if (!action) return;
    if (action==='checkin') { if(!state.checkin){state.checkin=true;save();celebrate();showToast('25 XP 획득 · 오늘의 변화를 확인했어요.');} return; }
    if (action==='consent') { state.modal={type:'consent'}; render(); return; }
    if (action.startsWith('source:')) { openSource(action.split(':')[1]); }
  }
  function runCoachAction(action) {
    state.modal=null;
    if (action==='compare') { state.screen='compare'; save(); render(); window.scrollTo(0,0); return; }
    if (action?.startsWith('source:')) { state.screen='connect'; openSource(action.split(':')[1]); }
  }
  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    const utterance=new SpeechSynthesisUtterance(String(text));
    utterance.lang='ko-KR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
  function advisorAnswer(question) {
    const q=String(question||'').trim();
    if(!q) return;
    let answer='연결한 금융정보를 바탕으로 신용 성장과 대출조건 비교 방법을 쉽게 설명해드릴게요. 실제 조건은 금융기관과 신용평가사가 결정해요.';
    if(/사람|상담원/.test(q)) answer='상담원에게 이어서 물어볼 수 있어요. 정식 서비스에서는 제휴 고객센터 운영시간과 연결번호를 바로 보여드릴게요.';
    else if(/점수|신용/.test(q)) answer=`현재 연결 정보가 신용평가에 반영되면 +0~${scoreScenarioTotal()}점 개선에 도움이 될 수 있어요. 실제 점수 변화는 KCB·NICE가 결정해요.`;
    else if(/역경매|대출/.test(q)) answer='한 번 입력한 정보로 여러 등록 금융사의 금리·한도·제안 이유를 받아 한눈에 비교하는 방식이에요. 내게 더 잘 맞는 조건을 선택할 수 있어요.';
    else if(/스테이블|코인|송금/.test(q)) answer='신고된 전문 사업자와 연결해 환율, 비용, 예상 수령액을 먼저 비교하는 선택 기능이에요. 국내 대출 비교와는 별도로 이용할 수 있어요.';
    state.advisorMessages=[...(Array.isArray(state.advisorMessages)?state.advisorMessages:defaultState.advisorMessages),{role:'user',text:q},{role:'ai',text:answer}].slice(-10);
    const first=!state.advisorUsed; state.advisorUsed=true; save(); render(); speakText(answer);
    if(first){setTimeout(()=>showToast('15 XP 획득 · 상담 내용을 확인했어요.'),120);}
  }
  function startVoiceRecognition() {
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){showToast('텍스트 상담으로 바로 이어갈 수 있어요.');return;}
    const recognition=new SR(); recognition.lang='ko-KR'; recognition.interimResults=true;
    const input=document.getElementById('advisorInput');
    recognition.onstart=()=>document.body.classList.add('is-listening');
    recognition.onresult=e=>{if(input) input.value=Array.from(e.results).map(x=>x[0].transcript).join('');};
    recognition.onend=()=>document.body.classList.remove('is-listening');
    recognition.onerror=recognition.onend;
    try{recognition.start();}catch(_){showToast('마이크를 시작하지 못했습니다. 텍스트로 질문해 주세요.');}
  }
  function exportState() {
    const payload = { exportedAt:new Date().toISOString(), profile:profileName(), coverage:coverage(), connected:connectedSources().map(s=>({id:s.id,name:s.name,purpose:s.purpose})), note:'시연용 근거 상태. 실제 신용점수·심사·금융제안이 아님.' };
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='myME_금융정보_시연.json'; a.click(); URL.revokeObjectURL(url); showToast('내 금융정보를 시연 파일로 저장했어요.');
  }

  app.addEventListener('click', event => {
    if (event.target.closest('[data-open-qr]')) { gateMode='qr'; render(); return; }
    if (event.target.closest('[data-gate-back]')) { gateMode='welcome'; render(); return; }
    if (event.target.closest('[data-guest-start]')) { completeCustomerLogin('direct'); return; }
    if (event.target.closest('[data-qr-confirm]')) { completeCustomerLogin('qr'); return; }
    if (event.target.closest('[data-copy-link]')) { const button=event.target.closest('[data-copy-link]'); navigator.clipboard?.writeText(PUBLIC_URL).then(()=>{button.textContent='고객 실행 링크 복사 완료';}).catch(()=>{button.textContent=PUBLIC_URL;}); return; }
    if (event.target.closest('[data-customer-logout]')) { localStorage.removeItem(AUTH_KEY); customerAuth=null; gateMode='welcome'; render(); window.scrollTo(0,0); return; }
    const nav = event.target.closest('[data-nav]');
    if (nav) { state.screen=nav.dataset.nav; state.modal=null; state.toast=''; save(); render(); window.scrollTo(0,0); return; }
    const profile = event.target.closest('[data-profile]');
    if (profile) { state.profile=profile.dataset.profile; save(); render(); return; }
    const source = event.target.closest('[data-source]');
    if (source) { openSource(source.dataset.source); return; }
    const mission = event.target.closest('[data-mission]');
    if (mission) { runMission(mission.dataset.mission); return; }
    const coachAction = event.target.closest('[data-coach-action]');
    if (coachAction) { runCoachAction(coachAction.dataset.coachAction); return; }
    if (event.target.closest('[data-auction-run]')) { const first=!state.auctionReviewed; state.auctionRun=true; state.auctionReviewed=true; state.selectedBid=auctionBids()[0]?.id||null; save(); celebrate(); showToast(first?'20 XP 획득 · 예시 금융사 응찰이 도착했어요.':'같은 입력값으로 응찰 조건을 다시 계산했어요.'); return; }
    const bid = event.target.closest('[data-bid]');
    if (bid) { state.selectedBid=bid.dataset.bid; save(); render(); return; }
    const advisorQuestion = event.target.closest('[data-advisor-question]');
    if (advisorQuestion) { advisorAnswer(advisorQuestion.dataset.advisorQuestion); return; }
    if (event.target.closest('[data-advisor-send]')) { advisorAnswer(document.getElementById('advisorInput')?.value); return; }
    if (event.target.closest('[data-advisor-mic]')) { if(!state.voiceConsent){state.modal={type:'voice-consent'};render();}else startVoiceRecognition(); return; }
    if (event.target.closest('[data-voice-consent]')) { state.voiceConsent=true; state.modal={type:'advisor'}; save(); render(); setTimeout(startVoiceRecognition,120); return; }
    if (event.target.closest('[data-stable-review]')) { const first=!state.stableReviewed; state.stableReviewed=true; state.modal=null; save(); celebrate(); showToast(first?'15 XP 획득 · 해외정산 이용 구조를 알아봤어요.':'해외정산 이용 구조를 다시 확인했어요.'); return; }
    const close = event.target.closest('[data-close]');
    if (close || (event.target.matches('[data-backdrop]'))) { state.modal=null; render(); return; }
    const connect = event.target.closest('[data-connect]');
    if (connect) {
      const id=connect.dataset.connect; state.modal={type:'source',id,step:2}; render();
      setTimeout(()=>{ const src=sourceCatalog.find(s=>s.id===id); state.connected[id]=true; state.modal=null; save(); celebrate(); showToast(`${src.points} XP 획득 · 정보 범위 +${coverageGain(src)}%p · 점수 시나리오 +0~${scoreScenario(src).max}점`); },900); return;
    }
    const filter = event.target.closest('[data-filter]');
    if (filter) { state.filter=filter.dataset.filter==='refi'?'rate':filter.dataset.filter; render(); return; }
    const product = event.target.closest('[data-product]');
    if (product) { state.modal={type:'product',id:product.dataset.product}; render(); return; }
    const revoke = event.target.closest('[data-revoke]');
    if (revoke) { const src=sourceCatalog.find(s=>s.id===revoke.dataset.revoke); state.connected[revoke.dataset.revoke]=false; save(); showToast(`${src.name} 연결 상태를 변경했어요. 필요할 때 다시 연결할 수 있어요.`); return; }
    const toggle = event.target.closest('[data-toggle]');
    if (toggle) { state[toggle.dataset.toggle]=!state[toggle.dataset.toggle]; save(); render(); return; }
    if (event.target.closest('[data-confirm-consent]')) { state.consentReviewed=true; state.modal=null; save(); celebrate(); showToast('30 XP 획득 · 동의주권 배지가 열렸어요.'); return; }
    const quiz = event.target.closest('[data-quiz]');
    if (quiz) { if(quiz.dataset.quiz==='correct'){const first=!state.lessonDone;state.lessonDone=true;state.modal=null;save();celebrate();showToast(first?'20 XP 획득 · 금융 퀘스트 완료':'정답이에요 · 핵심을 다시 확인했어요.');}else{showToast('금리 외 수수료와 남은 기간도 함께 비교해보세요.');} return; }
    if (event.target.closest('[data-reset-confirm]')) { localStorage.removeItem(STORAGE_KEY); state={...defaultState,connected:{...defaultState.connected},advisorMessages:[...defaultState.advisorMessages]}; render(); showToast('시연 데이터를 초기화했어요.'); return; }
    const action = event.target.closest('[data-action]');
    if (action) {
      const type=action.dataset.action;
      if(type==='export') { exportState(); return; }
      if(type==='reset') { state.modal={type:'reset'}; render(); return; }
      state.modal={type}; render();
    }
  });

  app.addEventListener('input', event => {
    if (event.target.matches('[data-range]')) { state[event.target.dataset.range]=Number(event.target.value); save(); render(); }
    if (event.target.matches('[data-number]')) { state[event.target.dataset.number]=Number(event.target.value); save(); render(); }
  });
  app.addEventListener('change', event => {
    if (event.target.matches('[data-select]')) { state[event.target.dataset.select]=['term','remainingTerm'].includes(event.target.dataset.select)?Number(event.target.value):event.target.value; save(); render(); }
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  render();
})();
