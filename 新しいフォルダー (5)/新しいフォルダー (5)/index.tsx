
import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  "新しいことに挑戦するのが好きだ",
  "知らない人ともすぐ打ち解ける",
  "計画的に物事を進めるのが得意だ",
  "ストレスに強い方だと思う",
  "芸術や文学に強く興味がある",
  "目標を決めたら最後までやり抜く",
  "周囲の人と協力するのが得意だ",
  "細かい作業をコツコツ続けられる",
  "失敗してもすぐ立ち直れる",
  "自分の感性を大切にしている",
  "リーダーシップをとるのが得意だ",
  "新しい友達を作るのが得意だ",
  "スケジュール管理が得意だ",
  "プレッシャーに負けにくい",
  "好奇心が旺盛だ",
  "困難な状況でも粘り強い",
  "人の話をよく聞き、共感できる",
  "ルールを守ることを重視する",
  "不安を感じても冷静に対処できる",
  "独創的なアイデアを出すのが好きだ",
  "チームの中心になって動くことが多い",
  "初対面でも自然に会話できる",
  "目標達成に向けて努力できる",
  "感情をコントロールできる",
  "新しい文化や価値観に興味がある",
  "諦めずに取り組む姿勢を持っている",
  "相手の立場に立って考えられる",
  "地道な努力を続けることができる",
  "緊張する場面でも実力を出せる",
  "発想力に自信がある",
  "グループをまとめるのが得意だ",
  "多くの人と関わるのが好きだ",
  "課題をコツコツこなすのが得意だ",
  "不安やストレスに強い方だ",
  "新しいアイデアを生み出すのが得意だ",
];

export default function Home() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(3));

  const handleAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    localStorage.setItem('jobtune_answers', JSON.stringify(answers));
    router.push('/result');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fffaf5', fontFamily: 'Noto Sans JP' }}>
      <h1 style={{ color: '#ff69b4' }}>ジョブチューニング 診断スタート！</h1>
      {questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '1.5rem' }}>
          <p>{idx + 1}. {q}</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleAnswer(idx, num)}
              style={{
                margin: '0 0.5rem',
                backgroundColor: answers[idx] === num ? '#ff69b4' : '#eee',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              {num}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '2rem',
          backgroundColor: '#ff69b4',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}
      >
        診断結果を見る
      </button>
    </div>
  );
}
