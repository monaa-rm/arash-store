
export function formatNumberToPersian(number) {
    return new Intl.NumberFormat("fa-IR").format(number);
  }