const WHATSAPP_NUMBER_DISPLAY = "+91 94470 35886";
const WHATSAPP_URL = "https://wa.me/919447035886";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with us on WhatsApp at ${WHATSAPP_NUMBER_DISPLAY}`}
      className="group fixed right-4 bottom-5 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_rgba(15,23,42,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1fb85a] hover:shadow-[0_20px_46px_rgba(15,23,42,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:right-6 sm:bottom-6"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <path d="M16.02 4C9.42 4 4.05 9.27 4.05 15.75c0 2.07.56 4.1 1.62 5.88L4 28l6.55-1.64A12.15 12.15 0 0 0 16.02 27C22.62 27 28 21.73 28 15.25S22.62 4 16.02 4Zm0 20.95c-1.76 0-3.49-.46-5-1.33l-.36-.2-3.88.97.99-3.69-.24-.38a9.38 9.38 0 0 1-1.45-4.98c0-5.35 4.46-9.7 9.94-9.7s9.94 4.35 9.94 9.7-4.46 9.61-9.94 9.61Zm5.45-7.18c-.3-.15-1.77-.86-2.04-.95-.28-.1-.48-.15-.68.15-.2.29-.78.95-.96 1.14-.17.2-.35.22-.65.08-.3-.15-1.26-.45-2.4-1.45a8.88 8.88 0 0 1-1.66-2.03c-.17-.29-.02-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.19.05-.36-.03-.51-.07-.15-.67-1.58-.92-2.16-.24-.57-.49-.49-.68-.5h-.58c-.2 0-.52.07-.8.36-.27.29-1.05 1.01-1.05 2.47 0 1.45 1.08 2.86 1.23 3.05.15.2 2.13 3.2 5.16 4.48.72.3 1.28.49 1.72.63.72.22 1.38.19 1.9.12.58-.08 1.77-.71 2.02-1.4.25-.68.25-1.27.18-1.4-.08-.12-.28-.19-.58-.34Z" />
      </svg>
    </a>
  );
}
