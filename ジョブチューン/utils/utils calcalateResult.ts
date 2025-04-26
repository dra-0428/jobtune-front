interface Result {
  career: string;
  personality: string;
  hobby: string;
  friendType: string;
}

export const calculateResult = (answers: number[]): Result => {
  const score = answers.reduce((acc, val) => acc + val, 0);

  let career = "";
  let personality = "";
  let hobby = "";
  let friendType = "";

  if (score <= 120) {
    career = "クリエイティブ系（デザイナー・ライターなど）";
    personality = "自由奔放・感受性豊か";
    hobby = "絵を描く、音楽制作、旅行";
    friendType = "好奇心旺盛なタイプ";
  } else if (score <= 150) {
    career = "技術系（エンジニア・研究職など）";
    personality = "論理的・探究心旺盛";
    hobby = "プログラミング、読書、パズル";
    friendType = "知的好奇心が高いタイプ";
  } else if (score <= 180) {
    career = "サービス系（営業・販売・接客など）";
    personality = "社交的・明るい";
    hobby = "スポーツ、カフェ巡り、アウトドア";
    friendType = "ポジティブで活動的なタイプ";
  } else {
    career = "管理・マネジメント系（マネージャー・人事など）";
    personality = "責任感が強く、リーダーシップがある";
    hobby = "ゴルフ、ビジネス書を読む、ネットワーキング";
    friendType = "落ち着きがあり、信頼できるタイプ";
  }

  return {
    career,
    personality,
    hobby,
    friendType,
  };
};