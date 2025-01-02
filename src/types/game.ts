export type Game = {
  id: string;
  name: string;
  elementMain: boolean;
  imageFormats: {
    name: string;
    transforms: {
      key: string;
      params: (string | number)[];
    }[];
  }[];
};
