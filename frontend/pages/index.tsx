import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>ジョブチューニングへようこそ！</h1>
      <p>あなたの性格やスキルにぴったりな職業を診断しよう！</p>
      <Link href="/result">診断スタート</Link>
    </div>
  );
}
