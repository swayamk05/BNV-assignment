export const buildQueryParams = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value) && value.length === 0) {
      return;
    }

    query.set(key, value);
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};
