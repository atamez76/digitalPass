export const Structure = [
  {
    field: {
      fieldType: "input",
      label: "Title",
      id: "title",
      name: "title",
      type: "text",
      reguired: true,
    },
  },
  {
    field: {
      fieldType: "input",
      label: "Sub Title",
      id: "sub_title",
      name: "sub_title",
      type: "text",
      reguired: true,
    },
  },
  {
    field: {
      fieldType: "input",
      label: "Date",
      id: "date",
      name: "date",
      type: "date",
      reguired: true,
    },
  },
  {
    field: {
      fieldType: "file",
    },
  },
  {
    field: {
      fieldType: "text-area",
      label: "Description",
      id: "description",
      name: "description",
      rows: 5,
      cols: 4,
    },
  },
];
