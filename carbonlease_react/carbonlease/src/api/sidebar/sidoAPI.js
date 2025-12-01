import axios from "axios";
import { xml2json } from "xml-js";

const cache = {};
const CACHE_DURATION = 1000 * 60 * 30; // 30분 캐시
let lastSidoCallTime = 0;

const RATE_LIMIT = 1500;

export const fetchSidoAPI = async (sido) => {
  const now = Date.now();
  
  if (now -lastSidoCallTime < RATE_LIMIT) {
    console.warn("요청 과다 => rate limit으로 막힘");
    return null;
  }
  lastSidoCallTime = now;

  const cacheKey = `sido-${sido}`;

  if (cache[cacheKey] && now - cache[cacheKey].time < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  // API 요청
  const url =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  const params = {
    serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
    returnType: "xml",
    numOfRows: 100,
    pageNo: 1,
    sidoName: sido,
    ver: "1.0",
  };

  const res = await axios.get(url, { params, responseType: "text" });
  const json = JSON.parse(xml2json(res.data, { compact: true }));

  // 캐시 저장
  cache[cacheKey] = {
    time: Date.now(),
    data: json,
  };

  return json;
};
