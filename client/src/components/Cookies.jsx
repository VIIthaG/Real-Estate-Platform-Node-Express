import React from "react";

function Cookies() {
  return (
    <div className=" ml-8 mt-8 lg:w-200 w-130 grid grid-cols-1">
      <div>
        <span className="text-amber-50 text-3xl font-semibold">Cookie</span>
        <span className="text-amber-100 text-3xl font-semibold ">Policy</span>
        <br />
      </div>
      <br />

      <div>
        <span className="text-stone-600 text-2xl font-semibold">Cookies:</span>
        <br />
        <br />
        <small className="text-yellow-100">
          Your computer when you visit a website and are used to store or track
          information about your use of the site. KohiEstate uses both
          session‑based and persistent‑based cookies. Session‑based cookies
          exist only during your web session and expire when you close your
          internet browser. Persistent‑based cookies are files that stay in one
          of your browser's subfolders until you delete them manually or your
          browser deletes them based on the duration period contained within the
          persistent cookie's file.
        </small>
        <br />
        <br />
        <small className="text-yellow-100">
          KohiEstate uses cookies for several reasons. Some cookies are strictly
          necessary to enable core site functionality. We refer to these as
          “required” cookies. For example, we may use required cookies to
          authenticate your access to various areas of our Website. Other
          cookies allow us to enhance your browsing experience, tailor content
          to your preferences, and make your interactions with our Website more
          meaningful. We refer to these as “functional” cookies. For example, we
          may use functional cookies to determine whether you have visited our
          Website before and inform us about site features in which you have
          interest, thereby permitting us to better tailor our Website content.
          Functional cookies also allow us to analyze Website traffic so we can
          measure and improve performance and speed up your searches.
        </small>
        <br />
        <br />
        <small className="text-yellow-100">
          In addition to required and functional cookies, some third parties
          issue cookies through our Website to serve ads that are relevant to
          your interests based on your browsing activities. These third parties
          may also collect your browser history or other information to
          determine how you reached our Website and the website you visit when
          you leave our Website. Information gathered through these automated
          means may be associated with the personal information you previously
          submitted on our Website.
        </small>
      </div>
      <br />
      <br />

      <div>
        <span className="text-stone-600 text-2xl font-semibold">DNT:</span>
        <br />
        <br />
        <small className="text-yellow-100">
          While KohiEstate attempts to honor do not track (“DNT”) instructions
          we receive from your browser, we cannot guarantee that KohiEstate will
          always respond to such signals, in part because of the lack of common
          industry standard for DNT technology. We continue to monitor
          developments in DNT technology and stay apprised of DNT industry
          standards as they evolve.
        </small>
      </div>
      <br />
      <br />

      <div>
        <span className="text-stone-600 text-2xl font-semibold">
          IP Addresses:
        </span>
        <br />
        <br />
        <small className="text-yellow-100">
          An IP address is a unique identifier that certain electronic devices
          use to identify and communicate with each other on the Internet. When
          you visit the Website, we may view the IP address of the device you
          use to connect to the Internet. We use this information to determine
          the general physical location of the device and the geographic regions
          of our visitors.
        </small>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Cookies;
