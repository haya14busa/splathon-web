import * as api from '@/swagger/splathon-api/api';
import { Configuration } from '@/swagger/splathon-api/configuration';

const CONFIG: Configuration = (() => {
  if (process.env.VUE_APP_SPLATHON_API_BASE_PATH) {
    return {
      basePath: process.env.VUE_APP_SPLATHON_API_BASE_PATH,
    };
  }
  return null;
})();

export const AdminApi = new api.AdminApi(CONFIG);
export const ResultApi = new api.ResultApi(CONFIG);
export const DefaultApi = new api.DefaultApi(CONFIG);
export const RankingApi = new api.RankingApi(CONFIG);
