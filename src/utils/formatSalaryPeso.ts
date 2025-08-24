export const formatSalaryPeso = (amount: number | null | undefined): string => {
  if (amount == null || isNaN(amount)) return "N/A"

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0, // no cents
  }).format(amount)
}
