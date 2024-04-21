import axios from 'axios';

const BASE_URL = 'https://yuchami-tinder-app.fly.dev';

export const fetchRemindItem = async (): Promise<RemindItem[]> => {
  const response = await axios.get(`${BASE_URL}/viewer/remindItemLists`);
  console.log(response.data[0].remind_items);
  return response.data[0].remind_items;
};

export const postConfirmation = async (item: RemindItem) => {
  const response = await axios.patch(
    `${BASE_URL}/viewer/remindItems/${item.id}`,
    {
      ...item,
      status: '確認完了',
    },
  );
  return;
};
export const postProblem = async (item: RemindItem) => {
  const response = await axios.patch(
    `${BASE_URL}/viewer/remindItems/${item.id}`,
    {
      ...item,
      status: 'トラブルあり',
    },
  );
  return;
};
