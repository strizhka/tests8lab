import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    low_load: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
    high_load: {
      executor: 'constant-vus',
      vus: 50,
      duration: '10s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}