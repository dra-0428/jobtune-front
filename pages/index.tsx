
import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    "新しいことにワクワクしますか？",
    "計画通りに物事を進めるのが得意ですか？",
    "周囲と協力して物事を進めるのが好きですか？"
  ];

  const handleSelect = (value: number) => {
    setAnswers([...answers, value]);
    setStep(step + 1);
  };

  const renderQuestion = () => (
    <div>
      <p>質問{step + 1}: {questions[step]}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button onClick={() => handleSelect(1)}>まったく当てはまらない</button>
        <button onClick={() => handleSelect(2)}>あまり当てはまらない</button>
        <button onClick={() => handleSelect(3)}>どちらともいえない</button>
        <button onClick={() => handleSelect(4)}>やや当てはまる</button>
        <button onClick={() => handleSelect(5)}>とても当てはまる</button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div>
      <h2>診断完了（仮）</h2>
      <p>回答スコア: {answers.join(", ")}</p>
      <p>※今後、職業マッチングに使用されます</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Noto Sans JP' }}>
      <h1>ジョブチューニング（JobTune）</h1>
      {step < questions.length ? renderQuestion() : renderResult()}
    </div>
  );
}
