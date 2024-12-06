export default function formatMonth(month) {
  const date = new Date();
  date.setMonth(month);

  return date.toLocaleString('id-ID', { month: 'long' });
}
