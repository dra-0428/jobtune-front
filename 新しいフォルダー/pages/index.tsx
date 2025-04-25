
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const questions = [
  "私は人と一緒にいると元気が出る",
  "私は会話をリードすることが多い",
  "私は注目されることが好きだ",
  "私は大勢の場でも臆せず話せる",
  "私は初対面の人ともすぐ打ち解ける",
  "私は活発でエネルギッシュな方だ",
  "私は人の意見に耳を傾ける",
  "私は争いごとを避けたいと思う",
  "私は親切で思いやりがある",
  "私は困っている人を放っておけない",
  "私は礼儀正しさを大切にしている",
  "私は人を疑うより信じる方だ",
  "私は計画的に行動する",
  "私は整理整頓が得意だ",
  "私は責任感が強い方だ",
  "私は物事を最後までやり遂げる",
  "私は遅刻や忘れ物をほとんどしない",
  "私は目標に向けて努力できる",
  "私はストレスに冷静に対処できる",
  "私は感情の起伏が少ない",
  "私はネガティブな気分を引きずらない",
  "私は焦らず落ち着いて行動できる",
  "私は自分に自信がある",
  "私はめったに不安を感じない",
  "私は新しいアイデアに興味がある",
  "私は芸術や自然に感動することが多い",
  "私は常に学び続けたいと思っている",
  "私は想像力が豊かだと言われる",
  "私は多様な価値観を受け入れられる",
  "私は枠にとらわれない発想をする",
  "私は長期的な目標に向けて努力し続けられる",
  "私は困難があっても粘り強く取り組む",
  "私は失敗してもあきらめない",
  "私は一度決めたことを途中で投げ出さない",
  "私は簡単に気が変わる方ではない",
  "私は継続的に自分を高めようとしている"
];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('jobtune_answers')) {
      localStorage.removeItem('jobtune_answers');
    }
  }, []);

  const handleAnswer = (value: number) => {
    const updated = [...answers, value];
    setAnswers(updated);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setShowResult(true);
      localStorage.setItem('jobtune_answers', JSON.stringify(updated));
    }
  };

  const goToResult = () => {
    router.push('/result');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fffaf5', fontFamily: 'Noto Sans JP' }}>
      <h1 style={{ color: '#ff69b4' }}>ジョブチューニング</h1>
      {!showResult ? (
        <div>
          <p>Q{step + 1}. {questions[step]}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['まったく当てはまらない', 'あまり当てはまらない', 'どちらともいえない', 'やや当てはまる', 'とても当てはまる'].map((label, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx + 1)}>{label}</button>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>チューン「あと {questions.length - step - 1}問だよ、焦らず行こう〜♪」</p>
        </div>
      ) : (
        <div>
          <h2>全問完了！</h2>
          <p>チューン「おつかれさま！診断結果を見てみよう！」</p>
          <button onClick={goToResult}>診断結果を見る</button>
        </div>
      )}
    </div>
  );
}
