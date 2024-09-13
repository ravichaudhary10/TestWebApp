import taData from "./data/taData.json";

class TAMockService {
  static getTA(userId: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = [...taData];
        const response = { data, totalRecords: data.length };

        resolve(response);
      }, 1000);
    });
  }
}

export default TAMockService;
