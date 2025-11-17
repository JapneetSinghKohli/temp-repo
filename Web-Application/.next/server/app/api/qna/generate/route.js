"use strict";(()=>{var e={};e.id=929,e.ids=[929],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},59994:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>h,patchFetch:()=>f,requestAsyncStorage:()=>p,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>d});var o={};r.r(o),r.d(o,{POST:()=>l});var n=r(49303),i=r(88716),a=r(60670),s=r(87070),c=r(69503);async function l(e){try{let{topic:t,questionFormat:r}=await e.json();if(!t||"string"!=typeof t)return s.NextResponse.json({error:"Topic is required"},{status:400});if(!r||!["mcq","subjective","mathematical"].includes(r))return s.NextResponse.json({error:"Valid question format is required (mcq, subjective, or mathematical)"},{status:400});let o=process.env.GEMINI_API_KEY,n=process.env.GOOGLE_SEARCH_API_KEY,i=process.env.GOOGLE_SEARCH_ENGINE_ID;if(!o)return s.NextResponse.json({error:"Gemini API key not configured"},{status:500});let a=await (0,c.U)(t,r,o,n,i);if(!a||0===a.length)return s.NextResponse.json({error:"No questions could be generated for this topic"},{status:400});return s.NextResponse.json({questions:a,success:!0,topic:t,format:r})}catch(e){return console.error("Error in generate API:",e),s.NextResponse.json({error:"Failed to generate questions",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}let u=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/qna/generate/route",pathname:"/api/qna/generate",filename:"route",bundlePath:"app/api/qna/generate/route"},resolvedPagePath:"C:\\Users\\Japne\\Desktop\\smarts\\temp-repo\\Web-Application\\app\\api\\qna\\generate\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:p,staticGenerationAsyncStorage:d,serverHooks:m}=u,h="/api/qna/generate/route";function f(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:d})}},69503:(e,t,r)=>{r.d(t,{T:()=>c,U:()=>l});var o=r(34248),n=r(20147),i=r(51592),a=r(20402);let s=(e,t)=>new n.XQ({name:"google_search",description:"Search Google for current information about academic topics and educational content. Use this to find relevant, up-to-date information about any topic.",schema:i.object({query:i.string().describe("The search query for academic or educational content")}),func:async({query:r})=>{try{let o=`https://www.googleapis.com/customsearch/v1?key=${e}&cx=${t}&q=${encodeURIComponent(r)}`,n=await fetch(o),i=await n.json();if(i.items&&i.items.length>0)return i.items.slice(0,5).map(e=>`Title: ${e.title}
Snippet: ${e.snippet}
Source: ${e.link}`).join("\n\n---\n\n");return"No results found for this query."}catch(e){return console.error("Search error:",e),"Error performing search. Please try again."}}});async function c(e,t){try{if(!t)throw Error("Gemini API key is required");if(!e||0===e.trim().length)throw Error("Lecture content is required");let r=new o.q({apiKey:t,temperature:.7,model:"gemini-2.0-flash-exp"}),n=a.ks.fromTemplate(`You are an expert educational content analyzer specializing in identifying key topics for assessment.

Analyze the following lecture content and identify 5-7 distinct topics that would be excellent for generating quiz questions.

LECTURE CONTENT:
{lectureContent}

REQUIREMENTS:
1. Topics should be specific and focused (not too broad)
2. Cover different aspects and difficulty levels of the content
3. Include both fundamental concepts and practical applications
4. Be relevant to students learning this material
5. Be suitable for generating assessment questions

CRITICAL: Respond ONLY with a valid JSON array of strings. No explanation, no markdown, just the array.

Example format:
{{["Topic Name 1", "Topic Name 2", "Topic Name 3", "Topic Name 4", "Topic Name 5"]}}

JSON Response:`),i=await n.format({lectureContent:e.substring(0,8e3)}),s=(await r.invoke(i)).content.toString().trim();try{let e=s.replace(/```json\s*/g,"").replace(/```\s*/g,"").match(/\[[\s\S]*\]/);if(e){let t=JSON.parse(e[0]);if(Array.isArray(t)&&t.length>0)return t.filter(e=>"string"==typeof e&&e.trim().length>0)}return console.error("Could not parse topics from response:",s),[]}catch(e){return console.error("Error parsing topics JSON:",e),console.error("Response was:",s),[]}}catch(e){throw console.error("Error recommending topics:",e),e}}async function l(e,t,r,n,i){try{if(!r)throw Error("Gemini API key is required");if(!e||0===e.trim().length)throw Error("Topic is required");let c=new o.q({apiKey:r,temperature:.7,model:"gemini-2.0-flash-exp"}),l="";"mcq"===t?l=`
Generate 3-5 high-quality Multiple Choice Questions (MCQ).

For EACH question, provide:
{{
  "id": "unique_id",
  "question": "Clear, specific question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "explanation": "Detailed explanation of why the correct answer is right and why others are wrong"
}}

RULES:
- All 4 options must be plausible
- Only ONE option should be clearly correct
- Correct answer index is 0-based (0=A, 1=B, 2=C, 3=D)
- Explanation should be educational and thorough
- Questions should test understanding, not just memorization`:"subjective"===t?l=`
Generate 3-5 thought-provoking Subjective Questions.

For EACH question, provide:
{{
  "id": "unique_id",
  "question": "Open-ended question requiring explanation or analysis",
  "solution": "Comprehensive model answer with key points, explanations, and examples"
}}

RULES:
- Questions should encourage critical thinking
- Solutions should be detailed and educational
- Include relevant examples and explanations
- Cover different aspects of the topic`:"mathematical"===t&&(l=`
Generate 3-5 Mathematical Problems.

For EACH problem, provide:
{{
  "id": "unique_id",
  "question": "Clear mathematical problem statement with necessary information",
  "solution": "Step-by-step solution showing all work and reasoning"
}}

RULES:
- Problems should be solvable with provided information
- Solutions must show all steps clearly
- Include formulas and calculations
- Explain the reasoning at each step`);let u="";if(n&&i)try{let r=s(n,i),o=`${e} educational content ${"mcq"===t?"multiple choice questions":"subjective"===t?"subjective questions":"mathematical problems"}`;u=await r.func({query:o})}catch(e){console.error("Search failed, continuing without search context:",e)}let p=a.ks.fromTemplate(`You are an expert educational content creator.

Topic: {topic}

${u?`Reference Information from web search:
${u}

Use this information to create accurate, well-informed questions.

`:""}${l}

CRITICAL: Respond ONLY with a valid JSON array. No explanation, no markdown, just the array.

JSON Response:`),d=await p.format({topic:e}),m=(await c.invoke(d)).content.toString();return function(e){try{let t=e.trim(),r=(t=t.replace(/```json\s*/g,"").replace(/```\s*/g,"")).match(/\[[\s\S]*\]/);if(r){let e=JSON.parse(r[0]);if(Array.isArray(e)&&e.length>0)return e.map((e,t)=>({...e,id:e.id||`q_${t+1}`}))}return console.error("Could not parse questions from response:",e),[]}catch(t){return console.error("Error parsing questions JSON:",t),console.error("Response was:",e),[]}}(m)}catch(e){throw console.error("Error generating Q&A:",e),e}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[276,983,376],()=>r(59994));module.exports=o})();