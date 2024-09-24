const END_POINTS = {
  FETCH_DEALS: () => {
    return `/deals`;
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
};

export default END_POINTS;
