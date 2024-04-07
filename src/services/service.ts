export const fetchRemindItem = async (): Promise<remindItem[]> => {
  // directionに応じた送信処理
  // 確認してほしい忘れ物はDBに登録される
  // 確認済みのフラグがついているもの以外を一通り取得
  // 一旦モック
  return [
    {
      id: 1,
      url: "https://picsum.photos/300/400",
    },
    {
      id: 2,
      url: "https://picsum.photos/300/400",
    },
    {
      id: 3,
      url: "https://picsum.photos/300/400",
    },
    {
      id: 4,
      url: "https://picsum.photos/300/400",
    },
    {
      id: 5,
      url: "https://picsum.photos/300/400",
    },
  ];
};

export const postXXA = async () => {};
export const postXXB = async () => {};
