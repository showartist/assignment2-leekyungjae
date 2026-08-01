// Vercel Serverless Function: OpenRouter AI Pure Visual Fact & Multimodal Tarot Reading
module.exports = async (req, res) => {
  // CORS & Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { userQuestion, birthDate, mode, focusCardIndex, cards } = req.body || {};
    const apiKey = process.env.OPENROUTER_API_KEY;

    // Default Fallback Response when API key is not present
    const fallbackResponse = {
      success: true,
      source: 'smart-fallback',
      headline: `당신은 관계와 변화를 받아들일 준비가 되어 있습니다. 지금 필요한 것은 준비가 아니라, 닫힌 경계 밖으로 한 걸음 움직이는 일입니다.`,
      observations: {
        past: {
          fact: cards && cards[0] ? `${cards[0].nameKo}: 황금 문양으로 몸을 감싼 정적인 자세.` : "황금 문양으로 몸을 감싼 정적인 자세.",
          meaning: "스스로 정해둔 기준과 안전지대가 단단하게 구축된 시간."
        },
        present: {
          fact: cards && cards[1] ? `${cards[1].nameKo}: 몸의 일부가 드러났으나 타원형 테두리 안에 머묾.` : "몸의 일부가 드러났으나 타원형 테두리 안에 머묾.",
          meaning: "마음은 열렸지만 실제 일상과 행동의 반경은 여전히 닫혀 있음."
        },
        future: {
          fact: cards && cards[2] ? `${cards[2].nameKo}: 거대한 빛 아래 인물과 외부 지형이 드러남.` : "거대한 빛 아래 인물과 외부 지형이 드러남.",
          meaning: "내부의 정적을 벗어나 실제 외부 세계와의 만남으로 이동하는 시점."
        }
      },
      visualTransition: "황금 문양 옷으로 자신을 감싼 몸 → 드러났지만 타원형 경계 안에 머무는 몸 → 커다란 빛 아래 외부와 접촉하는 장면으로 이동합니다.",
      focusCardReading: `선택하신 포커스 카드에서 인물은 숨지 않지만 여전히 하나의 테두리 안에 머물러 있습니다. 당신도 마음으로는 새로운 계기나 관계를 받아들일 수 있지만, 실제 일정과 행동 반경은 여전히 익숙한 고유 범위 안에 머물러 있을 가능성이 큽니다. 이상형이나 다음 단계의 조건을 계속 다듬기보다, 닫힌 궤도를 깨고 밖으로 한 걸음 나아가는 결단이 필요한 지점입니다.`,
      questionResponse: `질문("${userQuestion || '오늘의 질문'}")에 대해 판단을 가로막는 것은 준비 부족이 아닙니다. 이미 당신 내부에는 감정적 준비와 자기 기준이 갖춰져 있습니다. 다만 현재의 생활 패턴이 외부와 접촉할 여백을 만들지 않고 있을 뿐입니다.`,
      actionAdvice: `이번 주 안에 사람을 만나거나 새로운 장소로 나가는 구체적 약속 하나(누구와, 언제, 어디서 중 1가지)를 오늘 바로 확정하세요.`
    };

    if (!apiKey || apiKey.includes('YOUR_OPENROUTER_API_KEY')) {
      return res.status(200).json(fallbackResponse);
    }

    const systemPrompt = `당신은 육안으로 직접 확인 가능한 시각 사실(Visual Facts)만을 근거로 사용자의 질문에 날카롭고 솔직하게 응답하는 미술관 도록 해설자이자 타로 리더다.

주의: 제시된 이미지들은 실제 클림트 원작 회화가 아니라, '클림트 황금기 화풍에서 영감을 받아 제작된 타로 일러스트'이다. 절대로 실제 클림트 원작이라고 표기하지 마라.

엄격 준수 규칙 (위반 시 응답 무효):
1. 금지 단어: '연출한다', '신비로운', '환상적인', '기류', '파동', '우주의', '운명적인', '찬란한', '필연적인', '깊은 통찰', '새로운 문이 열린다', '빛을 발한다' 단어를 절대로 사용하지 마라.
2. 관찰과 해석의 완전 분리:
   - visibleFacts: 오직 카메라나 육안으로 직접 확인되는 대상, 자세, 위치, 색, 구도만 작성하라. '안정적이다', '외부 시선을 의식한다', '준비되어 있다' 같은 심리 상태나 추측을 관찰 문장에 절대로 넣지 마라.
   - 인물의 수, 손 위치, 시선, 형태가 불확실하면 추측하지 마라.
3. 세 그림의 흐름(visualTransition):
   - 카드의 일반적인 상징이 아닌, 실제 세 이미지에서 나타나는 물리적 변화 한 가지(예: 옷으로 감싼 몸 -> 드러난 몸 -> 외부의 큰 빛)를 중심으로 작성하라.
4. 선택된 포커스 카드 깊은 해석(focusCardReading):
   - 사용자가 직접 선택한 포커스 카드에 전체 해석 분량의 35% 이상을 할당하라. 선택한 카드의 구도적 긴장과 인물의 형태가 질문자의 현재 상태와 어떻게 닮았는지 상세히 분석하라.
5. 질문 응답(questionResponse):
   - 사용자의 질문에 직접 답하는 3~5문장으로 작성하라. 어느 질문에도 붙일 수 있는 범용 조언을 금지한다.
6. 행동 조언(actionAdvice):
   - 그림에서 발견한 시각적 변화와 직접 연결된, 24시간 안에 실행 가능한 구체적 행동(누구와, 언제, 어디서 중 1가지 확정)을 제시하라. '걱정을 적어보라', '마음을 열어라' 같은 상투적 조언 금지.

Output MUST be valid JSON matching this exact structure:
{
  "headline": "사용자 질문에 응답하는 날카롭고 명확한 한 문장",
  "observations": {
    "past": {
      "fact": "과거 카드에서 육안으로 확인되는 관찰 사실 (1문장)",
      "meaning": "그 시각적 사실이 질문과 연결되는 의미 (1문장)"
    },
    "present": {
      "fact": "현재 카드에서 육안으로 확인되는 관찰 사실 (1문장)",
      "meaning": "그 시각적 사실이 질문과 연결되는 의미 (1문장)"
    },
    "future": {
      "fact": "미래 카드에서 육안으로 확인되는 관찰 사실 (1문장)",
      "meaning": "그 시각적 사실이 질문과 연결되는 의미 (1문장)"
    }
  },
  "visualTransition": "세 그림의 실제 시각적 변화 흐름 (1-2문장)",
  "focusCardReading": "선택된 포커스 카드의 시각적 구도 및 깊은 해석 (전체 해석의 35% 이상 분량, 4-6문장)",
  "questionResponse": "사용자의 질문에 직접 응답하는 단호한 판단 (3-5문장)",
  "actionAdvice": "그림의 시각 변화와 직결된 24시간 이내 구체적 실행 행동 1가지 (1-2문장)"
}`;

    const userPrompt = `시간 좌표(생년월일): "${birthDate || '미입력'}", 마음속 질문: "${userQuestion || '오늘의 질문'}", 터치하여 시선이 머문 카드 인덱스: ${focusCardIndex} (${focusCardIndex === 0 ? '과거' : focusCardIndex === 1 ? '현재' : '미래'} 카드), 세 카드 시각 데이터: ${JSON.stringify(cards || [])}`;

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://assignment2-leekyungjae.vercel.app',
        'X-Title': 'Klimt Tarot AI'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' }
      })
    });

    if (!openRouterResponse.ok) {
      const errText = await openRouterResponse.text();
      console.error("OpenRouter API error:", errText);
      return res.status(200).json(fallbackResponse);
    }

    const data = await openRouterResponse.json();
    const content = data.choices?.[0]?.message?.content;
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = fallbackResponse;
    }

    // Banned Jargon Strict Removal Sanitizer
    const bannedJargon = ["연출한다", "신비로운", "환상적인", "기류", "파동", "우주의", "운명적인", "찬란한", "필연적인", "깊은 통찰", "새로운 문이 열린다", "빛을 발한다"];
    let jsonString = JSON.stringify(parsedContent);
    bannedJargon.forEach(word => {
      jsonString = jsonString.replaceAll(word, "");
    });
    const cleanedContent = JSON.parse(jsonString);

    return res.status(200).json({
      success: true,
      source: 'openrouter',
      model: 'google/gemini-2.5-flash',
      ...cleanedContent
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
