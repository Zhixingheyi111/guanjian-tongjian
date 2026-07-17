import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildLocalConsultation, buildConsultationContext } from './src/data/tongjian/consultation.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 20_000) {
        reject(new Error('request-too-large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('invalid-json'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function extractOutputText(response) {
  if (typeof response.output_text === 'string') return response.output_text;
  return response.output
    ?.flatMap((item) => item.content || [])
    .map((content) => content.text || '')
    .join('')
    .trim();
}

function parseJsonText(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

async function createAiConsultation(problem) {
  const apiKey = process.env.OPENAI_API_KEY;
  const localResult = buildLocalConsultation(problem, apiKey ? 'fallback' : 'local');

  if (!apiKey) {
    return {
      ...localResult,
      aiStatus: 'missing-key',
    };
  }

  const context = buildConsultationContext(problem);
  const model = process.env.OPENAI_MODEL || 'gpt-5.5';
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      reasoning: { effort: 'low' },
      input: [
        {
          role: 'developer',
          content:
            '你是“观鉴”的参事助手。只能依据提供的《资治通鉴》事件、司马光评价和处世方法分析用户处境。不要编造未提供的历史材料。不要替用户做绝对决定；给出稳妥的行动框架、可说的话、风险提醒。用中文，返回严格 JSON。',
        },
        {
          role: 'user',
          content: JSON.stringify({
            userProblem: problem,
            context,
            requiredJsonShape: {
              title: '一句话判断',
              summary: '这件事的处世分类和核心判断',
              category: '处世分类',
              advice: {
                read: '对应历史事件给我们的提醒',
                similarity: '用户处境与历史事件真正相似的结构',
                difference: '现实与历史之间不能直接类比的差异和边界',
                steps: ['具体步骤1', '具体步骤2', '具体步骤3'],
                words: ['可以这样说1', '可以这样说2', '可以这样说3'],
                avoid: ['先不要做什么'],
                reflection: '今天先练的一句话或一个动作',
              },
            },
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    return {
      ...localResult,
      aiStatus: 'api-error',
    };
  }

  const data = await response.json();
  const text = extractOutputText(data);
  const aiResult = parseJsonText(text);

  if (!aiResult) {
    return {
      ...localResult,
      aiStatus: 'parse-error',
      aiText: text,
    };
  }

  return {
    ...localResult,
    ...aiResult,
    context,
    mode: 'ai',
    aiStatus: 'ok',
    model,
  };
}

function guanjianConsultApi() {
  const handler = async (req, res, next) => {
    const pathname = req.url?.split('?')[0];
    if (pathname !== '/api/consult' || req.method !== 'POST') {
      next();
      return;
    }

    try {
      const body = await readJsonBody(req);
      const problem = typeof body.problem === 'string' ? body.problem.trim() : '';

      if (problem.length < 6) {
        sendJson(res, 400, { error: '请至少写 6 个字，让我知道事情的大概。' });
        return;
      }

      const result = await createAiConsultation(problem.slice(0, 1200));
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 500, {
        error: error.message === 'request-too-large' ? '问题太长，请先压缩到 1200 字以内。' : '参事接口暂时不可用。',
      });
    }
  };

  return {
    name: 'guanjian-consult-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/guanjian-tongjian/' : '/',
  plugins: [react(), guanjianConsultApi()],
});
