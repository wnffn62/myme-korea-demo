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
    stableAuctionRun:false, selectedStableBid:null, stableDestination:'PH', stableReceive:'bank',
    advisorMessages:[{role:'ai',text:'더 좋은 대출·송금 조건을 찾는 방법, 지금 바로 쉽게 알려드릴게요.'}],
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
    if (b.ratio > 40) return { tone:'info', title:'매달 더 여유로운 조건을 찾아봐요', text:`현재 월소득 대비 대출 납입 비율은 참고값 ${b.ratio.toFixed(1)}%예요. 기간과 금리를 바꿔보면 내 생활에 더 잘 맞는 조건을 찾을 수 있어요.`, action:'compare', label:'내게 편한 월 납입액 찾기' };
    if (next) return { tone:'info', title:`${next.name}을 더하면 선택지가 넓어져요`, text:`금융정보 범위가 약 ${coverageGain(next)}%p 넓어지고, 신용점수 개선 가능성은 +0~${scoreScenario(next).max}점 범위로 바로 볼 수 있어요.`, action:`source:${next.id}`, label:`지금 연결하고 +${next.points} XP 받기` };
    return { tone:'safe', title:'좋은 조건을 만날 준비가 됐어요', text:'연결한 강점과 월 납입 계획을 바탕으로 여러 금융사의 제안을 한 번에 받아보세요.', action:'compare', label:'지금 금융사 제안 받기' };
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
  const stableDestinations = [
    { id:'PH', name:'필리핀', currency:'PHP' },
    { id:'VN', name:'베트남', currency:'VND' },
    { id:'MN', name:'몽골', currency:'MNT' },
    { id:'US', name:'미국', currency:'USD' },
  ];
  function stableDestination() { return stableDestinations.find(item=>item.id===state.stableDestination) || stableDestinations[0]; }
  function stableAuctionBids() {
    const krw=Number(state.stableAmount)*10000;
    const fx=1380;
    return [
      { id:'remit-a', initial:'A', name:'제휴 송금사 A', feeRate:.0029, fixed:3500, speed:'약 10분', tag:'총비용 추천' },
      { id:'remit-b', initial:'B', name:'제휴 송금사 B', feeRate:.0024, fixed:8500, speed:'약 5분', tag:'빠른 도착' },
      { id:'remit-c', initial:'C', name:'제휴 송금사 C', feeRate:.0038, fixed:0, speed:'당일 도착', tag:'고정비 없음' },
    ].map(item=>{
      const fee=Math.round(krw*item.feeRate+item.fixed);
      return {...item,fee,usdc:(krw-fee)/fx};
    }).sort((a,b)=>a.fee-b.fee);
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
      { id:'checkin', title:'오늘의 금융 성장 체크', desc:'한 번 눌러 최신 상태를 확인하고 XP를 받아요.', points:25, done:state.checkin, action:'checkin' },
      { id:nextSource ? nextSource.id : 'all', title:nextSource ? `${nextSource.name}을 더해 선택지 넓히기` : '내 금융 강점이 충분히 모였어요', desc:nextSource ? nextSource.desc : '이제 여러 조건을 마음껏 비교해보세요.', points:nextSource ? nextSource.points : 0, done:!nextSource, action:nextSource ? `source:${nextSource.id}` : '' },
      { id:'consent', title:'내 데이터 주도권 챙기기', desc:'어디에 쓰이는지 한눈에 보고 +30 XP를 받아요.', points:30, done:state.consentReviewed, action:'consent' },
    ];
  }
  function nextMission() { return missions().find(m=>!m.done) || missions()[0]; }

  function header() {
    return `<header class="app-header"><div class="brand-lockup"><div class="brand-mark">m:M</div><div class="brand-copy"><strong>my:ME</strong><span>KOREA · EVIDENCE WALLET</span></div></div><div class="header-actions"><button class="icon-btn voice-entry" data-action="advisor" aria-label="AI 음성상담">${svg('mic')}</button><button class="icon-btn" data-action="help" aria-label="서비스 안내">${svg('help')}</button><button class="icon-btn" data-action="alerts" aria-label="알림">${svg('bell')}<i class="dot"></i></button></div></header>`;
  }

  function bottomNav() {
    const items = [['home','home','홈'],['connect','link','연결'],['compare','gavel','대출'],['stable','coins','송금'],['my','user','내 정보']];
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
    const stable = stableQuote();
    return `<section class="screen" data-screen-view="home">
      <div class="passport">
        <div class="passport-top"><div><small>MY CREDIT GROWTH MAP</small><h1>내 데이터로<br>금융 기회를 키워요</h1></div><span class="demo-pill"><i></i>바로 체험</span></div>
        <div class="constellation"><div class="orbit"></div><div class="passport-core"><div><strong>${cov}%</strong><span>정보 연결도</span></div></div>
          ${node('bank','n1','bank')}${node('credit','n2','credit')}${node('tax','n3','tax')}${node('health','n4','health')}${node('telecom','n5','phone')}${node('platform','n6','store')}
        </div>
        <div class="passport-stats"><div><span>연결한 데이터</span><strong>${connectedSources().length} / ${sourceCatalog.length}개</strong></div><div><span>나의 성장 단계</span><strong>Lv.${li.index} ${li.current.name}</strong></div><div><span>최근 확인</span><strong>방금 전</strong></div></div>
        <button class="passport-global" data-nav="stable"><span>${svg('coins')}</span><div><b>더 좋은 해외송금 조건 찾기</b><small>지금 3개 송금사 제안 받기</small></div>${svg('arrow')}</button>
      </div>
      <div class="notice safe"><b>데이터를 더할수록 좋은 조건이 늘어나요</b>꾸준한 소득과 성실한 금융생활을 내 강점으로 보여주고, 더 잘 맞는 한도·금리 제안을 한 번에 만나보세요.</div>
      <article class="home-stable"><div class="home-stable-head"><div class="home-coin">${svg('coins')}</div><div><span class="eyebrow">USDC GLOBAL REMITTANCE</span><h2>더 좋은 해외송금 조건을 한 번에</h2><p>여러 송금사가 비용·수령량·도착시간을 제안하면 내가 가장 마음에 드는 조건을 골라요.</p></div></div><div class="home-stable-flow"><span>원화</span><b>›</b><span>송금사 제안</span><b>›</b><span>USDC</span><b>›</b><span>현지 수령</span></div><div class="home-stable-numbers"><div><small>${fmt(state.stableAmount)}만원 보낼 때</small><strong>${stable.usdc.toFixed(2)} USDC</strong></div><div><small>비용 예시</small><strong>${Math.round(stable.fee/10000).toLocaleString('ko-KR')}만원</strong></div></div><button class="stable-entry" data-nav="stable">지금 3개 송금사 제안 받기 ${svg('arrow')}</button></article>
      <article class="coach-card ${coach.tone}"><div class="coach-orb">${svg('spark')}</div><div><span class="eyebrow">MY:ME COACH</span><h2>${coach.title}</h2><p>${coach.text}</p><button class="coach-link" data-action="coach">${coach.label} ${svg('arrow')}</button></div></article>
      <article class="next-mission"><div class="mission-meta"><span class="eyebrow">지금 하면 좋은 한 가지</span><span class="xp">+${mission.points} XP</span></div><h3>${mission.title}</h3><p>${mission.desc}</p><div class="progress-track"><i style="width:${li.progress}%"></i></div><button class="primary wide" style="margin-top:14px" data-mission="${mission.action}">${mission.done?'오늘의 성장 다시 보기':`지금 시작하고 +${mission.points} XP 받기`} ${svg('arrow')}</button></article>
      <div class="section-head"><h2>오늘의 금융 한눈에 보기</h2><button data-nav="journey">내 금융 레벨 보기</button></div>
      <div class="stat-grid"><div class="stat-card"><span>이번 달 대출 납입</span><strong>${won(state.existing)}</strong><em>일정 준비 완료</em></div><div class="stat-card"><span>생활비 후 남는 금액</span><strong>${won(burden().disposable)}</strong><em>여유자금 계획</em></div><div class="stat-card"><span>더 나은 금리 찾기</span><strong>${state.watchRate?'찾는 중':'설정 가능'}</strong><em>${state.watchRate?'안정적으로 확인 중':'한 번에 알림 켜기'}</em></div></div>
      <div class="section-head"><h2>최근 확인한 내용</h2></div>
      <div class="timeline"><div class="timeline-item"><span class="timeline-ic">${svg('bank')}</span><div><b>은행·대출 정보가 새로워졌어요</b><small>잔액과 이번 달 납입 예정액을 확인했어요.</small></div><span class="status">최신</span></div><div class="timeline-item"><span class="timeline-ic">${svg('shield')}</span><div><b>내 데이터 동의 범위</b><small>${state.consentReviewed?'사용 목적과 보유기간을 확인했어요.':'한 번 확인하면 더 안심할 수 있어요.'}</small></div><span class="status">${state.consentReviewed?'완료':'확인'}</span></div><div class="timeline-item"><span class="timeline-ic">${svg('clock')}</span><div><b>더 나은 금리 기회를 찾고 있어요</b><small>소득·신용 변화가 생기면 알려드려요.</small></div><span class="status">ON</span></div></div>
    </section>`;
  }

  function stableScreen() {
    const q=stableQuote();
    const bids=stableAuctionBids();
    const selected=bids.find(bid=>bid.id===state.selectedStableBid) || bids[0];
    const shownQuote=state.stableAuctionRun ? selected : q;
    const destination=stableDestination();
    const uses=[
      ['user','해외 가족·생활비 보내기','비용과 도착 금액을 보고 마음에 드는 조건을 골라요.'],
      ['wallet','글로벌 프리랜서 정산','해외에서 받은 대금을 더 빠르고 선명하게 정산해요.'],
      ['store','해외 사업대금 정산','여러 파트너의 비용과 도착시간을 한눈에 비교해요.'],
    ];
    const steps=[
      ['1','금액만 입력','원화 기준으로 보낼 금액을 바로 정해요.'],
      ['2','제안 골라보기','비용·수령량·도착시간이 가장 마음에 드는 제안을 골라요.'],
      ['3','안심 확인','제휴 송금사가 본인확인과 안전 절차를 진행해요.'],
      ['4','현지에서 받기','선택한 방식으로 편리하게 받아요.'],
    ];
    return `<section class="screen stable-screen" data-screen-view="stable">
      <article class="stable-detail-hero"><div><span class="eyebrow">MY:ME REMITTANCE</span><h1>여러 송금사가<br>더 좋은 조건을 제안해요</h1><p>국가와 금액만 고르면 비용, 받을 수량, 도착시간을 한 번에 비교하고 내가 직접 선택해요.</p></div><div class="stable-detail-orb"><span>USDC</span><strong>${shownQuote.usdc.toFixed(2)}</strong><small>${state.stableAuctionRun?'내가 고른 예상 수령량':'지금 받을 수 있는 예시'}</small></div></article>

      <article class="remit-auction-card"><div class="remit-auction-head"><div><span class="eyebrow">REMITTANCE REVERSE AUCTION</span><h2>한 번에 받고, 가장 좋은 제안 고르기</h2><p>총비용·받는 수량·도착시간을 같은 기준으로 바로 비교해요.</p></div><div class="remit-gavel">${svg('gavel')}</div></div><div class="remit-selects"><label><span>어디로 보낼까요?</span><select data-select="stableDestination">${stableDestinations.map(item=>`<option value="${item.id}" ${item.id===destination.id?'selected':''}>${item.name} · ${item.currency}</option>`).join('')}</select></label><label><span>어떻게 받을까요?</span><select data-select="stableReceive"><option value="bank" ${state.stableReceive==='bank'?'selected':''}>현지 은행계좌</option><option value="wallet" ${state.stableReceive==='wallet'?'selected':''}>지원 지갑</option><option value="cash" ${state.stableReceive==='cash'?'selected':''}>제휴 수령처</option></select></label></div><div class="field remit-amount"><label><span>얼마를 보낼까요?</span><b>${fmt(state.stableAmount)}만원</b></label><input data-range="stableAmount" type="range" min="10" max="3000" step="10" value="${state.stableAmount}"></div>
        ${state.stableAuctionRun?`<div class="remit-auction-summary"><div><b>${bids.length}개 제안이 도착했어요</b><span>${destination.name} · ${state.stableReceive==='bank'?'현지 은행계좌':state.stableReceive==='wallet'?'지원 지갑':'제휴 수령처'}</span></div><button data-stable-auction-run>새 제안 받기</button></div><div class="remit-bid-list">${bids.map((bid,i)=>`<button class="remit-bid ${selected.id===bid.id?'selected':''}" data-stable-bid="${bid.id}"><span class="remit-rank">${i+1}</span><div class="remit-bid-brand"><span>${bid.initial}</span><div><b>${bid.name}</b><small>${bid.tag} · 제휴 전 체험 예시</small></div></div><div class="remit-bid-metrics"><div><small>총비용</small><strong>${bid.fee.toLocaleString('ko-KR')}원</strong></div><div><small>받는 수량</small><strong>${bid.usdc.toFixed(2)} USDC</strong></div><div><small>도착시간</small><strong>${bid.speed}</strong></div></div>${selected.id===bid.id?`<span class="remit-selected">${svg('check')} 내 선택</span>`:''}</button>`).join('')}</div><button class="primary wide remit-continue" data-stable-continue>이 조건으로 다음 단계 보기 ${svg('arrow')}</button>`:`<div class="remit-auction-stage"><div><span>A</span><small>비용 제안</small></div><i></i><div><span>B</span><small>속도 제안</small></div><i></i><div><span>C</span><small>수령량 제안</small></div></div><button class="primary wide" data-stable-auction-run>지금 3개 송금사 제안 받기 ${svg('arrow')}</button>`}
      </article>

      <article class="stable-calc-card"><div class="stable-title-row"><div><span class="eyebrow">MY CHOICE</span><h2>${state.stableAuctionRun?'내가 고른 송금 조건':'받을 금액 먼저 보기'}</h2></div><span class="sample-tag">체험 계산</span></div><div class="stable-detail-quote"><div><small>내가 내는 총비용</small><strong>${shownQuote.fee.toLocaleString('ko-KR')}원</strong><span>${state.stableAuctionRun?selected.name:'기본 0.4%'} 예시</span></div><div><small>받을 수 있는 수량</small><strong>${shownQuote.usdc.toFixed(2)} USDC</strong><span>1 USDC = 1,380원 예시</span></div></div><div class="stable-detail-flow"><div><span>${svg('wallet')}</span><b>원화</b></div><i>›</i><div><span>${svg('shield')}</span><b>제휴 송금사</b></div><i>›</i><div><span>${svg('coins')}</span><b>USDC</b></div><i>›</i><div><span>${svg('user')}</span><b>${destination.name} 수령</b></div></div><small class="stable-calc-note">최종 환율과 비용은 선택한 송금사 화면에서 다시 한 번 선명하게 보여드려요.</small></article>

      <div class="section-head stable-section-head"><h2>이런 때 활용할 수 있어요</h2></div><div class="stable-use-grid">${uses.map(([icon,title,text])=>`<article><span>${svg(icon)}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>

      <div class="section-head stable-section-head"><h2>이용 순서</h2></div><div class="stable-steps">${steps.map(([number,title,text])=>`<article><span>${number}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div>

      <article class="stable-safety"><div class="stable-safety-head"><span>${svg('shield')}</span><div><span class="eyebrow">SAFE PARTNER RAIL</span><h2>안심 기준까지 한눈에</h2></div></div><div class="stable-safety-list"><div>${svg('check')}<span><b>확인된 제휴사만 연결</b>신고·인허가 요건을 확인한 파트너 조건만 보여드려요.</span></div><div>${svg('check')}<span><b>내 정보는 필요한 만큼만</b>제휴사가 본인확인과 자금세탁방지 절차를 진행해요.</span></div><div>${svg('check')}<span><b>송금 경로도 꼼꼼하게</b>트래블룰과 위험 주소 확인 절차를 적용해요.</span></div><div>${svg('check')}<span><b>비용은 보내기 전에</b>환율, 수수료, 받을 수량을 먼저 보고 선택해요.</span></div></div><button class="secondary wide" data-action="stablecoin">안심 기준 자세히 보기</button></article>

      <div class="notice info"><b>개인정보 없이 송금 비교를 먼저 즐겨보세요</b>현재는 체험 버전이며 실제 송금은 정식 제휴와 국가별 절차를 갖춘 뒤 제공해요.</div><button class="primary wide stable-advisor" data-action="advisor">${svg('mic')} AI에게 내 송금 조건 물어보기</button>
    </section>`;
  }

  function connectScreen() {
    const grouped = [...new Set(sourceCatalog.map(s=>s.category))];
    return `<section class="screen" data-screen-view="connect"><span class="eyebrow">MYDATA CONNECTION</span><h1 class="screen-title">내 데이터를 더할수록<br>좋은 조건에 가까워져요</h1><p class="screen-lead">연결할 때마다 점수 성장 가능성과 넓어지는 대출 선택지를 바로 보여드려요.</p>
      <div class="profile-switch" role="group" aria-label="소득 유형"><button data-profile="employee" class="${state.profile==='employee'?'on':''}">직장인</button><button data-profile="freelancer" class="${state.profile==='freelancer'?'on':''}">프리랜서</button><button data-profile="business" class="${state.profile==='business'?'on':''}">개인사업자</button></div>
      <article class="score-lab"><div class="score-lab-head"><div><span class="eyebrow">MY SCORE GROWTH</span><h2>내 데이터가 만드는 성장 가능성</h2></div><strong>+0~${scoreScenarioTotal()}<small>점</small></strong></div><p>소득과 성실한 납입 기록이 신용평가에 반영될 때 기대할 수 있는 개선 가능성을 보여드려요.</p><div class="score-scale"><i style="width:${Math.min(100,scoreScenarioTotal()/41*100)}%"></i></div><button data-action="score-policy">어떻게 달라지는지 바로 보기</button></article>
      <div class="notice info"><b>${profileName()}이라면 이것부터 연결해보세요</b>${state.profile==='employee'?'건강보험·국세 소득·카드 고정지출':state.profile==='freelancer'?'플랫폼 정산·국세 소득·계좌 입금 흐름':'국세 신고·PG 매출·사업용 계좌'}이 내 강점을 빠르게 보여줘요.</div>
      ${grouped.map(cat=>`<div class="category-label">${cat}</div><div class="source-list">${sourceCatalog.filter(s=>s.category===cat).map(s=>`<article class="source-card ${state.connected[s.id]?'is-connected':''}"><div class="source-icon ${s.class}">${svg(s.icon)}</div><div class="source-copy"><div class="source-title-row"><h3>${s.name}</h3>${state.connected[s.id]?`<span class="connected">${svg('check')} 내 강점에 반영</span>`:''}</div><p>${s.desc}</p></div><div class="score-impact"><span class="score-arrow">↗</span><div><small>${scoreScenario(s).max>0?'연결 후 기대 변화':'맞춤 분석 효과'}</small><strong>${scoreImpactValue(s)}</strong></div><span class="coverage-chip">선택지 +${coverageGain(s)}%p</span></div>${state.connected[s.id]?`<button class="connected-action" disabled>${svg('check')} 좋은 조건 찾기에 반영됐어요</button>`:`<button class="connect-btn gain" data-source="${s.id}"><span>${s.name} 연결하고 +${s.points} XP 받기</span><small>내 금융 강점을 하나 더 보여줘요</small></button>`}</article>`).join('')}</div>`).join('')}
      <div class="notice safe"><b>실제 데이터 없이 연결 효과부터 만나보세요</b>지금은 브라우저 체험으로 가볍게 시작하고, 정식 서비스에서는 동의한 정보만 안전하게 연결해요.</div>
    </section>`;
  }

  function journeyScreen() {
    const li = levelInfo(); const score = xp(); const nextAt = li.next?.min || score;
    return `<section class="screen" data-screen-view="journey"><span class="eyebrow">EVIDENCE JOURNEY</span><h1 class="screen-title">연결할수록<br>내 금융 레벨이 올라가요</h1><p class="screen-lead">데이터를 더하고 금융 퀘스트를 완료할 때마다 XP·레벨·배지가 쌓여요.</p>
      <div class="level-card"><div class="level-top"><div class="level-number">${li.index}</div><div class="level-copy"><span>LEVEL ${li.index}</span><h2>${li.current.name}</h2><p>${li.current.text}</p></div></div><div class="level-xp"><span>${score} XP</span><span>${li.next?`${nextAt} XP까지 ${nextAt-score}`:'최종 단계'}</span></div><div class="progress-track" style="margin-top:8px"><i style="width:${li.progress}%"></i></div></div>
      <div class="streak"><div><strong>연속 ${state.streak + (state.checkin?1:0)}일 성장 중</strong><p>오늘 한 번만 확인해도 성장 기록이 이어져요.</p></div><span class="flame">${state.streak + (state.checkin?1:0)}▲</span></div>
      <article class="credit-map"><div class="credit-map-head"><div><span class="eyebrow">SCORE QUEST</span><h2>점수 성장 퀘스트</h2></div><strong>+0~${scoreScenarioTotal()}점</strong></div><p>연결할 수 있는 데이터와 기대 성장 범위를 한눈에 보여드려요.</p><div class="credit-steps">${sourceCatalog.slice(0,5).map(s=>`<button class="credit-step ${state.connected[s.id]?'on':''}" ${state.connected[s.id]?'disabled':`data-mission="source:${s.id}"`}><span>${state.connected[s.id]?svg('check'):svg(s.icon)}</span><b>${s.name}</b><small>${scoreScenario(s).max>0?`+0~${scoreScenario(s).max}`:'분석 UP'}</small></button>`).join('')}</div></article>
      <div class="section-head"><h2>오늘의 미션</h2><button data-action="xp-policy">XP 기준</button></div><div class="mission-list">${missions().map(m=>`<article class="mission-card ${m.done?'done':''}"><span class="mission-check">${m.done?svg('check'):svg('target')}</span><div><h3>${m.title}</h3><p>${m.desc}</p></div>${m.done?'<span class="xp">완료</span>':`<button class="connect-btn" data-mission="${m.action}">+${m.points}</button>`}</article>`).join('')}</div>
      <div class="section-head"><h2>금융 퀘스트</h2><button data-action="lesson-policy">XP 받는 법</button></div><article class="lesson-card ${state.lessonDone?'done':''}"><div class="lesson-number">01</div><div><span class="eyebrow">3분이면 +20 XP</span><h3>갈아타면 얼마나 아낄 수 있을까요?</h3><p>이자와 수수료를 함께 보고 내게 더 알뜰한 조건을 직접 찾아봐요.</p><button class="secondary small-btn" data-action="lesson">${state.lessonDone?'한 번 더 도전하기':'3분 퀘스트 시작하기'}</button></div></article>
      <div class="section-head"><h2>내 배지</h2><button data-action="badges">배지 기준</button></div><div class="badge-grid">${badgeData().map(b=>`<article class="badge-card ${b.on?'on':''}"><div class="badge-medal">${svg(b.icon)}</div><strong>${b.name}</strong><span>${b.desc}</span></article>`).join('')}</div>
      <div class="notice safe"><b>할 때마다 XP와 배지가 쌓여요</b>연결하고, 배우고, 내 정보를 관리하며 금융 성장을 게임처럼 즐겨보세요.</div>
    </section>`;
  }

  function sortedProducts() {
    const list = products.filter(p=>p.profiles.includes(state.profile));
    return [...list].sort((a,b)=>state.filter==='limit'?b.max-a.max:a.rate-b.rate);
  }

  function compareScreen() {
    const b = burden(); const refi = refinance(); const bids = auctionBids(); const ready = coverage() >= 45;
    return `<section class="screen" data-screen-view="compare"><span class="eyebrow">LOAN MATCH</span><h1 class="screen-title">여러 금융사가<br>내게 먼저 제안해요</h1><p class="screen-lead">희망금액을 정하고 금리·한도·월 납입액이 가장 마음에 드는 제안을 골라보세요.</p>
      <article class="auction-card"><div class="auction-hero"><div><span class="eyebrow">LENDER REVERSE AUCTION</span><h2>한 번 입력하고, 더 좋은 제안 고르기</h2><p>여러 금융사의 금리·한도·제안 이유를 같은 화면에서 바로 비교해요.</p></div><div class="gavel-orb">${svg('gavel')}</div></div>
        ${state.auctionRun?`<div class="bid-list">${bids.map((bid,i)=>`<button class="bid-row ${state.selectedBid===bid.id?'selected':''}" data-bid="${bid.id}"><span class="bid-rank">${i+1}</span><div><b>${bid.name}</b><small>${bid.status==='bid'?'내 조건에 맞는 제안':'조건을 더 살펴보는 중'} · 제휴 전 체험 예시</small></div><strong>${bid.offeredRate.toFixed(2)}%<small>최대 ${fmt(bid.offeredMax)}만원</small></strong></button>`).join('')}</div><div class="auction-foot"><small>금리뿐 아니라 전체 비용과 기간까지 보고 나에게 가장 편한 조건을 골라요.</small><button class="secondary small-btn" data-auction-run>새 제안 받기</button></div>`:`<div class="auction-stage"><div class="lender-dot">A</div><div class="lender-dot">B</div><div class="lender-dot">C</div><i></i><div class="auction-user">${fmt(state.amount)}<small>만원 희망</small></div></div><button class="primary wide" data-auction-run>지금 금융사 제안 받아보기 ${svg('arrow')}</button>`}
      </article>
      <div class="capacity-card"><h2>내게 편한 월 납입액 찾기</h2><p>금액과 기간을 움직이면 매달 납입액과 생활비 후 여유금액이 바로 보여요.</p>
        <div class="field"><label><span>얼마가 필요하세요?</span><b>${fmt(state.amount)}만원</b></label><input data-range="amount" type="range" min="300" max="8000" step="100" value="${state.amount}"></div>
        <div class="select-row"><div class="select-wrap"><label>몇 달로 나눌까요?</label><select data-select="term"><option value="24" ${state.term==24?'selected':''}>24개월</option><option value="36" ${state.term==36?'selected':''}>36개월</option><option value="48" ${state.term==48?'selected':''}>48개월</option><option value="60" ${state.term==60?'selected':''}>60개월</option></select></div><div class="select-wrap"><label>나의 소득 유형</label><select data-select="profile"><option value="employee" ${state.profile==='employee'?'selected':''}>직장인</option><option value="freelancer" ${state.profile==='freelancer'?'selected':''}>프리랜서</option><option value="business" ${state.profile==='business'?'selected':''}>개인사업자</option></select></div></div>
        <div class="field"><label><span>월 소득</span><b>${fmt(state.income)}만원</b></label><input data-range="income" type="range" min="100" max="1500" step="10" value="${state.income}"></div>
        <div class="field"><label><span>현재 대출 월 납입액</span><b>${fmt(state.existing)}만원</b></label><input data-range="existing" type="range" min="0" max="500" step="5" value="${state.existing}"></div>
        <div class="field"><label><span>월 필수지출</span><b>${fmt(state.essential)}만원</b></label><input data-range="essential" type="range" min="30" max="800" step="5" value="${state.essential}"></div>
        <div class="capacity-result"><div class="big-result"><div><small>매달 납입할 금액</small><strong>${b.monthly.toFixed(1)}만원</strong></div><span class="demo-pill"><i></i>바로 계산</span></div><div class="result-grid"><div><small>생활비 후 남는 여유금액</small><b>${won(b.disposable)}</b></div><div><small>월소득 중 대출 납입 비중</small><b>${b.ratio.toFixed(1)}%</b></div></div></div>
      </div>
      <article class="refi-card"><div class="refi-head"><div><span class="eyebrow">SWITCH & SAVE</span><h2>갈아타면 얼마나 아낄까요?</h2></div><span class="sample-tag">바로 계산</span></div><p>현재 조건과 새 금리를 넣으면 매달·전체 절약 가능액이 바로 보여요.</p>
        <div class="field"><label><span>현재 대출 잔액</span><b>${fmt(state.currentBalance)}만원</b></label><input data-range="currentBalance" type="range" min="300" max="10000" step="100" value="${state.currentBalance}"></div>
        <div class="rate-inputs"><label>현재 금리<input data-number="currentRate" type="number" min="1" max="20" step="0.1" value="${state.currentRate}"><span>%</span></label><label>비교 금리<input data-number="targetRate" type="number" min="1" max="20" step="0.1" value="${state.targetRate}"><span>%</span></label><label>남은 기간<select data-select="remainingTerm"><option value="12" ${state.remainingTerm==12?'selected':''}>12개월</option><option value="24" ${state.remainingTerm==24?'selected':''}>24개월</option><option value="36" ${state.remainingTerm==36?'selected':''}>36개월</option><option value="60" ${state.remainingTerm==60?'selected':''}>60개월</option></select></label></div>
        <div class="refi-result"><div><small>매달 절약 가능액</small><strong>${refi.monthlySave.toFixed(1)}만원</strong></div><div><small>전체 이자 절약 가능액</small><strong>${fmt(refi.totalSave.toFixed(0))}만원</strong></div></div><small class="calc-note">중도상환수수료·인지비용·우대조건은 제외한 참고값이에요. 실제 절약액은 금융사 조건에 따라 달라질 수 있어요.</small>
      </article>
      <div class="notice safe"><b>${ready?'지금 제안을 받아볼 준비가 됐어요':'데이터를 더하면 비교할 수 있는 조건이 넓어져요'}</b>내 정보 준비도 ${coverage()}%. ${ready?'여러 금융사의 제안 이유까지 한 번에 살펴보세요.':'소득과 납입 기록을 더해 내 강점을 보여주세요.'}</div>
      <div class="section-head"><h2>다른 조건도 둘러보기</h2></div><div class="filter-pills"><button data-filter="rate" class="${state.filter==='rate'?'on':''}">낮은 금리부터</button><button data-filter="limit" class="${state.filter==='limit'?'on':''}">높은 한도부터</button><button data-filter="refi" class="${state.filter==='refi'?'on':''}">갈아타기 포함</button></div>
      <div class="product-list">${sortedProducts().map(p=>`<article class="product-card"><div class="product-top"><div class="product-brand"><div class="product-logo">${p.initial}</div><div><h3>${p.name}</h3><span>${p.type}</span></div></div><span class="sample-tag">체험 조건</span></div><div class="rate-row"><div><span>금리</span><strong>${p.rate.toFixed(2)}%</strong></div><div><span>한도</span><strong>${fmt(p.max)}만원</strong></div></div><div class="reason-chips">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="card-foot"><small>실제 조건은 제휴 금융사가 결정해요.</small><button class="secondary small-btn" data-product="${p.id}">왜 이 조건인지 보기</button></div></article>`).join('')}</div>
    </section>`;
  }

  function myScreen() {
    const q=stableQuote();
    return `<section class="screen" data-screen-view="my"><span class="eyebrow">MY BENEFIT CONTROL</span><h1 class="screen-title">내 데이터와 혜택을<br>한눈에 관리해요</h1><p class="screen-lead">연결한 금융 강점, 금리 기회, 송금 조건을 내 손으로 편하게 관리하세요.</p>
      <div class="vault-card"><div class="vault-head"><div><h2>내 금융 강점</h2><p>좋은 조건 찾기에 반영된 정보를 모았어요</p></div><strong>${connectedSources().length}</strong></div><div class="vault-list">${connectedSources().length?connectedSources().map(s=>`<div class="vault-item"><div><b>${s.name}</b><small>${s.purpose} · 내가 원할 때 관리</small></div><button class="revoke" data-revoke="${s.id}">잠시 쉬기</button></div>`).join(''):'<div class="vault-item"><div><b>첫 금융 강점을 더해보세요</b><small>연결 메뉴에서 좋은 조건 찾기에 도움 되는 정보를 고를 수 있어요.</small></div></div>'}</div></div>
      <div class="section-head"><h2>좋은 금리 기회 알림</h2></div><div class="rate-watch"><div class="rate-watch-top"><div><h2>더 좋은 금리 기회를 놓치지 않아요</h2><p>소득·신용·성실 납입이 좋아지면 금리인하요구권을 살펴볼 때를 알려드려요.</p></div><span class="watch-state">${state.watchRate?'알림 ON':'알림 OFF'}</span></div><div class="watch-line"><div><span>소득 정보</span><b>최신</b></div><div><span>성실 납입</span><b>반영 완료</b></div><div><span>다음 기회 체크</span><b>7일 후</b></div></div></div>
      <div class="section-head"><h2>내 해외송금 비교</h2><button data-action="stable-policy">안심 이용 안내</button></div><article class="stable-card"><div class="stable-head"><div class="coin-orb">${svg('coins')}</div><div><span class="eyebrow">MY REMITTANCE</span><h2>더 좋은 송금사 제안 다시 보기</h2><p>비용·수령량·도착시간을 한 번에 비교해요.</p></div><span class="sample-tag">체험</span></div><div class="field"><label><span>보낼 금액</span><b>${fmt(state.stableAmount)}만원</b></label><input data-range="stableAmount" type="range" min="10" max="3000" step="10" value="${state.stableAmount}"></div><div class="stable-flow"><span>원화</span><b>›</b><span>송금사 제안</span><b>›</b><span>USDC</span><b>›</b><span>현지 수령</span></div><div class="stable-quote"><div><small>비용 예시</small><b>${Math.round(q.fee/10000).toLocaleString('ko-KR')}만원</b></div><div><small>받을 수량</small><b>${q.usdc.toFixed(2)} USDC</b></div></div><button class="secondary wide" data-nav="stable">지금 3개 송금사 제안 받기</button></article>      <div class="section-head"><h2>앱 설정</h2></div><div class="setting-list"><div class="setting-row"><div><b>내게 맞는 금융 소식</b><br><small>필요한 기회만 골라 알려드려요</small></div><button class="toggle ${state.notifications?'on':''}" data-toggle="notifications" aria-pressed="${state.notifications}"><i></i></button></div><div class="setting-row"><div><b>좋은 금리 기회 알림</b><br><small>금리가 좋아질 때 바로 알려드려요</small></div><button class="toggle ${state.watchRate?'on':''}" data-toggle="watchRate" aria-pressed="${state.watchRate}"><i></i></button></div><div class="setting-row"><div><b>글자 더 크게 보기</b><br><small>금액과 핵심 안내를 더 시원하게 봐요</small></div><button class="toggle ${state.largeText?'on':''}" data-toggle="largeText" aria-pressed="${state.largeText}"><i></i></button></div><button class="setting-row" style="width:100%;border:0;background:#fff;text-align:left" data-action="export"><div><b>내 금융정보 간편 저장</b><br><small>체험 내용을 파일로 보관해요</small></div>${svg('export')}</button><button class="setting-row" style="width:100%;border:0;background:#fff;text-align:left;color:var(--danger)" data-action="reset"><div><b>새로운 체험 시작하기</b><br><small>지금까지의 체험 상태를 처음으로 돌려요</small></div>${svg('trash')}</button></div>
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
      content = m.step === 2 ? `<div class="connecting"><div class="spinner"></div><h3>${s.name}을 내 강점에 더하는 중</h3><p>더 좋은 조건을 찾을 준비가 곧 끝나요.</p></div>` : `<div class="sheet-head"><div><span class="eyebrow">ADD MY STRENGTH</span><h2>${s.name}으로 선택지 넓히기</h2><p>연결하면 좋아지는 점부터 쉽고 빠르게 보여드려요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>내가 얻는 이점</b><span>${s.purpose}</span></div></div><div class="consent-row"><span class="consent-check">${svg('check')}</span><div><b>연결할 정보</b><span>${s.fields}</span></div></div><div class="consent-row"><span class="consent-check">${svg('chart')}</span><div><b>${scoreScenario(s).max>0?'기대할 수 있는 점수 성장':'더 잘 맞는 조건 찾기'}</b><span>${scoreScenario(s).max>0?`신용평가에 반영될 때 +0~${scoreScenario(s).max}점 개선에 도움이 될 수 있어요.`:'내 금융상태를 더 선명하게 보여줘 맞춤 조건 비교에 활용할 수 있어요.'} 실제 점수와 조건은 KCB·NICE 및 금융기관이 결정해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>선택권은 언제나 나에게</b><span>원할 때 연결 상태를 보고 잠시 쉬거나 다시 시작할 수 있어요.</span></div></div></div><div class="notice safe"><b>개인정보 없이 연결 효과부터 체험해요</b>지금은 이 브라우저에 체험 상태만 가볍게 저장돼요.</div><button class="primary wide" data-connect="${s.id}">지금 연결하고 +${s.points} XP 받기 ${svg('arrow')}</button>`;
    } else if (m.type === 'product') {
      const p = products.find(item=>item.id===m.id);
      content = `<div class="sheet-head"><div><span class="eyebrow">WHY THIS OFFER</span><h2>${p.name}</h2><p>${p.type} · 이 조건이 나온 이유</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="notice safe"><b>내 금융 강점 ${coverage()}%가 반영됐어요</b>${connectedSources().map(s=>s.name).join(' · ')}</div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>내가 기대할 수 있는 제안</b><span>제휴 금융기관이 연결된 강점을 보고 금리와 한도를 제안해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>더하면 선택지가 넓어지는 정보</b><span>${sourceCatalog.filter(s=>!state.connected[s.id]).map(s=>s.name).join(' · ') || '좋은 조건 찾기에 필요한 강점이 충분히 모였어요'}</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>내 정보는 내가 관리</b><span>연결한 내용을 직접 보고 언제든 관리할 수 있어요.</span></div></div></div><div class="notice info"><b>내게 맞는지 지금 가볍게 비교해보세요</b>${p.rate.toFixed(2)}%·${fmt(p.max)}만원은 체험용 예시이며, 실제 조건은 금융기관이 제안해요.</div><button class="secondary wide" data-close>다른 제안도 둘러보기</button>`;
    } else if (m.type === 'stable-bid') {
      const bid=stableAuctionBids().find(item=>item.id===state.selectedStableBid) || stableAuctionBids()[0];
      const destination=stableDestination();
      content = `<div class="sheet-head"><div><span class="eyebrow">MY REMITTANCE CHOICE</span><h2>내가 고른 ${bid.name}</h2><p>${destination.name} · ${fmt(state.stableAmount)}만원 송금 조건</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="stable-bid-review"><div><small>내가 내는 총비용</small><strong>${bid.fee.toLocaleString('ko-KR')}원</strong></div><div><small>받을 수 있는 수량</small><strong>${bid.usdc.toFixed(2)} USDC</strong></div><div><small>도착시간</small><strong>${bid.speed}</strong></div></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>확인된 제휴사 조건</b><span>신고·인허가 요건을 계약 전에 확인해 안심할 수 있는 조건만 연결해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('user')}</span><div><b>내 정보는 필요한 만큼만</b><span>실제 이용 시 제휴사가 본인확인과 수취인 확인을 진행해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>보내기 전 한 번 더 선명하게</b><span>환율, 수수료, 네트워크 비용, 받을 수량을 최종 화면에서 다시 보여드려요.</span></div></div></div><div class="notice info"><b>지금은 개인정보 없이 선택 흐름을 체험해요</b>실제 송금은 정식 제휴와 국가별 절차를 갖춘 뒤 제공해요.</div><button class="primary wide" data-stable-review>이 제안 저장하고 +15 XP</button><button class="secondary wide" style="margin-top:8px" data-close>다른 제안도 둘러보기</button>`;
    } else if (m.type === 'lesson') {
      content = `<div class="sheet-head"><div><span class="eyebrow">FINANCIAL QUEST 01</span><h2>갈아타기로 절약액 키우기</h2><p>더 유리한 금리와 전체 절약액을 함께 찾아봐요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="lesson-copy"><b>절약액을 정확하게 보는 방법</b><p>줄어드는 이자에서 수수료와 부대비용을 함께 계산하면 실제로 아낄 수 있는 금액을 확인할 수 있어요.</p></div><div class="quiz-box"><b>더 알뜰한 선택은 무엇일까요?</b><button data-quiz="wrong">금리가 조금이라도 낮으면 바로 이동</button><button data-quiz="correct">이자 절약액과 수수료·조건을 함께 비교</button><button data-quiz="wrong">한도가 가장 큰 상품으로 이동</button></div><div class="notice safe"><b>학습할수록 XP가 쌓여요</b>금융지식을 쌓는 즐거움을 위한 보상이며, 실제 금융조건은 금융기관이 결정해요.</div>`;
    } else if (m.type === 'coach') {
      const coach = coachAdvice();
      content = `<div class="sheet-head"><div><span class="eyebrow">MY:ME COACH</span><h2>${coach.title}</h2><p>현재 입력값과 연결 상태를 바탕으로 쉽게 정리했어요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>지금 확인된 내용</b><span>금융정보 범위 ${coverage()}% · 월소득 대비 대출 납입 비율 ${burden().ratio.toFixed(1)}% · 아직 연결하지 않은 정보 ${sourceCatalog.filter(s=>!state.connected[s.id]).length}개</span></div></div><div class="consent-row"><span class="consent-check">${svg('spark')}</span><div><b>다음에 해볼 일</b><span>${coach.text}</span></div></div><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>참고해 주세요</b><span>실제 승인·신용점수·금리는 금융기관과 신용평가사가 결정해요.</span></div></div></div><button class="primary wide" data-coach-action="${coach.action}">${coach.label} ${svg('arrow')}</button>`;
    } else if (m.type === 'advisor') {
      const messages=Array.isArray(state.advisorMessages)?state.advisorMessages:defaultState.advisorMessages;
      content = `<div class="sheet-head"><div><span class="eyebrow">AI MONEY COACH</span><h2>AI에게 바로 물어보세요</h2><p>궁금한 문장을 누르거나 편하게 말하면 쉬운 말로 바로 알려드려요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="advisor-log" aria-live="polite">${messages.map(msg=>`<div class="chat ${msg.role}">${esc(msg.text)}</div>`).join('')}</div><div class="quick-chips"><button data-advisor-question="내 신용점수는 왜 오르나요?">내 점수 성장 가능성</button><button data-advisor-question="역경매는 어떻게 작동하나요?">더 좋은 대출 제안 받기</button><button data-advisor-question="스테이블코인은 안전한가요?">더 좋은 송금 조건 찾기</button><button data-advisor-question="사람 상담을 원해요">사람 상담 이어가기</button></div><div class="advisor-compose"><textarea id="advisorInput" maxlength="300" rows="2" placeholder="궁금한 내용을 편하게 적어보세요."></textarea><div class="row-actions"><button class="voice-btn" data-advisor-mic>${svg('mic')} 말로 물어보기</button><button class="primary" data-advisor-send>답변 받기</button></div></div><div class="notice info"><b>개인정보 없이 편하게 물어보세요</b>녹음 파일은 저장하지 않으며, 현재 답변은 기능 체험용이에요.</div>`;
    } else if (m.type === 'voice-consent') {
      content = `<div class="sheet-head"><div><span class="eyebrow">MICROPHONE CONSENT</span><h2>말로 편하게 상담해보세요</h2><p>마이크 이용 방법을 확인하고 바로 시작할 수 있어요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('mic')}</span><div><b>말하면 바로 글로 바꿔드려요</b><span>브라우저 음성인식으로 질문을 빠르게 입력해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('lock')}</span><div><b>대화는 가볍고 안전하게</b><span>앱은 녹음 파일을 만들지 않고 질문에 답하는 데만 사용해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('user')}</span><div><b>상담원에게 이어서 물어볼 수 있어요</b><span>더 자세한 도움이 필요하면 사람 상담으로 이어갈 수 있어요.</span></div></div></div><button class="primary wide" data-voice-consent>동의하고 음성상담 시작</button>`;
    } else if (m.type === 'stablecoin') {
      content = `<div class="sheet-head"><div><span class="eyebrow">SAFE REMITTANCE</span><h2>비용은 선명하게, 선택은 내 마음대로</h2><p>안심 기준을 갖춘 제휴사 조건만 모아 같은 기준으로 비교해요.</p></div><button class="sheet-close" data-close aria-label="닫기">${svg('close')}</button></div><div class="consent-box"><div class="consent-row"><span class="consent-check">${svg('shield')}</span><div><b>확인된 제휴사 조건</b><span>신고·인허가, 본인확인, 트래블룰 절차를 갖춘 파트너인지 확인해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('coins')}</span><div><b>송금은 원할 때만</b><span>대출과 분리된 선택 기능이라 내가 원할 때만 이용해요.</span></div></div><div class="consent-row"><span class="consent-check">${svg('eye')}</span><div><b>받을 금액부터 먼저</b><span>환율, 총비용, 받을 수량, 도착시간을 보고 고를 수 있어요.</span></div></div></div><div class="notice info"><b>지금은 개인정보 없이 비교해보세요</b>실제 송금은 정식 제휴와 국가별 절차를 갖춘 뒤 제공해요.</div><button class="primary wide" data-stable-review>안심 기준 확인하고 +15 XP</button>`;
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
    if (gateMode==='confirm') return `<div class="customer-gate"><main class="gate-shell gate-confirm"><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong></div><div class="gate-success">${svg('qr')}</div><span class="gate-kicker">READY TO GROW</span><h1>준비됐어요<br>지금 금융 기회를 열어요</h1><p>데이터 연결, 대출·송금사 제안 비교를 한 번에 즐겨보세요.</p><div class="gate-benefits"><div>${svg('spark')}<span><b>내 점수 성장 가능성</b>연결할 때마다 바로 보여드려요</span></div><div>${svg('gavel')}<span><b>대출사 제안 한 번에</b>금리와 한도를 보고 직접 골라요</span></div><div>${svg('coins')}<span><b>송금사 제안 한 번에</b>비용·수령량·도착시간을 비교해요</span></div></div><button class="primary wide gate-primary" data-qr-confirm>지금 my:ME 시작하기 ${svg('arrow')}</button><small class="gate-caption">개인정보 없는 고객 체험 · 실제 서비스는 정식 인증과 제휴 후 연결돼요.</small></main></div>`;
    if (gateMode==='qr') return `<div class="customer-gate"><main class="gate-shell qr-shell"><button class="gate-back" data-gate-back>${svg('arrow')} 다른 방법</button><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong></div><span class="gate-kicker">SCAN TO START</span><h1>휴대폰 카메라로<br>QR을 스캔하세요</h1><p>카카오톡 QR 스캐너나 기본 카메라로 촬영하면 휴대폰에서 바로 시작할 수 있어요.</p><div class="qr-frame"><img src="customer_qr.png" alt="my:ME 고객 체험 로그인 QR 코드"><i></i></div><div class="qr-steps"><span>1</span>QR 촬영 <b>›</b><span>2</span>링크 열기 <b>›</b><span>3</span>로그인 완료</div><button class="secondary wide" data-copy-link>고객 실행 링크 복사</button><small class="gate-caption">${PUBLIC_URL}</small></main></div>`;
    return `<div class="customer-gate"><main class="gate-shell"><div class="gate-brand"><div class="brand-mark">m:M</div><strong>my:ME</strong><span>바로 체험</span></div><section class="gate-hero"><span class="gate-kicker">GROW MY FINANCIAL CHANCE</span><h1>내 데이터로<br>더 좋은 조건을 만나요</h1><p>연결하고, 제안받고, 가장 마음에 드는 대출·송금 조건을 직접 골라보세요.</p><div class="gate-visual"><div class="gate-score"><strong>+0~</strong><span>내 점수<br>성장 가능성</span></div><div class="gate-orbit o1">${svg('bank')}<small>소득</small></div><div class="gate-orbit o2">${svg('gavel')}<small>대출 제안</small></div><div class="gate-orbit o3">${svg('coins')}<small>송금 제안</small></div></div></section><div class="gate-actions"><button class="primary wide gate-primary" data-open-qr>${svg('qr')} QR로 바로 시작하기</button><button class="secondary wide" data-guest-start>지금 이 휴대폰에서 체험하기</button></div><div class="gate-trust">${svg('shield')}<span><b>개인정보 없이 먼저 즐겨보세요</b>대출·송금 신청 없이 주요 기능을 가볍게 체험해요.</span></div></main></div>`;
  }

  function render() {
    document.body.classList.toggle('large-text', !!state.largeText);
    if (!customerAuth || pendingQrEntry) { app.innerHTML=customerGate(); return; }
    const screens = { home:homeScreen, connect:connectScreen, journey:journeyScreen, compare:compareScreen, my:myScreen, stable:stableScreen };
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
    let answer='내 데이터를 더 좋은 대출·송금 조건으로 연결하는 방법을 쉽고 빠르게 알려드릴게요. 실제 조건은 금융기관과 신용평가사가 결정해요.';
    if(/사람|상담원/.test(q)) answer='상담원에게 이어서 물어볼 수 있어요. 정식 서비스에서는 제휴 고객센터 운영시간과 연결번호를 바로 보여드릴게요.';
    else if(/점수|신용/.test(q)) answer=`현재 연결 정보가 신용평가에 반영되면 +0~${scoreScenarioTotal()}점 개선에 도움이 될 수 있어요. 실제 점수 변화는 KCB·NICE가 결정해요.`;
    else if(/역경매|대출/.test(q)) answer='희망금액을 한 번 입력하면 여러 금융사가 금리와 한도를 제안해요. 월 납입액까지 보고 가장 마음에 드는 조건을 직접 고르면 돼요.';
    else if(/스테이블|코인|송금/.test(q)) answer='국가와 금액을 고르면 여러 제휴 송금사가 총비용, 받을 수량, 도착시간을 제안해요. 가장 마음에 드는 조건을 직접 선택할 수 있어요.';
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
    if (event.target.closest('[data-auction-run]')) { const first=!state.auctionReviewed; state.auctionRun=true; state.auctionReviewed=true; state.selectedBid=auctionBids()[0]?.id||null; save(); celebrate(); showToast(first?'20 XP와 함께 금융사 제안이 도착했어요. 지금 골라보세요!':'새로운 금융사 제안을 준비했어요.'); return; }
    if (event.target.closest('[data-stable-auction-run]')) { state.stableAuctionRun=true; state.selectedStableBid=stableAuctionBids()[0]?.id||null; save(); celebrate(); showToast('3개 송금사 제안이 도착했어요. 가장 좋은 조건을 골라보세요!'); return; }
    const stableBid = event.target.closest('[data-stable-bid]');
    if (stableBid) { state.selectedStableBid=stableBid.dataset.stableBid; save(); render(); return; }
    if (event.target.closest('[data-stable-continue]')) { state.modal={type:'stable-bid'}; render(); return; }
    const bid = event.target.closest('[data-bid]');
    if (bid) { state.selectedBid=bid.dataset.bid; save(); render(); return; }
    const advisorQuestion = event.target.closest('[data-advisor-question]');
    if (advisorQuestion) { advisorAnswer(advisorQuestion.dataset.advisorQuestion); return; }
    if (event.target.closest('[data-advisor-send]')) { advisorAnswer(document.getElementById('advisorInput')?.value); return; }
    if (event.target.closest('[data-advisor-mic]')) { if(!state.voiceConsent){state.modal={type:'voice-consent'};render();}else startVoiceRecognition(); return; }
    if (event.target.closest('[data-voice-consent]')) { state.voiceConsent=true; state.modal={type:'advisor'}; save(); render(); setTimeout(startVoiceRecognition,120); return; }
    if (event.target.closest('[data-stable-review]')) { const first=!state.stableReviewed; state.stableReviewed=true; state.modal=null; save(); celebrate(); showToast(first?'15 XP 획득 · 마음에 드는 송금 조건을 저장했어요.':'내 송금 조건을 다시 저장했어요.'); return; }
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
    if (revoke) { const src=sourceCatalog.find(s=>s.id===revoke.dataset.revoke); state.connected[revoke.dataset.revoke]=false; save(); showToast(`${src.name} 연결을 잠시 쉬어요. 원할 때 바로 다시 시작할 수 있어요.`); return; }
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
    if (event.target.matches('[data-select]')) {
      const key=event.target.dataset.select;
      state[key]=['term','remainingTerm'].includes(key)?Number(event.target.value):event.target.value;
      if (['stableDestination','stableReceive'].includes(key)) { state.stableAuctionRun=false; state.selectedStableBid=null; }
      save(); render();
    }
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js?v=13',{updateViaCache:'none'}).then(reg=>reg.update()).catch(()=>{});
  }
  render();
})();
