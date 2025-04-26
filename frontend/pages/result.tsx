import React from "react";

const Result = ({ answers }: { answers: number[] }) => {
    const scoreObj: { [key: string]: number[] } = {};

    const factorMap = [
        "外向性", "協調性", "勤勉性", "情緒安定性", "開放性", "Grit"
    ];

    factorMap.forEach((factor, idx) => {
        if (!scoreObj[factor]) {
            scoreObj[factor] = [];
        }
        scoreObj[factor].push(answers[idx]);
    });

    const averaged = Object.fromEntries(
        Object.entries(scoreObj).map(([factor, scores]) => [
            factor,
            scores.reduce((a, b) => a + b, 0) / scores.length,
        ])
    );

    return (
        <div>
            <h1>診断結果</h1>
            {Object.entries(averaged).map(([factor, score]) => (
                <div key={factor}>
                    <strong>{factor}:</strong> {score.toFixed(2)}
                </div>
            ))}
        </div>
    );
};

export default Result;
