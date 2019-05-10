import axios from 'axios';
import qs from 'qs';

const isDev = process.env.NODE_ENV === 'development';

const fetch = axios.create({
  timeout: 30000,
  baseURL: isDev ? '/mock' : '',
  transformRequest: [(data) => {
    // TODO 这里统一做发送处理
    return qs.stringify(data);
  }],
  transformResponse: [(data) => {
    const parseData = JSON.parse(data);
    if (!parseData.success) {
      // TODO 这里可以做统一失败处理
    }
    return parseData;
  }],
})

export default fetch;
