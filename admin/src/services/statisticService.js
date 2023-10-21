import { ADMIN_API, API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";
import queryLocation from "../utils/queryLocation";

const statisticService = {
  getYearAvailable() {
    return callWithToken(`${ADMIN_API}/statistic/getYear`);
  },
  getRevenues(options = { }) {
    let search = queryLocation.toString(options)
    return callWithToken(`${ADMIN_API}/statistic/?${search}`);
  },
};

export default statisticService;
