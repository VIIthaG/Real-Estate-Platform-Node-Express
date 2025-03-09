import React from "react";

function Terms() {
  return (
    <div className="ml-8 mt-8 lg:w-200 w-130 grid grid-cols-1">
      {/* Heading */}
      <div>
        <span className="text-amber-100 text-3xl font-semibold">Terms</span>
        <span className="text-xl text-stone-400">&</span>
        <span className="text-yellow-50 text-3xl font-semibold">
          Conditions
        </span>
      </div>
      <br />
      <br />

      {/* Section 1 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">
          Acceptance of the Terms of Use:
        </span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          The following terms and conditions, together with any referenced
          documents (collectively, "Terms of Use") are a legal agreement between
          you and your employees, agents, contractors and any other entity on
          whose behalf you accept these terms (collectively, “you” and “your”),
          and ServiceNow, Inc. if your domicile is within the USA, Canada or
          Mexico, or ServiceNow Nederland B.V. if your domicile is within any
          other country (“ServiceNow,” “we,” “us” and “our”). The Terms of Use
          apply to ServiceNow’s Website (as defined below).
        </p>
      </div>
      <br />
      <br />

      {/* Section 2 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">Access:</span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          We reserve the right to terminate or modify the Website including any
          of its content, in whole or in part, in any manner in our sole
          discretion, without notice. We will not be liable if, for any reason,
          all or any part of the Website is unavailable at any time or for any
          period.
        </p>
      </div>
      <br />
      <br />

      {/* Section 3 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">Accounts:</span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          To access portions of the Website or certain resources, you may be
          asked to provide certain registration details or other information. It
          is a condition of your use of the Website, and you hereby represent
          and warrant that you are of the legal age of majority in the
          jurisdiction in which you reside and that all information you provide
          is correct, current, and complete.
        </p>
      </div>
      <br />
      <br />

      {/* Section 4 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">
          ServiceNow Products:
        </span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          The “Website” does not include ServiceNow Products. “ServiceNow
          Product” means the ServiceNow platform and any ServiceNow applications
          or subscription services, including those customarily provided by us
          only to our paying customers.
        </p>
      </div>
      <br />
      <br />

      {/* Section 5 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">Posting:</span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          Users of the Website may be permitted to post, submit, contribute,
          publish, display, make available or transmit to others (hereinafter,
          "post") content, materials, or hosted applications on or through the
          Website. Posting permits our customers, partners, developers,
          prospective customers, employees, and other interested parties to
          share information, exchange ideas, and obtain product information.
        </p>
      </div>
      <br />
      <br />

      {/* Section 6 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">
          Code of Conduct:
        </span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          You agree to comply with the following code of conduct in your use of
          the Website. Be polite and courteous. Respect and treat others as you
          would expect to be treated yourself.
        </p>
      </div>
      <br />
      <br />

      {/* Section 7 */}
      <div>
        <span className="text-stone-600 text-2xl font-semibold">
          Prohibited Uses:
        </span>
        <br />
        <br />
        <p className="text-amber-100 text-sm">
          You agree not to access or use the Website in any manner that violates
          any applicable federal, state, local or international law or
          regulation, or advocates, promotes or assists in any unlawful act.
        </p>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Terms;
