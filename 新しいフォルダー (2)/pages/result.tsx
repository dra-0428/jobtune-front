
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type ScoreMap = { [key: string]: number[] };

const factorMap = [
  "外向性","外向性","外向性","外向性","外向性","外向性",
  "協調性","協調性","協調性","協調性","協調性","協調性",
  "勤勉性","勤勉性","勤勉性","勤勉性","勤勉性","勤勉性",
  "情緒安定性","情緒安定性","情緒安定性","情緒安定性","情緒安定性","情緒安定性",
  "開放性","開放性","開放性","開放性","開放性","開放性",
  "やり抜く力","やり抜く力","やり抜く力","やり抜く力","やり抜く力","やり抜く力"
];

const jobSuggestions: { [key: string]: string[] } = {
  "外向性": ["営業職", "イベントプランナー", "販売員"],
  "協調性": ["介護士", "保育士", "看護師"],
  "勤勉性": ["会計士", "教師", "品質管理"],
  "情緒安定性": ["研究職", "図書館司書", "事務職"],
  "開放性": ["デザイナー", "作家", "研究開発"],
  "やり抜く力": ["起業家", "エンジニア", "アスリート"]
};

export default function Result() {
  const router = useRouter();
  const [scores, setScores] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('jobtune_answers');
    if (stored) {
      const answers: number[] = JSON.parse(stored);
      const scoreObj: ScoreMap = {};
      factorMap.forEach((factor: string, idx: number) => {
        if (!scoreObj[factor]) scoreObj[factor] = [];
        scoreObj[factor].push(answers[idx]);
      });
      const averaged: { [key: string]: string } = {};
      for (const key in scoreObj) {
        const vals = scoreObj[key];
        averaged[key] = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
      }
      setScores(averaged);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fffaf5', fontFamily: 'Noto Sans JP' }}>
      <h1 style={{ color: '#ff69b4' }}>ジョブチューニング - 診断結果</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. あなたに合う職業（例）</h2>
        <ul>
          {Object.entries(scores).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])).slice(0, 2).flatMap(([factor]) =>
            jobSuggestions[factor].map((job, i) => (
              <li key={`${factor}-${i}`}>{job}（{factor}が活かせる）</li>
            ))
          )}
        </ul>
        <p>チューン「キミの強みが活かせそうなお仕事をピックアップしたよ〜」</p>
      </section>

      <section>
        <h2>2. 性格タイプ（心理傾向）</h2>
        <ul>
          {Object.entries(scores).map(([factor, val]) => (
            <li key={factor}>{factor}：{val} / 5.00</li>
          ))}
        </ul>
        <p>チューン「心理的な特徴をもとにアドバイスしてみたよ〜」</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>3. 向いている趣味</h2>
        <p>
          {parseFloat(scores["開放性"] || "0") > 3.5 ? "旅行、写真、創作活動、博物館巡り" :
           parseFloat(scores["外向性"] || "0") > 3.5 ? "カフェ巡り、スポーツ、ボランティア、フェス" :
           "読書、散歩、音楽鑑賞、家庭菜園"}
        </p>
        <p>チューン「日常がもっと楽しくなるヒントだよ〜♪」</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>4. 相性の良い友達タイプ</h2>
        <p>
          {parseFloat(scores["協調性"] || "0") > 3.5 ? "思いやりのある温厚な人、聞き上手タイプ" :
           parseFloat(scores["外向性"] || "0") > 3.5 ? "明るくてエネルギッシュな人、好奇心旺盛なタイプ" :
           "落ち着いた人、共感してくれる人、支えてくれるタイプ"}
        </p>
        <p>チューン「人との出会いも未来を変えるかも〜」</p>
      </section>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Image src="/assets/mascot.png" alt="チューン" width={150} height={150} />
      </div>
    </div>
  );
}
