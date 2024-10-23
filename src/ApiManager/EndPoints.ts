const END_POINTS = {
  FETCH_DEALS: () => {
    return `/deals/list`;
  },

  FETCH_DEAL_DETAIL: (id: number) => {
    return `/deals/${id}`;
  },

  FETCH_RESOURCE_DETAIL: () => {
    return `/resources/detail`;
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

  FETCH_RESOURCES: () => {
    return `/resources/list`;
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

  DELETE_DEAL: (id: number, userId: number) => {
    return `/deals/${id}?userId=${userId}`;
  },

  ASSIGN_TA: () => {
    let url = `/therapeutic-areas/assign`;
    return url;
  },

  ADD_RESOURCES: () => {
    return `/resources/add`;
  },

  UPDATE_RESOURCE: () => {
    return `/resources/update`;
  },

  DELETE_RESOURCE: (dealId: number, stageId: number, resourceId: number) => {
    return `/resources/${resourceId}/stage/${stageId}/deal/${dealId}`;
  },
};

export default END_POINTS;
