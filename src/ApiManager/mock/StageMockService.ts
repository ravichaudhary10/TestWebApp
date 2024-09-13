import stageData from "./data/stageData.json";

class StageMockService {
  static getStages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = [...stageData];
        const response = { data, totalRecords: data.length };

        resolve(response);
      }, 1000);
    });
  }
}

export default StageMockService;
