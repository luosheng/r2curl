import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import * as shelljs from 'shelljs';
// tslint:disable-next-line:import-name
import r2curl from '../index';

const log = debug('r2curl:tc:default');

describe('default', () => {
  test('AxiosResponse params will success', async done => {
    const { devDependencies } = require('../../package.json');
    const axiosVersion = (devDependencies.axios as string).replace('^', '');

    const request = await axios.get('https://example.com');
    const curl = r2curl(request);

    log(curl);

    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe(
      // tslint:disable-next-line:max-line-length
      `curl -X GET 'https://example.com' -H 'Accept:application/json, text/plain, */*' -H 'User-Agent:axios/${axiosVersion}'`,
    );

    done();
  });
  test('AxiosRequestConfig params will success', async done => {
    const config: AxiosRequestConfig = {
      url: 'https://example.com',
      method: 'POST',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
      params: {
        query: 'test',
        array: ['a', 'b'],
        object: {
          c: 'd',
        },
      },
      headers: {
        'content-Type': 'application/json',
      },
    };

    const curl = r2curl(config);
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe(
      // tslint:disable-next-line: max-line-length
      'curl -X POST \'https://example.com?query=%22test%22&array=%5B%22a%22%2C%22b%22%5D&object=%7B%22c%22%3A%22d%22%7D\' -H \'content-Type:application/json\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\'',
    );
    done();
  });
});
