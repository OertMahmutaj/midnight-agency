export function openContactModal() {
  window.dispatchEvent(new CustomEvent('midnight:open-contact'));
}
