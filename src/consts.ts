export type Tlink = {
    id: string;
    name: string;
    url: string;
    description: string;
};

export type Tsection = {
    id: string;
    name: string;
    links: Tlink[];
};

export type Tdata = {
    sections: Tsection[];
};

export type TdraggableData =
    | {
          type: 'section';
          data: Tsection;
      }
    | {
          type: 'link';
          data: Tlink;
          parentSectionId: string;
      };
