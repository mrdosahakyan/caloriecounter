// page_1_opened
// page_2_opened
// page_13_opened
// checkout_started (when user clicks Continue on page 13)
// checkout_completed (when payment completes successfully via apple pay or credit card)
// page_14_opened
export enum EMixpanelEvents {
  PAGE_1_OPENED = "page_1_opened",
  PAGE_2_OPENED = "page_2_opened",
  PAGE_13_OPENED = "page_13_opened",
  CHECKOUT_STARTED = "checkout_started",
  CHECKOUT_COMPLETED = "checkout_completed",
  PAGE_14_OPENED = "page_14_opened",
}
