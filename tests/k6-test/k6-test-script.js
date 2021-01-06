import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '2m', target: 0 },
  ],
};
export default function () {
  const BASE_URL = 'http://localhost:4000'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/shop/${Math.floor(Math.random() * 9000)}/${Math.floor(
        Math.random() * 6
      ) + 1}`,
      null,
      null,
    ],
  ]);

  sleep(1);
}
