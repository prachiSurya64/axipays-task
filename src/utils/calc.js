export const totalVolume = (list) =>
  list.reduce((s, m) => s + (m.monthlyVolume || 0), 0);
export const avgSuccessRate = (list) =>
  list.length
    ? +(
        list.reduce((s, m) => s + (m.successRate || 0), 0) / list.length
      ).toFixed(2)
    : 0;
export const countByStatus = (list, status) =>
  list.filter((m) => m.status === status).length;
export const countByRisk = (list, risk) =>
  list.filter((m) => m.riskLevel === risk).length;
export const groupBy = (list, key) =>
  list.reduce((acc, it) => {
    acc[it[key]] = (acc[it[key]] || 0) + (it.monthlyVolume || 0);
    return acc;
  }, {});
