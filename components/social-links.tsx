const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=UAVQHFBRK82TL";

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Donation and social links">
      <a
        href={PAYPAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate with PayPal (opens in a new tab)"
        title="PayPal"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.2 3h7.1c3.6 0 5.5 1.8 5.1 4.9-.5 3.9-3.1 5.9-6.8 5.9h-2l-.8 5.1H5.7L8 4.1A1.3 1.3 0 0 1 9.3 3h-2.1Zm3.9 3.5-.6 4h2.1c1.5 0 2.5-.8 2.7-2.1.2-1.2-.6-1.9-2-1.9h-2.2Z" />
        </svg>
      </a>
      <a
        href="https://venmo.com/u/Tolland-Cares"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate with Venmo (opens in a new tab)"
        title="Venmo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.8 3.8c.7 1.2 1 2.5 1 4.2 0 5.2-4.4 11.9-8 16H4L1 5.5l6.8-.7 1.6 13c1.5-2.5 3.3-6.3 3.3-8.9 0-1.5-.3-2.5-.8-3.4l6.9-1.7Z" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/groups/173738280037778/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tolland Cares on Facebook (opens in a new tab)"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 8.3V6.8c0-.8.5-1 1-1h2.8V1.2L14 1c-4.1 0-5.1 2.5-5.1 5v2.3H6v5.2h2.9V24H14V13.5h3.5l.6-5.2H14Z" />
        </svg>
      </a>
    </div>
  );
}
