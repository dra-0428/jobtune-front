
import { useState } from 'react';

export default function Home() {
  const questions = [
    "新しいことにワクワクしますか？",
    "計画通りに物事を進めるのが得意ですか？",
    "周囲と協力して物事を進めるのが好きですか？",
    "困難があってもやり抜こうとしますか？",
    "目標に向かってコツコツ努力する方ですか？",
    "未知のものへの興味は強い方ですか？",
    "細かい作業や整理整頓が得意ですか？",
    "感情を安定させやすい方ですか？",
    "人と話すことが好きですか？",
    "他人の立場に共感しやすい方ですか？"
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    setAnswers([...answers, score]);
    setStep(step + 1);
  };

  const renderQuestion = () => (
    <div>
      <p>質問 {step + 1} / {questions.length}</p>
      <p>{questions[step]}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button onClick={() => handleAnswer(1)}>まったく当てはまらない</button>
        <button onClick={() => handleAnswer(2)}>あまり当てはまらない</button>
        <button onClick={() => handleAnswer(3)}>どちらともいえない</button>
        <button onClick={() => handleAnswer(4)}>やや当てはまる</button>
        <button onClick={() => handleAnswer(5)}>とても当てはまる</button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div>
      <h2>診断結果（仮）</h2>
      <p>あなたの回答スコア：{answers.join(", ")}</p>
      <p>※正式な職業提案はバックエンド連携後に反映予定です</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Noto Sans JP' }}>
      <h1>ジョブチューニング（JobTune）</h1>
      {step < questions.length ? renderQuestion() : renderResult()}
    </div>
  );
}
