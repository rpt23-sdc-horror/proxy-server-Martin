import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // below normal load
    { duration: "1m", target: 100 },
    { duration: "10s", target: 1400 }, // spike to 1400 users
    { duration: "2m", target: 3500 }, // stay at 1400 for 3 minutes
    { duration: "10s", target: 100 }, // scale down. Recovery stage.
    { duration: "3m", target: 100 },
    { duration: "10s", target: 0 },
  ],
};
export default function () {
  const BASE_URL = 'http://54.219.247.248:4000'; // make sure this is not production

  const responses = http.batch([
    [
      'GET',
      `${BASE_URL}/shop/${Math.floor(Math.random() * 900)}/1`,
      null,
      null,
    ],
  ]);

  sleep(1);
}
