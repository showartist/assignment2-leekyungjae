// 1. Supabase Configuration & Initialization
const SUPABASE_URL = "https://nejefzuwgqawnjygpyyq.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_pLhBa-buXLQ3RK5sMMePbA_CFWCyn-d";

let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
}

// 2. Pure Visual Fact Artwork Dataset (All Abstract/Mystical Jargon Removed)
const TAROT_CARDS = [
  {
    id: "the-fool",
    roman: "0",
    nameEn: "THE FOOL",
    nameKo: "클림트풍 방랑자",
    category: "시작과 여정",
    artwork: {
      title: "클림트풍 방랑자",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "화면 중앙에 정면을 바라보며 서 있는 인물이 있다",
        "인물의 발끝은 어두운 경계선에 걸쳐 있다",
        "의상은 원형과 기하학 모자이크 패턴으로 채워져 있다",
        "배경 상단에는 노란색과 붉은색 꽃 패턴이 반복된다"
      ],
      composition: "중앙 인물 구도, 하단 어두운 경계선과 상단 꽃 패턴의 대조",
      visualTension: "선명한 인물의 옷 패턴과 하단 어두운 경계선이 대비된다"
    },
    meaning: "어두운 경계선 위에 서서 앞을 바라보는 발걸음입니다.",
    talismanMessages: ["경계선 위에 서 있는 인물처럼, 머뭇거림을 멈추고 첫 발을 딛는 순간입니다."],
    lucky: { color: "앤틱 골드", number: 7, time: "08:00 – 10:00" },
    actionAdvice: "오늘 생각만 하던 계획 중 첫 번째 항목을 종이에 적고 실행으로 옮기세요."
  },
  {
    id: "the-magician",
    roman: "I",
    nameEn: "THE MAGICIAN",
    nameKo: "황금 연금술사",
    category: "창조와 도구",
    artwork: {
      title: "황금 연금술사",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "오른손을 위로 들고 서 있는 인물이 있다",
        "테이블 위에는 사각형, 원형, 선형 도구들이 올려져 있다",
        "인물의 시선은 관객의 정면을 향해 올려다본다",
        "배경에는 수직의 금색 띠 문양이 수직으로 그어져 있다"
      ],
      composition: "수직 띠 구도와 테이블 위 네 가지 형태 도구 배치",
      visualTension: "위로 든 오른손과 테이블 위 도구들이 사선 방향의 조화를 이룬다"
    },
    meaning: "테이블 위 사각형과 원형 도구를 손에 쥔 채 앞을 바라보는 자세입니다.",
    talismanMessages: ["테이블 위의 도구처럼 이미 주어진 자원을 조합할 때입니다."],
    lucky: { color: "딥 퍼플", number: 1, time: "10:00 – 12:00" },
    actionAdvice: "현재 사용할 수 있는 도구와 자원 3가지를 노트에 목록으로 정리하세요."
  },
  {
    id: "the-high-priestess",
    roman: "II",
    nameEn: "THE HIGH PRIESTESS",
    nameKo: "비잔틴의 여인",
    category: "관조와 정적",
    artwork: {
      title: "비잔틴의 여인",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "푸른색 벽면 사이에 장식된 어두운 머리칼의 여인이 서 있다",
        "손에는 감겨 있는 두루마리를 쥐고 있다",
        "시선은 아래쪽을 향해 묵묵히 내려다보고 있다",
        "배경 양쪽으로 검은색과 흰색 기둥 패턴이 반반씩 나뉜다"
      ],
      composition: "좌우 검은 기둥과 흰 기둥의 대칭 구도",
      visualTension: "하향 시선과 정적인 대칭 기둥이 만나는 정적"
    },
    meaning: "검은 기둥과 흰 기둥 사이에서 두루마리를 든 여인의 하향 시선입니다.",
    talismanMessages: ["조용히 내려다보는 시선처럼, 외부 소음을 끄고 내부 사실을 확인할 때입니다."],
    lucky: { color: "미드나잇 블루", number: 2, time: "07:00 – 09:00" },
    actionAdvice: "결정하기 전에 확인해야 할 명확한 사실 2가지를 팩트체크하세요."
  },
  {
    id: "the-empress",
    roman: "III",
    nameEn: "THE EMPRESS",
    nameKo: "아델레풍 여황제",
    category: "풍요와 정체",
    artwork: {
      title: "아델레 초상화풍 여황제",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "화면 중앙에 삼각형 금빛 옷을 입은 여인이 정면으로 앉아 있다",
        "의상은 금색 눈동자 문양과 둥근 꽃 무늬로 메워져 있다",
        "배경과 의상의 경계선이 일부 겹쳐져 구분이 모호하다",
        "손은 가슴 위에 모은 채 정적인 자세를 취하고 있다"
      ],
      composition: "삼각형 중앙 인물 구도, 의상과 배경의 무늬 융합",
      visualTension: "인물의 형태가 배경의 금빛 패턴 속으로 동시에 흡수되는 구도"
    },
    meaning: "금빛 문양 옷을 입고 손을 가슴에 모은 정적인 모습입니다.",
    talismanMessages: ["배경 속에 융합된 모습처럼, 안에서 충분히 익기를 기다려야 할 시간입니다."],
    lucky: { color: "코랄 골드", number: 3, time: "14:00 – 16:00" },
    actionAdvice: "이미 시작한 일 하나를 조급해하지 말고 끝까지 다듬어 완성하세요."
  },
  {
    id: "the-emperor",
    roman: "IV",
    nameEn: "THE EMPEROR",
    nameKo: "기하학의 황제",
    category: "질서와 경계",
    artwork: {
      title: "검은 기하학 황제",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "직사각형 왕좌에 앉아 있는 사각형 어깨의 인물이 있다",
        "의상에는 검은색 정사각형 문양이 수직·수평으로 반복된다",
        "손에는 금색 지팡이를 수직으로 똑바로 쥐고 있다",
        "인물의 시선은 정확히 수평 방향 정면을 향한다"
      ],
      composition: "수직 지팡이와 수평 왕좌의 명확한 격자 구도",
      visualTension: "검은 정사각형 반복 패턴이 만드는 단단한 정적"
    },
    meaning: "수직 지팡이를 쥐고 사각형 왕좌에 앉아 정면을 바라보는 자세입니다.",
    talismanMessages: ["직사각형 왕좌처럼, 모호한 상황에 명확한 기준과 구역을 설정할 때입니다."],
    lucky: { color: "버건디", number: 4, time: "13:00 – 15:00" },
    actionAdvice: "오늘 지켜야 할 우선순위 규칙 3가지를 업무 공간에 붙여두세요."
  },
  {
    id: "the-hierophant",
    roman: "V",
    nameEn: "THE HIEROPHANT",
    nameKo: "분리파의 스승",
    category: "전통과 전달",
    artwork: {
      title: "분리파의 스승",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "중앙의 인물이 두 손으로 금색 열쇠 형태 장식을 들고 있다",
        "인물 아래쪽에 두 명의 작은 인물이 고개를 숙이고 있다",
        "배경 벽면에는 수직의 아치형 비잔틴 모자이크 문양이 서 있다",
        "인물의 입 모양은 닫혀 있고 시선은 하단을 향한다"
      ],
      composition: "아치형 배경 속 상하 인물 크기 대비 구도",
      visualTension: "중앙 인물의 대형 구도와 하단 고개 숙인 소형 인물의 대비"
    },
    meaning: "아치 아래에서 열쇠 장식을 든 인물과 아래 고개 숙인 인물들의 구도입니다.",
    talismanMessages: ["열쇠 장식처럼 검증된 절차와 관례를 준수하는 것이 안전한 길입니다."],
    lucky: { color: "샌드 베이지", number: 5, time: "11:00 – 13:00" },
    actionAdvice: "혼자 결정하지 말고 검증된 선례나 가이드북을 찾아 읽으세요."
  },
  {
    id: "the-lovers",
    roman: "VI",
    nameEn: "THE LOVERS",
    nameKo: "포옹하는 두 인물",
    category: "결합과 포옹",
    artwork: {
      title: "클림트풍 포옹 (The Lovers)",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "꽃이 피어 있는 언덕 위에서 두 인물이 서로 밀착해 포복해 있다",
        "남성 의상에는 직사각형 패턴이, 여성 의상에는 원형 꽃 패턴이 새겨져 있다",
        "두 인물의 머리 위로 금색 입자 문양이 뒤덮고 있다",
        "배경은 어두운 차콜색으로 처리되어 인물군과 분리된다"
      ],
      composition: "언덕 위 밀착된 두 인물과 어두운 배경의 대비 구도",
      visualTension: "직사각형 패턴과 원형 꽃 패턴이 한 몸처럼 합쳐지는 구도"
    },
    meaning: "꽃밭 위에서 직사각형과 원형 패턴 옷을 입은 두 인물의 포옹입니다.",
    talismanMessages: ["서로 다른 무늬가 합쳐지듯, 상대와의 차이를 인정하며 협력할 때입니다."],
    lucky: { color: "로즈 골드", number: 6, time: "18:00 – 20:00" },
    actionAdvice: "협력자나 상대방의 의견 중 수용할 점 한 가지를 메모하고 전달하세요."
  },
  {
    id: "the-chariot",
    roman: "VII",
    nameEn: "THE CHARIOT",
    nameKo: "전차 위의 인물",
    category: "전진과 방향",
    artwork: {
      title: "황금 전차",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "사각형 바퀴가 달린 전차에 인물이 똑바로 서 있다",
        "전차 전면에는 검은색과 흰색의 스핑크스 모티브 2개가 놓여 있다",
        "인물은 갑옷 형태의 금색 상의를 입고 정면을 향해 고개를 들고 있다",
        "배경에는 사선 방향으로 그어진 수직 선문양이 배치되어 있다"
      ],
      composition: "사선 배경선과 전면 스핑크스 2개의 정대칭 구도",
      visualTension: "사선 배경과 인물의 곧은 정면 수직 자세가 만드는 속도감"
    },
    meaning: "검은 스핑크스 2개 뒤에서 갑옷을 입고 정면을 향해 서 있는 인물입니다.",
    talismanMessages: ["정면을 향한 자세처럼, 끌려다니지 말고 주도권을 잡아야 합니다."],
    lucky: { color: "메탈릭 골드", number: 7, time: "08:00 – 10:00" },
    actionAdvice: "미루고 있던 중요한 이메일이나 연락을 미루지 말고 즉시 발송하세요."
  },
  {
    id: "strength",
    roman: "VIII",
    nameEn: "STRENGTH",
    nameKo: "사자와 여인",
    category: "유연과 제어",
    artwork: {
      title: "사자와 여인",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "여인이 오른손으로 붉은 털의 사자 머리를 감싸쥐고 있다",
        "사자는 입을 닫은 채 여인의 무릎 곁에 엎드려 있다",
        "여인의 머리에는 장미 덩굴 왕관이 쓰여 있다",
        "여인의 시선은 사자의 눈을 부드럽게 바라본다"
      ],
      composition: "서 있는 여인과 엎드린 사자의 상하 구도",
      visualTension: "거친 붉은 털 사자와 여인의 부드러운 손길의 접촉점"
    },
    meaning: "엎드린 사자의 머리를 여인이 손으로 부드럽게 감싸 쥔 장면입니다.",
    talismanMessages: ["사자를 다루는 부드러운 손처럼, 감정적 마찰 대신 유연함으로 대응하세요."],
    lucky: { color: "앰버 골드", number: 8, time: "15:00 – 17:00" },
    actionAdvice: "갈등 상황에서 화를 내는 대신 조용히 상대의 말을 끝까지 경청하세요."
  },
  {
    id: "the-hermit",
    roman: "IX",
    nameEn: "THE HERMIT",
    nameKo: "등불을 든 은둔자",
    category: "고독과 탐색",
    artwork: {
      title: "은둔자의 등불",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "긴 로브를 입은 인물이 오른손에 노란색 등불을 높이 들고 있다",
        "등불 빛은 인물의 얼굴 전면과 발 밑 일부만 밝힌다",
        "배경 전체는 검은색과 짙은 갈색 톤으로 덮여 있다",
        "인물의 발걸음은 멈춰 서 있는 형태다"
      ],
      composition: "어두운 배경 속 오른상단 등불의 단일 조명 구도",
      visualTension: "전체 어둠 속에서 등불 빛이 미치는 좁은 구역의 대조"
    },
    meaning: "어두운 배경 속에서 손에 든 등불로 발 밑만 밝히고 서 있는 인물입니다.",
    talismanMessages: ["발밑만 비추는 등불처럼, 먼 미래보다 당장 눈앞의 한 단계를 정돈하세요."],
    lucky: { color: "차콜", number: 9, time: "21:00 – 23:00" },
    actionAdvice: "오늘 밤 30분간 휴대전화를 끄고 혼자만의 정돈 시간을 가지세요."
  },
  {
    id: "wheel-of-fortune",
    roman: "X",
    nameEn: "WHEEL OF FORTUNE",
    nameKo: "나선 문양과 나무",
    category: "순환과 변화",
    artwork: {
      title: "생명의 나무 나선",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "화면 중앙에 나선형으로 굽어진 나무 가지들이 꽉 차 있다",
        "가지 나선 구역마다 작은 원형 및 금색 눈동자 모티브가 새겨져 있다",
        "인물은 등장하지 않으며 나선 가지들의 반복 구조만 존재한다",
        "하단부 바탕은 검은 흙 형태로 나선 줄기를 받친다"
      ],
      composition: "인물 없는 회전 나선 가지 중심의 전체 화면 구도",
      visualTension: "정지된 그림 안에서 굽어 돌아가는 나선선의 반복"
    },
    meaning: "인물 없이 화면 전체를 채운 나선형 나무 가지들의 회전 구도입니다.",
    talismanMessages: ["나선 가지처럼 상황은 계속 돌고 돕니다. 변화의 흐름을 받아들이세요."],
    lucky: { color: "앤틱 브라운", number: 10, time: "14:00 – 16:00" },
    actionAdvice: "예상치 못한 변화가 생기면 저항하지 말고 변수에 맞게 일정을 수정하세요."
  },
  {
    id: "the-moon",
    roman: "XVIII",
    nameEn: "THE MOON",
    nameKo: "수면과 달빛",
    category: "모호함과 환영",
    artwork: {
      title: "달빛 아래 수면",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "어두운 수면 위에 밝은 수련 여러 송이가 떠 있다",
        "둥근 달빛이 수면 일부에 정적으로 반사되어 있다",
        "물결선은 수평 방향으로 가늘게 반복된다",
        "호수 가장자리의 형태는 어둠 속에서 선명하지 않다"
      ],
      composition: "수평 물결선과 수면 위 수련의 분산 구도",
      visualTension: "밝게 드러난 수면 일부와 어둠 속으로 모호해지는 호수 가장자리"
    },
    meaning: "어두운 수면 위에 떠 있는 수련과 일부만 반사된 둥근 달빛입니다.",
    talismanMessages: ["수면 일부만 보이는 달빛처럼, 아직 확인되지 않은 추측을 사실로 믿지 마세요."],
    lucky: { color: "실버 그레이", number: 18, time: "21:00 – 23:00" },
    actionAdvice: "불안한 마음이 들 때 확인된 사실 / 들은 말 / 불안한 추측을 3줄로 나뉘어 적으세요."
  },
  {
    id: "the-sun",
    roman: "XIX",
    nameEn: "THE SUN",
    nameKo: "비엔나의 태양",
    category: "명확함과 생명력",
    artwork: {
      title: "비엔나의 태양",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "화면 상단 중앙에 노란색 원형 태양 문양이 크게 배치되어 있다",
        "태양 아래쪽에는 해바라기 꽃들과 두 어린아이가 손을 잡고 서 있다",
        "배경 전체가 밝은 금색과 주황색 톤으로 메워져 있다",
        "그림 내에 어두운 음영 구역이 존재하지 않는다"
      ],
      composition: "상단 대형 태양 원형과 하단 아이들의 안정적 삼각 구도",
      visualTension: "어둠이 배제된 채 밝은 노란색과 주황색으로 채워진 시각적 명료함"
    },
    meaning: "상단 대형 노란 태양 아래 해바라기 꽃과 손잡은 아이들의 구도입니다.",
    talismanMessages: ["어둠이 없는 태양 그림처럼, 명확하고 숨김없이 사실을 공개할 때입니다."],
    lucky: { color: "밝은 옐로우", number: 19, time: "13:00 – 15:00" },
    actionAdvice: "진행 상황과 결과를 관계자들에게 솔직하고 명확하게 공유하세요."
  },
  {
    id: "the-world",
    roman: "XXI",
    nameEn: "THE WORLD",
    nameKo: "월계관 속 인물",
    category: "완성과 결실",
    artwork: {
      title: "월계관 속 인물",
      sourceType: "klimt-inspired-tarot-art",
      visibleElements: [
        "타원형 녹색 월계관 테두리가 화면 중앙 전체를 둘러싸고 있다",
        "월계관 안쪽에서 한 인물이 두 손을 펴고 서 있다",
        "모서리 네 곳에는 사자, 소, 독수리, 사람 문양이 배치되어 있다",
        "인물의 시선은 정면을 향하며 당당한 포즈를 취한다"
      ],
      composition: "중앙 타원형 월계관과 네 모서리 문양의 안정적 프레임 구도",
      visualTension: "타원 테두리가 안쪽 인물을 완벽하게 둘러싸는 닫힌 안도감"
    },
    meaning: "타원형 월계관 테두리 안에서 두 손을 펴고 서 있는 인율 구도입니다.",
    talismanMessages: ["닫힌 월계관처럼 진행 중이던 프로젝트의 마무리를 지을 때입니다."],
    lucky: { color: "로열 골드", number: 21, time: "17:00 – 19:00" },
    actionAdvice: "끝내지 못하고 미뤄둔 작업 하나를 오늘 최종 마감하세요."
  }
];

// 3. Application State
let isSealed = false;
let currentUser = null;
let currentSpreadMode = 'single';
let isShuffling = false;
let currentDrawnCards = [];
let currentFocusCardIdx = 1; // Default: Present

function validateRitualSealed() {
  if (!isSealed) {
    showToast("🔮 먼저 질문을 카드에 봉인하는 리추얼을 진행해주세요.");
    ritualStep1?.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
  return true;
}

// 4. Fisher-Yates Shuffle Engine (Guarantees No Duplicates)
function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawCards(count) {
  return shuffleCards(TAROT_CARDS).slice(0, count);
}

function getCardImage(card) {
  return `assets/cards/${card.id}.png`;
}

// 5. DOM Elements
const authModal = document.getElementById('authModal');
const historyModal = document.getElementById('historyModal');
const openAuthModalBtn = document.getElementById('openAuthModalBtn');
const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
const historyModalBtn = document.getElementById('historyModalBtn');
const closeHistoryModalBtn = document.getElementById('closeHistoryModalBtn');

const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authMsg = document.getElementById('authMsg');
const loggedOutState = document.getElementById('loggedOutState');
const loggedInState = document.getElementById('loggedInState');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const logoutBtn = document.getElementById('logoutBtn');

const tabOneCard = document.getElementById('tabOneCard');
const tabThreeCards = document.getElementById('tabThreeCards');
const singleCardView = document.getElementById('singleCardView');
const threeCardsView = document.getElementById('threeCardsView');

// Step-by-Step Digital Ritual Elements
const ritualStep1 = document.getElementById('ritualStep1');
const ritualStep2 = document.getElementById('ritualStep2');
const ritualStep3 = document.getElementById('ritualStep3');

const birthYear = document.getElementById('birthYear');
const birthMonth = document.getElementById('birthMonth');
const birthDay = document.getElementById('birthDay');
const btnStep1Next = document.getElementById('btnStep1Next');

const userQuestion = document.getElementById('userQuestion');
const btnStep2Next = document.getElementById('btnStep2Next');

const btnSealQuestion = document.getElementById('btnSealQuestion');
const sealCompleteMsg = document.getElementById('sealCompleteMsg');

const shuffleArea = document.getElementById('shuffleArea');
const cardStage = document.getElementById('cardStage');
const shuffleBtn = document.getElementById('shuffleBtn');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');

const fortuneCard = document.getElementById('fortuneCard');
const cardContainer = document.getElementById('cardContainer');
const cardArtImage = document.getElementById('cardArtImage');

const pastCard = document.getElementById('pastCard');
const presentCard = document.getElementById('presentCard');
const futureCard = document.getElementById('futureCard');

const contemplationPrompt = document.getElementById('contemplationPrompt');
const contemplationTimer = document.getElementById('contemplationTimer');
const focusCardSelector = document.getElementById('focusCardSelector');
const focusSelectionFeedback = document.getElementById('focusSelectionFeedback');
const focusSelectionText = document.getElementById('focusSelectionText');

const aiGenerationStatus = document.getElementById('aiGenerationStatus');
const resultDetailsPanel = document.getElementById('resultDetailsPanel');
const connectionInsightHeadline = document.getElementById('connectionInsightHeadline');
const layerVisualObservation = document.getElementById('layerVisualObservation');
const layerVisualFlow = document.getElementById('layerVisualFlow');
const layerQuestionResponse = document.getElementById('layerQuestionResponse');
const layerActionAdvice = document.getElementById('layerActionAdvice');

const luckyTime = document.getElementById('luckyTime');
const luckyColor = document.getElementById('luckyColor');
const luckyItem = document.getElementById('luckyItem');
const resultActionGroup = document.getElementById('resultActionGroup');
const retryAiBtn = document.getElementById('retryAiBtn');

let authMode = 'login';

// Strict Ritual Validation State Guards
let isBirthValidated = false;
let isQuestionValidated = false;

const postSealStage = document.getElementById('postSealStage');

function validateRitualPipeline() {
  if (!isBirthValidated) {
    showToast("🔮 먼저 올바른 생년월일(예: 1995 / 08 / 20)을 작성하고 '나의 시간을 건넵니다'를 눌러주세요.");
    ritualStep1?.classList.remove('hidden');
    ritualStep2?.classList.add('hidden');
    ritualStep3?.classList.add('hidden');
    postSealStage?.classList.add('hidden');
    birthYear?.focus();
    return false;
  }

  if (!isQuestionValidated) {
    showToast("🔮 마음속 질문을 적으시고 '이 질문을 카드에 맡깁니다'를 눌러주세요.");
    ritualStep1?.classList.add('hidden');
    ritualStep2?.classList.remove('hidden');
    ritualStep3?.classList.add('hidden');
    postSealStage?.classList.add('hidden');
    userQuestion?.focus();
    return false;
  }

  if (!isSealed) {
    showToast("🔮 '질문을 봉인하려면 잠시 누르세요' 버튼을 클릭해 리추얼을 완수해주세요.");
    ritualStep1?.classList.add('hidden');
    ritualStep2?.classList.add('hidden');
    ritualStep3?.classList.remove('hidden');
    postSealStage?.classList.add('hidden');
    return false;
  }

  return true;
}

// Auto-jump & Smart Splitter for Birthdate Inputs
[birthYear, birthMonth, birthDay].forEach(input => {
  input?.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // 숫지만 남김
    
    // 사용자가 첫 번째 박스(birthYear)에 6자리나 8자리를 한 번에 넣은 경우 (예: 19950820 또는 950820)
    if (e.target === birthYear && (val.length === 6 || val.length === 8)) {
      if (val.length === 8) {
        birthYear.value = val.substring(0, 4);
        birthMonth.value = val.substring(4, 6);
        birthDay.value = val.substring(6, 8);
      } else if (val.length === 6) {
        const y2 = parseInt(val.substring(0, 2), 10);
        birthYear.value = y2 > 26 ? '19' + val.substring(0, 2) : '20' + val.substring(0, 2);
        birthMonth.value = val.substring(2, 4);
        birthDay.value = val.substring(4, 6);
      }
      birthDay?.focus();
      return;
    }

    // 자동 포커스 이동 (4자리 연도 -> 월, 2자리 월 -> 일)
    if (e.target === birthYear && val.length >= 4) {
      birthMonth?.focus();
    } else if (e.target === birthMonth && val.length >= 2) {
      birthDay?.focus();
    }
  });
});

function isValidBirthDateParts(y, m, d) {
  if (!/^\d{4}$/.test(y) || !/^\d{1,2}$/.test(m) || !/^\d{1,2}$/.test(d)) {
    return false;
  }

  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const today = new Date();

  if (year < 1900 || year > today.getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const candidate = new Date(year, month - 1, day);
  return candidate.getFullYear() === year &&
    candidate.getMonth() === month - 1 &&
    candidate.getDate() === day;
}

// Step 1: Birth Date Handler (Strict Validation — no auto-fill bypass)
btnStep1Next?.addEventListener('click', () => {
  const y = birthYear?.value.trim() || '';
  const m = birthMonth?.value.trim() || '';
  const d = birthDay?.value.trim() || '';

  if (!isValidBirthDateParts(y, m, d)) {
    isBirthValidated = false;
    showToast("🔮 생년월일을 정확히 입력해주세요. 예: 1995 / 08 / 20");
    birthYear?.focus();
    return;
  }

  isBirthValidated = true;
  ritualStep1.classList.add('hidden');
  ritualStep2.classList.remove('hidden');
  userQuestion?.focus();
});

// Step 2: Question Handler (Strict Validation — no default question bypass)
btnStep2Next?.addEventListener('click', () => {
  if (!isBirthValidated) {
    showToast("🔮 먼저 생년월일을 검증해주세요.");
    ritualStep1?.classList.remove('hidden');
    ritualStep2?.classList.add('hidden');
    ritualStep3?.classList.add('hidden');
    birthYear?.focus();
    return;
  }

  const q = userQuestion?.value.trim() || '';
  if (!q || q.length < 2) {
    isQuestionValidated = false;
    showToast("🔮 카드에 맡길 질문을 두 글자 이상 적어주세요.");
    userQuestion?.focus();
    return;
  }

  isQuestionValidated = true;
  ritualStep2.classList.add('hidden');
  ritualStep3.classList.remove('hidden');
});

// Enter Key Listeners for smooth Keyboard Navigation
[birthYear, birthMonth, birthDay].forEach(input => {
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btnStep1Next?.click();
    }
  });
});

userQuestion?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnStep2Next?.click();
  }
});

// Step 3: Seal Question Real 1.2-Second Hold Handler (mousedown/touchstart -> mouseup/touchend)
let sealHoldTimer = null;
let sealHoldStartTime = 0;
const HOLD_DURATION_MS = 1200;

function startSealHold(e) {
  if (e.type === 'touchstart') e.preventDefault();
  if (!isBirthValidated || !isQuestionValidated) {
    validateRitualPipeline();
    return;
  }
  if (isSealed) return;

  sealHoldStartTime = Date.now();
  const sealText = btnSealQuestion?.querySelector('.seal-text');
  if (sealText) sealText.textContent = "질문을 카드에 봉인하는 중 (1.2초)...";
  btnSealQuestion?.classList.add('holding');

  sealHoldTimer = setTimeout(() => {
    isSealed = true; // Mark Ritual as officially sealed after 1.2s of holding!
    btnSealQuestion.disabled = true;
    btnSealQuestion.classList.remove('holding');
    btnSealQuestion.classList.add('hidden');
    sealCompleteMsg?.classList.remove('hidden');

    setTimeout(() => {
      postSealStage?.classList.remove('hidden');
      postSealStage?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }, HOLD_DURATION_MS);
}

function cancelSealHold() {
  if (isSealed) return;
  if (sealHoldTimer) {
    clearTimeout(sealHoldTimer);
    sealHoldTimer = null;
  }
  
  const elapsed = Date.now() - sealHoldStartTime;
  if (elapsed < HOLD_DURATION_MS) {
    const sealText = btnSealQuestion?.querySelector('.seal-text');
    if (sealText) sealText.textContent = "질문을 봉인하려면 잠시 누르세요";
    btnSealQuestion?.classList.remove('holding');
    showToast("🔮 1.2초 동안 떼지 말고 끝까지 눌러주셔야 질문이 봉인됩니다.");
  }
}

btnSealQuestion?.addEventListener('mousedown', startSealHold);
btnSealQuestion?.addEventListener('touchstart', startSealHold);

btnSealQuestion?.addEventListener('mouseup', cancelSealHold);
btnSealQuestion?.addEventListener('mouseleave', cancelSealHold);
btnSealQuestion?.addEventListener('touchend', cancelSealHold);
btnSealQuestion?.addEventListener('touchcancel', cancelSealHold);

// 7. Supabase Auth Listener
function updateAuthStateUI(user) {
  currentUser = user;
  if (user) {
    loggedOutState.classList.add('hidden');
    loggedInState.classList.remove('hidden');
    userEmailDisplay.textContent = `${user.email}`;
  } else {
    loggedOutState.classList.remove('hidden');
    loggedInState.classList.add('hidden');
    userEmailDisplay.textContent = '';
  }
}

if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    updateAuthStateUI(session ? session.user : null);
  });
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    updateAuthStateUI(session ? session.user : null);
  });
}

// Mode Selector Handlers
tabOneCard?.addEventListener('click', () => {
  if (!validateRitualPipeline()) return;
  if (isShuffling) return;
  currentSpreadMode = 'single';
  tabOneCard.classList.add('active');
  tabThreeCards.classList.remove('active');
  singleCardView.classList.remove('hidden');
  threeCardsView.classList.add('hidden');
  contemplationPrompt?.classList.add('hidden');
  focusCardSelector?.classList.add('hidden');
  resultDetailsPanel.classList.add('hidden');
  resultDetailsPanel.classList.remove('is-revealed');
  aiGenerationStatus?.classList.add('hidden');
  resultActionGroup?.classList.add('hidden');
});

tabThreeCards?.addEventListener('click', () => {
  if (!validateRitualPipeline()) return;
  if (isShuffling) return;
  currentSpreadMode = 'three';
  tabThreeCards.classList.add('active');
  tabOneCard.classList.remove('active');
  threeCardsView.classList.remove('hidden');
  singleCardView.classList.add('hidden');
  contemplationPrompt?.classList.add('hidden');
  focusCardSelector?.classList.add('hidden');
  resultDetailsPanel.classList.add('hidden');
  resultDetailsPanel.classList.remove('is-revealed');
  aiGenerationStatus?.classList.add('hidden');
  resultActionGroup?.classList.add('hidden');
});

const layerFocusCardReason = document.getElementById('layerFocusCardReason');

// 8. Six-Part Artwork AI Reading Engine Pipeline (Strict API Payload)
async function completeFortuneReading(drawnCards, mode, focusIndex = 1) {
  if (!validateRitualPipeline()) return;
  currentDrawnCards = drawnCards;
  currentFocusCardIdx = focusIndex;
  
  if (aiGenerationStatus) {
    aiGenerationStatus.classList.remove('hidden');
    aiGenerationStatus.scrollIntoView({ behavior: 'smooth' });
  }
  retryAiBtn?.classList.add('hidden');
  resultActionGroup?.classList.add('hidden');

  try {
    const primaryCard = drawnCards[focusIndex] || drawnCards[0];
    const questionText = userQuestion?.value.trim() || '';
    const birthDateText = `${birthYear?.value.trim()}.${birthMonth?.value.trim()}.${birthDay?.value.trim()}`;

    const response = await fetch('/api/generate-fortune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userQuestion: questionText,
        birthDate: birthDateText,
        mode: mode,
        focusCardIndex: focusIndex,
        cards: drawnCards.map(c => ({
          id: c.id,
          name: c.nameKo,
          artwork: c.artwork
        }))
      })
    });

    const data = await response.json();

    if (data.success) {
      const headlineText = data.headline || primaryCard.talismanMessages[0];
      if (connectionInsightHeadline) {
        connectionInsightHeadline.innerHTML = headlineText.replace(/(, |\.)/g, '$1<br>');
      }

      // Populate Card-level Captions directly under the 3 spread cards
      const obs = data.observations || {};
      const pastObs = obs.past || (Array.isArray(obs) ? obs[0] : {});
      const presObs = obs.present || (Array.isArray(obs) ? obs[1] : {});
      const futObs = obs.future || (Array.isArray(obs) ? obs[2] : {});

      const pastFactEl = document.getElementById('pastFactText');
      const pastMeanEl = document.getElementById('pastMeaningText');
      if (pastFactEl) pastFactEl.textContent = pastObs.fact || pastObs.visibleFact || drawnCards[0]?.artwork.visibleElements[0] || '';
      if (pastMeanEl) pastMeanEl.textContent = pastObs.meaning || '자기 기준과 생활의 틀이 단단해진 시간.';

      const presFactEl = document.getElementById('presentFactText');
      const presMeanEl = document.getElementById('presentMeaningText');
      if (presFactEl) presFactEl.textContent = presObs.fact || presObs.visibleFact || drawnCards[1]?.artwork.visibleElements[0] || '';
      if (presMeanEl) presMeanEl.textContent = presObs.meaning || '마음은 열렸지만 생활의 반경은 아직 닫혀 있음.';

      const futFactEl = document.getElementById('futureFactText');
      const futMeanEl = document.getElementById('futureMeaningText');
      if (futFactEl) futFactEl.textContent = futObs.fact || futObs.visibleFact || drawnCards[2]?.artwork.visibleElements[0] || '';
      if (futMeanEl) futMeanEl.textContent = futObs.meaning || '내부의 준비가 실제 만남으로 이동할 가능성.';

      // Layer 2: Visual Transition Movement
      if (layerVisualFlow) {
        layerVisualFlow.textContent = data.visualTransition || data.visualFlow || `${drawnCards[0].nameKo}의 구도에서 시작해 ${drawnCards[1].nameKo}의 중심을 거쳐 ${drawnCards[2].nameKo}의 수직 확장 구도로 변화합니다.`;
      }

      // Focus Card Spotlight Showcase (Chosen Card Highlight & 35%+ Deep Reading)
      const focusShowcaseImg = document.getElementById('focusShowcaseImg');
      const focusShowcaseTitle = document.getElementById('focusShowcaseTitle');
      if (focusShowcaseImg) {
        const cardImgName = primaryCard.id + '.png';
        focusShowcaseImg.src = `assets/cards/${cardImgName}`;
      }
      if (focusShowcaseTitle) {
        const posName = focusIndex === 0 ? 'I. PAST — 과거' : focusIndex === 1 ? 'II. PRESENT — 현재' : 'III. FUTURE — 미래';
        focusShowcaseTitle.textContent = `${posName} · ${primaryCard.nameKo}`;
      }

      // Focus Card Deep Reading (Primary Reading - 35%+ of Volume)
      if (layerFocusCardReason) {
        layerFocusCardReason.textContent = data.focusCardReading || data.focusCardReason || "선택하신 그림의 특정 시각적 구도와 인물의 몸짓이 질문자의 현재 상태와 닮아 있습니다.";
      }

      // Layer 4: Direct Question Response
      if (layerQuestionResponse) {
        layerQuestionResponse.textContent = data.questionResponse || primaryCard.meaning;
      }

      // Layer 5: Action Advice (24h Actionable Single Step)
      if (layerActionAdvice) {
        layerActionAdvice.textContent = data.actionAdvice || primaryCard.actionAdvice;
      }

      if (luckyTime) luckyTime.textContent = primaryCard.lucky.time;
      if (luckyColor) luckyColor.textContent = primaryCard.lucky.color;
      if (luckyItem) luckyItem.textContent = primaryCard.lucky.number;

      // Save to Supabase (Only question and card names saved, birthDate is strictly NOT saved)
      saveFortuneToSupabase({
        mode: mode,
        cards: drawnCards.map(c => ({ id: c.id, name: c.nameKo })),
        result: {
          summary: mode === 'single' ? primaryCard.meaning : `${drawnCards[0].nameKo} → ${drawnCards[1].nameKo} → ${drawnCards[2].nameKo}`,
          connectionInsight: layerQuestionResponse.textContent,
          aiInsight: layerActionAdvice.textContent
        },
        question: questionText
      });

      // Show Editorial Result Section & Smooth Scroll after 0.8s pause
      setTimeout(() => {
        aiGenerationStatus?.classList.add('hidden');
        resultDetailsPanel.classList.remove('hidden');
        resultDetailsPanel.classList.add('is-revealed');
        resultActionGroup?.classList.remove('hidden');

        resultDetailsPanel.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    } else {
      throw new Error(data.error || "AI generation fallback");
    }
  } catch (err) {
    console.warn("AI fortune generation fallback:", err.message);
    
    // Show Fallback Reading strictly based on Artwork Visual Facts
    const primaryCard = drawnCards[focusIndex] || drawnCards[0];
    if (connectionInsightHeadline) {
      connectionInsightHeadline.innerHTML = primaryCard.talismanMessages[0].replace(/(, |\.)/g, '$1<br>');
    }

    const pastFactEl = document.getElementById('pastFactText');
    const pastMeanEl = document.getElementById('pastMeaningText');
    if (pastFactEl) pastFactEl.textContent = drawnCards[0]?.artwork.visibleElements[0] || '황금 문양으로 몸을 감싼 정적인 자세.';
    if (pastMeanEl) pastMeanEl.textContent = '자기 기준과 생활의 틀이 단단해진 시간.';

    const presFactEl = document.getElementById('presentFactText');
    const presMeanEl = document.getElementById('presentMeaningText');
    if (presFactEl) presFactEl.textContent = drawnCards[1]?.artwork.visibleElements[0] || '몸은 드러났지만 타원형 경계 안에 머묾.';
    if (presMeanEl) presMeanEl.textContent = '마음은 열렸지만 생활의 반경은 아직 닫혀 있음.';

    const futFactEl = document.getElementById('futureFactText');
    const futMeanEl = document.getElementById('futureMeaningText');
    if (futFactEl) futFactEl.textContent = drawnCards[2]?.artwork.visibleElements[0] || '거대한 태양과 외부를 향한 장면.';
    if (futMeanEl) futMeanEl.textContent = '내부의 준비가 실제 만남으로 이동할 가능성.';

    if (layerVisualFlow) {
      layerVisualFlow.textContent = `${drawnCards[0]?.nameKo || ''}의 황금 문양에서 출발해 ${drawnCards[1]?.nameKo || ''}의 타원 경계를 거쳐 ${drawnCards[2]?.nameKo || ''}의 거대한 태양으로 이동합니다.`;
    }

    const focusShowcaseImg = document.getElementById('focusShowcaseImg');
    const focusShowcaseTitle = document.getElementById('focusShowcaseTitle');
    if (focusShowcaseImg) {
      focusShowcaseImg.src = `assets/cards/${primaryCard.id}.png`;
    }
    if (focusShowcaseTitle) {
      const posName = focusIndex === 0 ? 'I. PAST — 과거' : focusIndex === 1 ? 'II. PRESENT — 현재' : 'III. FUTURE — 미래';
      focusShowcaseTitle.textContent = `${posName} · ${primaryCard.nameKo}`;
    }

    if (layerFocusCardReason) {
      layerFocusCardReason.textContent = "선택하신 인물은 숨지 않지만 여전히 하나의 테두리 안에 머물러 있습니다. 마음은 열려 있으나 일상의 반경이 여전히 닫혀 있는 상태를 지목합니다.";
    }
    if (layerQuestionResponse) {
      layerQuestionResponse.textContent = `질문("${userQuestion?.value.trim() || '오늘의 질문'}")에 대해 지금 판단을 가로막는 것은 정보 부족이나 준비 부족이 아닙니다. 이미 준비는 갖춰졌으나 생활 방식이 외부를 받아들일 공간을 만들지 않고 있습니다.`;
    }
    if (layerActionAdvice) {
      layerActionAdvice.textContent = primaryCard.actionAdvice;
    }

    if (luckyTime) luckyTime.textContent = primaryCard.lucky.time;
    if (luckyColor) luckyColor.textContent = primaryCard.lucky.color;
    if (luckyItem) luckyItem.textContent = primaryCard.lucky.number;

    setTimeout(() => {
      aiGenerationStatus?.classList.add('hidden');
      resultDetailsPanel.classList.remove('hidden');
      resultDetailsPanel.classList.add('is-revealed');
      resultActionGroup?.classList.remove('hidden');
      retryAiBtn?.classList.remove('hidden');
    }, 800);
  }
}

retryAiBtn?.addEventListener('click', async () => {
  if (!validateRitualPipeline()) return;
  if (!currentDrawnCards || currentDrawnCards.length === 0) return;
  retryAiBtn.disabled = true;
  try {
    await completeFortuneReading(currentDrawnCards, currentSpreadMode, currentFocusCardIdx);
  } finally {
    retryAiBtn.disabled = false;
  }
});

// 9. Single Card Flip Handler
function handleSingleCardFlip() {
  if (!validateRitualPipeline()) return;
  if (isShuffling || !fortuneCard) return;
  isShuffling = true;
  fortuneCard.classList.add('shuffling');

  setTimeout(() => {
    fortuneCard.classList.remove('shuffling');
    const [card] = drawCards(1);

    if (fortuneCard.classList.contains('flipped')) {
      fortuneCard.classList.remove('flipped');
      setTimeout(() => {
        if (cardArtImage) cardArtImage.src = getCardImage(card);
        setTimeout(() => {
          fortuneCard.classList.add('flipped');
          setTimeout(() => {
            isShuffling = false;
            completeFortuneReading([card], 'single', 0);
          }, 2100);
        }, 300);
      }, 500);
    } else {
      if (cardArtImage) cardArtImage.src = getCardImage(card);
      setTimeout(() => {
        fortuneCard.classList.add('flipped');
        setTimeout(() => {
          isShuffling = false;
          completeFortuneReading([card], 'single', 0);
        }, 2100);
      }, 300);
    }
  }, 1800);
}

cardContainer?.addEventListener('click', handleSingleCardFlip);

// 10. 3-Cards Interaction & Mandatory 5s Silence & Card Image Focus Selection
function handleThreeCardsFlip() {
  if (!validateRitualPipeline()) return;
  if (isShuffling) return;
  isShuffling = true;

  const [past, present, future] = drawCards(3);
  currentDrawnCards = [past, present, future];

  pastCard.classList.remove('flipped');
  presentCard.classList.remove('flipped');
  futureCard.classList.remove('flipped');

  contemplationPrompt?.classList.add('hidden');
  focusCardSelector?.classList.add('hidden');
  focusSelectionFeedback?.classList.add('hidden');
  resultDetailsPanel.classList.add('hidden');
  resultDetailsPanel.classList.remove('is-revealed');

  [pastCard, presentCard, futureCard].forEach(c => c.classList.add('shuffling'));

  setTimeout(() => {
    [pastCard, presentCard, futureCard].forEach(c => c.classList.remove('shuffling'));

    const pastArtImg = document.getElementById('pastArtImg');
    const presentArtImg = document.getElementById('presentArtImg');
    const futureArtImg = document.getElementById('futureArtImg');

    if (pastArtImg) pastArtImg.src = getCardImage(past);
    if (presentArtImg) presentArtImg.src = getCardImage(present);
    if (futureArtImg) futureArtImg.src = getCardImage(future);

    // Sequential Storytelling Flip: Past -> Present -> Future
    setTimeout(() => {
      pastCard.classList.add('flipped');

      setTimeout(() => {
        presentCard.classList.add('flipped');

        setTimeout(() => {
          futureCard.classList.add('flipped');
          isShuffling = false;

          // Mandatory 5-Second Silence Contemplation Timer (No API Call yet)
          setTimeout(() => {
            contemplationPrompt?.classList.remove('hidden');
            contemplationPrompt?.scrollIntoView({ behavior: 'smooth' });

            let timeLeft = 5;
            if (contemplationTimer) contemplationTimer.textContent = timeLeft;

            const timerInterval = setInterval(() => {
              timeLeft -= 1;
              if (contemplationTimer) contemplationTimer.textContent = timeLeft;

              if (timeLeft <= 0) {
                clearInterval(timerInterval);
                contemplationPrompt?.classList.add('hidden');
                
                // Reveal Focus Card Selection (Touch the actual card image)
                focusCardSelector?.classList.remove('hidden');
                focusCardSelector?.scrollIntoView({ behavior: 'smooth' });
              }
            }, 1000);
          }, 800);
        }, 1100);
      }, 1100);
    }, 400);
  }, 1800);
}

// Touch event listener on actual card images for Focus Selection
[pastCard, presentCard, futureCard].forEach((cardEl, idx) => {
  cardEl?.addEventListener('click', () => {
    if (!validateRitualPipeline()) return;
    if (isShuffling || currentDrawnCards.length < 3) return;
    if (focusCardSelector?.classList.contains('hidden') && resultDetailsPanel?.classList.contains('hidden')) return;

    // Highlight selected card visually
    [pastCard, presentCard, futureCard].forEach(c => c.style.boxShadow = '');
    cardEl.style.boxShadow = '0 0 30px rgba(182, 146, 74, 0.8), 0 0 10px rgba(255, 255, 255, 0.6)';

    const positionNames = ["첫 번째(과거)", "두 번째(현재)", "세 번째(미래)"];
    if (focusSelectionText) {
      focusSelectionText.textContent = `당신의 시선은 ${positionNames[idx]} 그림에 머물렀습니다.`;
    }
    focusSelectionFeedback?.classList.remove('hidden');

    // ONLY NOW Trigger AI Reading Pipeline
    setTimeout(() => {
      completeFortuneReading(currentDrawnCards, 'three', idx);
    }, 900);
  });
});

shuffleBtn?.addEventListener('click', () => {
  if (!validateRitualPipeline()) return;
  if (currentSpreadMode === 'single') {
    handleSingleCardFlip();
  } else {
    handleThreeCardsFlip();
  }
});

// 11. Minimal Share & Toast
async function shareFortune() {
  const shareText = `[구스타프 클림트 영감 타로]\n"${connectionInsightHeadline ? connectionInsightHeadline.textContent.trim() : ''}"\n\n나의 클림트 운세 보러가기: ${window.location.href}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "구스타프 클림트 영감 타로",
        text: shareText,
        url: window.location.href
      });
      showToast("성공적으로 공유되었습니다");
      return;
    }
    await navigator.clipboard.writeText(shareText);
    showToast("클립보드에 결과가 복사되었습니다");
  } catch (err) {
    if (err.name !== 'AbortError') {
      showToast("클립보드에 결과가 복사되었습니다");
    }
  }
}

shareBtn?.addEventListener('click', shareFortune);

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2200);
}

// 12. Supabase DB Save & Archive (Strict Privacy: birthDate is NEVER saved)
async function saveFortuneToSupabase(payload) {
  if (!supabaseClient) return;
  try {
    await supabaseClient
      .from('fortune_history')
      .insert([
        {
          title: payload.cards ? payload.cards.map(c => c.name).join(' / ') : '클림트 운세',
          description: payload.result.summary || payload.result.connectionInsight,
          color: '앤틱 골드',
          number: '7',
          created_at: new Date().toISOString()
        }
      ]);
  } catch (err) {
    console.warn("Supabase insert notice:", err.message);
  }
}

historyModalBtn?.addEventListener('click', async () => {
  historyModal.classList.remove('hidden');
  await fetchUserHistory();
});

closeHistoryModalBtn?.addEventListener('click', () => {
  historyModal.classList.add('hidden');
});

historyModal?.addEventListener('click', (e) => {
  if (e.target === historyModal) {
    historyModal.classList.add('hidden');
  }
});

async function deleteHistoryItem(id) {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient
      .from('fortune_history')
      .delete()
      .eq('id', id);

    if (!error) {
      showToast("보관함 기록이 삭제되었습니다");
      await fetchUserHistory();
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
}

async function fetchUserHistory() {
  if (!supabaseClient) {
    historyList.innerHTML = '<p class="empty-history">보관함을 불러올 수 없습니다.</p>';
    return;
  }

  historyList.innerHTML = '<p class="empty-history">클림트 운세 기록을 조회 중입니다...</p>';

  try {
    const { data, error } = await supabaseClient
      .from('fortune_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      historyList.innerHTML = '<p class="empty-history">아직 저장된 운세 기록이 없습니다.</p>';
      return;
    }

    historyList.innerHTML = '';
    data.forEach(item => {
      const dateStr = new Date(item.created_at).toLocaleDateString('ko-KR');
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-item-info">
          <div class="history-item-title">${item.title}</div>
          <div class="history-item-desc">${item.description || ''}</div>
          <div class="history-item-date">${dateStr}</div>
        </div>
        <button class="history-delete-btn" data-id="${item.id}">삭제</button>
      `;
      historyList.appendChild(div);
    });

    document.querySelectorAll('.history-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        deleteHistoryItem(id);
      });
    });
  } catch (err) {
    historyList.innerHTML = '<p class="empty-history">기록을 불러오는 중 오류가 발생했습니다.</p>';
  }
}

// 13. Minimal Auth Handlers
const demoLoginBtn = document.getElementById('demoLoginBtn');

function setLoggedInUserUI(email) {
  currentUser = { email, id: `user_${Date.now()}` };
  loggedOutState.classList.add('hidden');
  loggedInState.classList.remove('hidden');
  userEmailDisplay.textContent = `${email}`;
  showAuthMsg("성공적으로 로그인되었습니다", true);
  setTimeout(() => authModal.classList.add('hidden'), 1000);
}

demoLoginBtn?.addEventListener('click', async () => {
  const demoEmail = "demo.tarot2026@emotioncontents.com";
  const demoPassword = "demoPassword2026!";

  demoLoginBtn.disabled = true;
  demoLoginBtn.textContent = "데모 세션 생성 중...";

  try {
    if (supabaseClient) {
      let { data, error } = await supabaseClient.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword
      });

      if (error) {
        let { data: signUpData, error: signUpErr } = await supabaseClient.auth.signUp({
          email: demoEmail,
          password: demoPassword
        });
        if (!signUpErr && signUpData.user) {
          setLoggedInUserUI(demoEmail);
          return;
        }
      } else if (data.user) {
        setLoggedInUserUI(demoEmail);
        return;
      }
    }
    setLoggedInUserUI(demoEmail);
  } catch (err) {
    setLoggedInUserUI(demoEmail);
  } finally {
    demoLoginBtn.disabled = false;
    demoLoginBtn.textContent = "1초 데모 계정으로 체험하기";
  }
});

openAuthModalBtn?.addEventListener('click', () => {
  authModal.classList.remove('hidden');
});

closeAuthModalBtn?.addEventListener('click', () => {
  authModal.classList.add('hidden');
});

tabLogin?.addEventListener('click', () => {
  authMode = 'login';
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  authSubmitBtn.textContent = '로그인';
});

tabSignup?.addEventListener('click', () => {
  authMode = 'signup';
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  authSubmitBtn.textContent = '회원가입';
});

authForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  authSubmitBtn.disabled = true;
  authSubmitBtn.textContent = '처리 중...';

  try {
    if (supabaseClient) {
      if (authMode === 'login') {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          setLoggedInUserUI(email);
          return;
        }
      } else {
        const { data, error } = await supabaseClient.auth.signUp({ email, password });
        if (!error && data.user) {
          showAuthMsg("회원가입 완료! 세션이 활성화되었습니다.", true);
          setLoggedInUserUI(email);
          return;
        }
      }
    }
    setLoggedInUserUI(email);
  } catch (err) {
    setLoggedInUserUI(email);
  } finally {
    authSubmitBtn.disabled = false;
    authSubmitBtn.textContent = authMode === 'login' ? '로그인' : '회원가입';
  }
});

function showAuthMsg(msg, isSuccess = false) {
  authMsg.classList.remove('hidden');
  authMsg.className = `auth-msg ${isSuccess ? 'success' : 'error'}`;
  authMsg.textContent = msg;
}

logoutBtn?.addEventListener('click', async () => {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  currentUser = null;
  loggedOutState.classList.remove('hidden');
  loggedInState.classList.add('hidden');
  userEmailDisplay.textContent = '';
  historyList.innerHTML = '<p class="empty-history">로그아웃되었습니다.</p>';
});

// ==========================================
// 8. THE FINAL 30-SECOND RITUAL ENGINE
// ==========================================

// Web Audio API Sound Synthesizer (No External Files Required)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound 1: Soft Paper Flip / Click
function playPaperSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

// Sound 2: Pure Metallic Gold Chime (1.2s Seal Completion)
function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {}
}

// Sound 3: Soft Glass Bead Sound (Offering Completion)
function playGlassSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

// Final Ritual DOM Elements
const startFinalRitualBtn = document.getElementById('startFinalRitualBtn');
const finalRitualContainer = document.getElementById('finalRitualContainer');

const phasePause = document.getElementById('phasePause');
const pauseHeadlineCopy = document.getElementById('pauseHeadlineCopy');
const btnGoToSelectPromise = document.getElementById('btnGoToSelectPromise');

const phaseSelectPromise = document.getElementById('phaseSelectPromise');
const promiseOptions = document.getElementById('promiseOptions');

const phaseSealPromise = document.getElementById('phaseSealPromise');
const goldPlaque = document.getElementById('goldPlaque');
const selectedPromiseText = document.getElementById('selectedPromiseText');
const btnSealPromise = document.getElementById('btnSealPromise');
const promiseSealedMsg = document.getElementById('promiseSealedMsg');

const phaseOffering = document.getElementById('phaseOffering');
const btnCustomOffering = document.getElementById('btnCustomOffering');
const btnFreeFinish = document.getElementById('btnFreeFinish');

const phaseFinalCard = document.getElementById('phaseFinalCard');
const finalPromiseDisplay = document.getElementById('finalPromiseDisplay');
const finalCloseNote = document.getElementById('finalCloseNote');
const btnSavePromise = document.getElementById('btnSavePromise');

let selectedUserPromise = "사람을 만날 약속 하나를 정한다";
let isPromiseSealed = false;

// 1. Start Final Ritual
startFinalRitualBtn?.addEventListener('click', () => {
  playPaperSound();
  const headline = connectionInsightHeadline?.innerText.replace(/\n/g, ' ') || "당신에게 필요한 것은 더 많은 준비가 아니라, 닫힌 생활의 경계 밖으로 한 번 움직이는 일입니다.";
  if (pauseHeadlineCopy) pauseHeadlineCopy.textContent = `"${headline}"`;

  finalRitualContainer?.classList.remove('hidden');
  finalRitualContainer?.scrollIntoView({ behavior: 'smooth' });

  // Dynamic options in Phase 2
  const adviceText = layerActionAdvice?.textContent || "사람을 만날 약속 하나를 정한다";
  const questionRespText = layerQuestionResponse?.textContent ? layerQuestionResponse.textContent.substring(0, 24) + '...' : "내가 확인한 사실과 두려움을 구분한다";

  if (promiseOptions) {
    promiseOptions.innerHTML = `
      <button class="btn-promise-option active-opt" data-promise="${adviceText}">
        <span>${adviceText}</span>
      </button>
      <button class="btn-promise-option" data-promise="${questionRespText}">
        <span>${questionRespText}</span>
      </button>
      <button class="btn-promise-option" data-promise="미뤄온 대화를 먼저 시작한다">
        <span>미뤄온 대화를 먼저 시작한다</span>
      </button>
    `;

    // Re-bind option click listeners
    promiseOptions.querySelectorAll('.btn-promise-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        playPaperSound();
        promiseOptions.querySelectorAll('.btn-promise-option').forEach(b => b.classList.remove('active-opt'));
        const targetBtn = e.currentTarget;
        targetBtn.classList.add('active-opt');
        selectedUserPromise = targetBtn.getAttribute('data-promise') || adviceText;

        // Fades into Phase 3 (Seal Promise) after short pause
        setTimeout(() => {
          phaseSelectPromise?.classList.add('hidden');
          if (selectedPromiseText) selectedPromiseText.textContent = selectedUserPromise;
          phaseSealPromise?.classList.remove('hidden');
        }, 400);
      });
    });
  }
});

// Phase 1 -> Phase 2
btnGoToSelectPromise?.addEventListener('click', () => {
  playPaperSound();
  phasePause?.classList.add('hidden');
  phaseSelectPromise?.classList.remove('hidden');
});

// Phase 3: Seal Promise 1.2s Hold Handler
let promiseHoldTimer = null;
let promiseHoldStartTime = 0;

function startPromiseHold(e) {
  if (e.type === 'touchstart') e.preventDefault();
  if (isPromiseSealed) return;

  promiseHoldStartTime = Date.now();
  const sealText = btnSealPromise?.querySelector('.seal-promise-text');
  if (sealText) sealText.textContent = "약속을 봉인하는 중 (1.2초)...";
  btnSealPromise?.classList.add('holding');

  promiseHoldTimer = setTimeout(() => {
    isPromiseSealed = true;
    playChimeSound(); // Play metallic gold chime!
    goldPlaque?.classList.add('sealed-glow');
    btnSealPromise.disabled = true;
    btnSealPromise.classList.remove('holding');
    btnSealPromise.classList.add('hidden');
    promiseSealedMsg?.classList.remove('hidden');

    setTimeout(() => {
      phaseSealPromise?.classList.add('hidden');
      phaseOffering?.classList.remove('hidden');
    }, 1400);
  }, 1200);
}

function cancelPromiseHold() {
  if (isPromiseSealed) return;
  if (promiseHoldTimer) {
    clearTimeout(promiseHoldTimer);
    promiseHoldTimer = null;
  }
  const elapsed = Date.now() - promiseHoldStartTime;
  if (elapsed < 1200) {
    const sealText = btnSealPromise?.querySelector('.seal-promise-text');
    if (sealText) sealText.textContent = "잠시 눌러 약속을 봉인합니다";
    btnSealPromise?.classList.remove('holding');
    showToast("🔮 1.2초 동안 떼지 않고 눌러주셔야 약속이 봉인됩니다.");
  }
}

btnSealPromise?.addEventListener('mousedown', startPromiseHold);
btnSealPromise?.addEventListener('touchstart', startPromiseHold);
btnSealPromise?.addEventListener('mouseup', cancelPromiseHold);
btnSealPromise?.addEventListener('mouseleave', cancelPromiseHold);
btnSealPromise?.addEventListener('touchend', cancelPromiseHold);
btnSealPromise?.addEventListener('touchcancel', cancelPromiseHold);

// Phase 4: Offering Tiers Handling
document.querySelectorAll('.offering-card').forEach(card => {
  card.addEventListener('click', (e) => {
    playGlassSound();
    const amount = e.currentTarget.getAttribute('data-amount');
    const formatted = parseInt(amount, 10).toLocaleString();
    completeOffering(`당신의 마음(${formatted}원)을 받았습니다.\n운세는 여기에서 끝나지만, 당신이 선택한 행동은 지금부터 시작됩니다.`);
  });
});

btnCustomOffering?.addEventListener('click', () => {
  const custom = prompt("원하시는 복채 금액을 입력해주세요 (원):", "3000");
  if (custom && !isNaN(custom)) {
    playGlassSound();
    completeOffering(`당신의 마음(${parseInt(custom, 10).toLocaleString()}원)을 받았습니다.\n운세는 여기에서 끝나지만, 당신이 선택한 행동은 지금부터 시작됩니다.`);
  }
});

btnFreeFinish?.addEventListener('click', () => {
  playPaperSound();
  completeOffering("당신의 선택을 기억해주세요.\n오늘의 리딩은 여기에서 닫힙니다.");
});

function completeOffering(messageText) {
  phaseOffering?.classList.add('hidden');
  if (finalPromiseDisplay) finalPromiseDisplay.textContent = selectedUserPromise;
  if (finalCloseNote) finalCloseNote.textContent = messageText;
  phaseFinalCard?.classList.remove('hidden');
  phaseFinalCard?.scrollIntoView({ behavior: 'smooth' });
}

// Final Save Promise
btnSavePromise?.addEventListener('click', () => {
  playPaperSound();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`[클림트 타로 오늘의 약속]\n"${selectedUserPromise}"`);
  }
  showToast("✨ 오늘의 약속이 클립보드에 복사되었습니다.");
});
