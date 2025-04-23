
import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(0);
  const handleNext = () => setStep(step + 1);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Noto Sans JP' }}>
      {step === 0 && (
        <div>
          <h1>ようこそ、ジョブチューニングへ！</h1>
          <p>マスコット「チューン」がご案内します。</p>
          <button onClick={handleNext}>診断を開始</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <p>質問1: あなたは新しいことにワクワクしますか？</p>
          <button onClick={handleNext}>はい</button>
          <button onClick={handleNext}>いいえ</button>
        </div>
      )}
    </div>
  );
}
