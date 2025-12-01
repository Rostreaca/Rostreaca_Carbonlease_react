import axios from "axios";
import { xml2json } from "xml-js";

const cache = {};
const CACHE_DURATION = 1000 * 60 * 30; // 30분 캐시
let lastAirCallTime = 0;

const RATE_LIMIT = 1500;

export const fetchAirAPI = async (region) => {
  const now = Date.now();

  if (now - lastAirCallTime < RATE_LIMIT) {
    console.warn("요청과다 => rate limit으로 막힘");
    return null;
  }
  lastAirCallTime = now;

  const cacheKey = `air-${region}`;

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
    sidoName: "서울",
    stationName: region,
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
