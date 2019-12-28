export interface Options {
  code: string;
}

export const defaults: Options = {
  code: `(data) => {
    return {
      layout: {},
      data: [{
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter'
      }]
    }
  }`,
};
