export type T_Link = {
    id: string;
    name: string;
    url: string;
    description: string;
};

export type T_Section = {
    id: string;
    name: string;
    links: T_Link[];
};

export type T_Data = {
    sections: T_Section[];
};

export type T_DraggableData =
    | {
          type: 'section';
          data: T_Section;
      }
    | {
          type: 'link';
          data: T_Link;
          parentSectionId: string;
      };
