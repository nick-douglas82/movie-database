import { APISettings } from "../http-common";

class DataService {
  getTrending(): Promise<any> {
    // return fetch(`${APISettings.baseURL}/trending/all/day?api_key=e0c577647a14eae09f07aa14fee7caeb`, {
    //   method: "GET",
    //   headers: APISettings.headers,
    // }).then(function (response) {
    //   if (response.status != 200) {
    //     throw response.status;
    //   } else {
    //     return response.json();
    //   }
    // });
    return fetch("https://api.themoviedb.org/3/trending/all/day?api_key=e0c577647a14eae09f07aa14fee7caeb")
      .then((response) => response.json())
      .then((data) => data.results);
  }
}

export default new DataService();
