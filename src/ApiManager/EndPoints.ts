const END_POINTS = {
  GET_DEALS: () => {
    return `/deals`;
  },

  GET_STAGES: () => {
    return `/stages`;
  },

  GET_TA: (userId: string) => {
    let url = `/ta?userId=${userId}`;

    return url;
  },
};

export default END_POINTS;
