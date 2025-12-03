export const applyFilters = (
  list,
  { query = "", status = "all", risk = "all", sortBy = null }
) => {
  const q = query.trim().toLowerCase();
  let out = list.filter((m) => m.name.toLowerCase().includes(q));
  if (status !== "all") out = out.filter((m) => m.status === status);
  if (risk !== "all") out = out.filter((m) => m.riskLevel === risk);
  if (sortBy) {
    const dir = sortBy.dir === "asc" ? 1 : -1;
    out = out
      .slice()
      .sort((a, b) => dir * ((a[sortBy.field] || 0) - (b[sortBy.field] || 0)));
  }
  return out;
};
