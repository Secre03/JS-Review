import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}


export function calculateDeliverdate(deliveryOption) {
  let daysToAdd = Number(deliveryOption.deliveryDays);
  let date = dayjs();

  while (daysToAdd > 0) {
    date = date.add(1, "day");

    const dayName = date.format("dddd");

    // Skip Saturday and Sunday
    if (dayName !== "Saturday" && dayName !== "Sunday") {
      daysToAdd--;
    }
  }
  const dateString = date.format("dddd, MMMM, D");
  return dateString;
}
