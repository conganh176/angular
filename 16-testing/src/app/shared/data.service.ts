export class DataService {
  getDetails() {
    const resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('data');
      }, 1500);
    });

    return resultPromise;
  }
}
