const END_POINTS = {
  FETCH_DEALS: () => {
    return `/deals/list`;
  },

  FETCH_STAGES: () => {
    return `/stages`;
  },

  FETCH_TA: () => {
    let url = `/therapeutic-areas`;

    return url;
  },

  FETCH_LINE_FUNCTIONS: () => {
    return `/line-functions`;
  },

  LOGIN: () => {
    return `/login`;
  },

  SEARCH_PERSON: () => {
    return `/search-person`;
  },

  CREATE_DEAL: () => {
    return `/deals/create`;
  },

  UPDATE_DEAL: (id: number) => {
    return `/deals/${id}`;
  },

  DELETE_DEAL: (id: number) => {
    return `/deals/${id}`;
  },
};

export default END_POINTS;