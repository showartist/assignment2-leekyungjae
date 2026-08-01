// Vercel Serverless Function: OpenRouter AI Pure Visual Fact Fortune Generation
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

    if (!apiKey || apiKey.includes('YOUR_OPENROUTER_API_KEY')) {
      return res.status(200).json({
        success: true,
        source: 'smart-fallback',
        headline: `지금 당신을 흔드는 것은 실제 사건보다, 아직 확인되지 않은 가능성을 머릿속에서 키우는 마음입니다.`,
        observations: [
          {
            position: "과거",
            visibleFact: cards && cards[0] ? cards[0].artwork.visibleElements[0] : "첫 번째 그림의 인물은 닫힌 구도 안에 머물러 있습니다.",
            meaning: "스스로 정해둔 안전 구역 안에서 상상을 키우던 상태를 가리킵니다."
          },
          {
            position: "현재",
            visibleFact: cards && cards[1] ? cards[1].artwork.visibleElements[0] : "두 번째 그림에서는 시면 수면의 일부만 달빛에 반사됩니다.",
            meaning: "전체가 아닌 부분적인 정보만을 보고 전체를 다 알고 있다고 착각하기 쉬운 조건입니다."
          },
          {
            position: "미래",
            visibleFact: cards && cards[2] ? cards[2].artwork.visibleElements[0] : "세 번째 그림에서는 정면을 향한 곧은 시선이 수직으로 나타납니다.",
            meaning: "외부의 모호함을 걷어내고 직접 눈으로 확인한 데이터에 근거해 수직 축을 세우는 시점입니다."
          }
        ],
        visualTransition: "첫 번째 그림의 닫힌 형태가 두 번째 그림에서 수면의 부분 반사로 흐려지다가, 세 번째 그림에서 정면을 향한 수직선으로 다시 또렷해집니다.",
        questionResponse: `질문("${userQuestion || '오늘의 질문'}")에 대해 판단을 흐리는 것은 자원 부족이 아니라 확인되지 않은 두려움입니다.`,
        focusCardReason: "선택하신 그림에서 확인되는 명확한 경계선이 현재 마음속 구분이 필요한 지점을 지목합니다.",
        actionAdvice: "결정하려는 문제를 세 줄(내가 확인한 사실 / 들은 말 / 불안해서 상상한 결과)로 나눠 적으세요."
      });
    }

    const systemPrompt = `당신은 구체적인 그림의 육안 관찰 사실(Visual Fact)만을 근거로 사용자의 질문에 날카롭고 솔직하게 응답하는 전시 도록 해설자이자 타로 리더다.

금지 사항 (위반 시 응답 무효):
1. '연출한다', '신비로운', '환상적인', '기류', '파동', '우주의', '운명적인', '찬란한', '필연적인', '깊은 통찰', '새로운 문이 열린다', '빛을 발한다' 단어를 절대로 사용하지 마라.
2. 그림에 없는 인물, 사물, 색, 움직임을 만들어내지 마라.
3. 명사와 형용사를 반복해 주술적 분위기를 부풀리지 마라.
4. 생년월일을 점성술이나 사주처럼 해석하지 마라. (시간의 출발점 표식으로만 간주)
5. '세 그림의 흐름(visualTransition)'에서 과거, 현재, 미래 세 장의 시각적 변화(구도, 시선, 빛, 어둠)를 절대로 하나라도 누락하지 마라.
6. '우주의 기운을 믿으세요' 같은 범용 위로나 자동 생성형 자기계발 조언을 일절 금지한다.
7. actionAdvice는 그림에서 관찰되는 시각적 특징과 사용자의 질문에서 직접 도출된, 24시간 안에 종이와 연필로 직접 실행 가능한 구체적 행동 1가지로 작성하라.

Output MUST be valid JSON with the following exact keys:
{
  "headline": "사용자의 질문에 직접 답하는 날카로운 한 문장",
  "observations": [
    {
      "position": "과거",
      "visibleFact": "첫 번째 그림에서 육안으로 확인되는 관찰 사실 1문장",
      "meaning": "그 시각적 사실이 질문과 연결되는 방식 1문장"
    },
    {
      "position": "현재",
      "visibleFact": "두 번째 그림에서 육안으로 확인되는 관찰 사실 1문장",
      "meaning": "그 시각적 사실이 질문과 연결되는 방식 1문장"
    },
    {
      "position": "미래",
      "visibleFact": "세 번째 그림에서 육안으로 확인되는 관찰 사실 1문장",
      "meaning": "그 시각적 사실이 질문과 연결되는 방식 1문장"
    }
  ],
  "visualTransition": "첫 그림부터 세 번째 그림까지 인물·구도·시선·빛과 어둠이 어떻게 변하는지 (3개 그림 모두 서사 포함)",
  "questionResponse": "사용자의 질문에 대한 명확하고 단호한 판단 응답 (2문장)",
  "focusCardReason": "사용자가 선택한 그림의 시각적 구도가 현재 마음 상태와 연결되는 이유 1문장",
  "actionAdvice": "24시간 안에 연필과 종이로 실행 가능한 구체적 행동 한 가지 (1-2문장)"
}`;

    const userPrompt = `시간 좌표(생년월일): "${birthDate || '미입력'}", 마음속 질문: "${userQuestion || '오늘의 질문'}", 선택된 모드: ${mode}, 터치하여 시선이 머문 카드 인덱스: ${focusCardIndex}, 세 카드 시각 데이터: ${JSON.stringify(cards || [])}`;

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
        temperature: 0.6,
        response_format: { type: 'json_object' }
      })
    });

    if (!openRouterResponse.ok) {
      const errText = await openRouterResponse.text();
      console.error("OpenRouter API error:", errText);
      return res.status(500).json({ error: 'OpenRouter API Error', details: errText });
    }

    const data = await openRouterResponse.json();
    const content = data.choices?.[0]?.message?.content;
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = {
        headline: "실제 확인된 사실과 두려움으로 상상한 결과를 분리하십시오.",
        observations: [
          { position: "과거", visibleFact: "첫 번째 그림의 인물은 닫힌 구도에 있습니다.", meaning: "기존 관성에 머물러 있던 상태입니다." },
          { position: "현재", visibleFact: "두 번째 그림은 부분적인 빛만 드러냅니다.", meaning: "전체가 아닌 일부분만 보고 판단하려는 상태입니다." },
          { position: "미래", visibleFact: "세 번째 그림은 전면을 뚫어지게 응시합니다.", meaning: "직접 눈으로 확인한 데이터로 수직 축을 세우는 시점입니다." }
        ],
        visualTransition: "첫 번째 그림의 정적 구도가 두 번째 그림의 부분 빛으로 흐려졌다가 세 번째 그림의 곧은 시선으로 굳건해집니다.",
        questionResponse: `질문("${userQuestion || '오늘의 질문'}")에 대해 지금 판단을 흐리는 것은 정보 부족이 아니라 확인되지 않은 두려움입니다.`,
        focusCardReason: "선택하신 그림에서 확인되는 명확한 경계선이 현재 마음속 구분이 필요한 지점을 지목합니다.",
        actionAdvice: "오늘 질문과 관련된 내용을 사실 / 들은 말 / 불안한 추측 3줄로 나눠 적으세요."
      };
    }

    // Banned Jargon Strict Removal Filter
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
    console.error("Serverless Function Error:", err);
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};
