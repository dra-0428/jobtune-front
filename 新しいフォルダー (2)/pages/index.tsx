
import { useState } from 'react';

export default function Home() {
  const questions = Array.from({ length: 36 }, (_, i) => `質問 ${i + 1}：これは例の質問です（内容は精密設計に基づいて構成）`);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResults = () => {
    // スコア処理は仮。実際は因子ごとに分配。
    const avg = answers.reduce((sum, v) => sum + v, 0) / answers.length;
    return avg;
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fffaf5', fontFamily: 'Noto Sans JP' }}>
      <h1 style={{ color: '#ff69b4' }}>ようこそ！ジョブチューニングへ</h1>
      {!showResult ? (
        <div>
          <p>{questions[step]}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map(level => (
              <button key={level} onClick={() => handleAnswer(level)}>
                {['まったく当てはまらない','あまり当てはまらない','どちらともいえない','やや当てはまる','とても当てはまる'][level-1]}
              </button>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>チューン「あと{questions.length - step - 1}問！がんばってね！」</p>
        </div>
      ) : (
        <div>
          <h2>診断結果（仮）</h2>
          <p>あなたの平均スコア：{calculateResults().toFixed(2)}</p>
          <p>チューン「診断お疲れさま！キミにぴったりな仕事を紹介するよ〜」</p>
        </div>
      )}
    </div>
  );
}
