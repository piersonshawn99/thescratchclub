import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Scratch Club",
  description: "Privacy Policy for The Scratch Club website.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-neutral-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: April 2026
        </p>
      </header>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          The Scratch Club respects your privacy. This Privacy Policy describes
          how we collect, use, and protect information you provide through this
          website.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect information you voluntarily provide, such as:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Messages, questions, or interest form submissions</li>
        </ul>

        <p>
          We may also collect limited technical information through website tools
          such as analytics, including general usage patterns, device/browser
          information, and pages visited.
        </p>

        <h2>How We Use Information</h2>
        <p>We may use your information to:</p>
        <ul>
          <li>Respond to inquiries and contact requests</li>
          <li>Communicate with you about memberships, leagues, coaching, events, or services</li>
          <li>Improve website performance and user experience</li>
          <li>Operate and maintain our business and customer communications</li>
        </ul>

        <h2>How We Share Information</h2>
        <p>
          We do not sell your personal information. We may share information with
          trusted service providers that help us operate our website and
          communications, such as hosting, booking, email delivery, analytics,
          or payment tools, but only as needed for those services.
        </p>

        <h2>Email and Contact Forms</h2>
        <p>
          If you submit a form on our website, your information may be delivered
          to our internal email inboxes and systems so our team can respond to
          you.
        </p>

        <h2>Cookies and Analytics</h2>
        <p>
          Our website may use cookies or similar technologies for basic site
          functionality, performance measurement, and analytics. These tools help
          us understand how visitors use the site and improve it over time.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          This site may link to or integrate with third-party services such as
          booking platforms, maps, email tools, analytics providers, social
          platforms, or payment processors. Those services have their own
          privacy policies and practices, and we are not responsible for them.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable steps to protect the information submitted through
          this website. However, no method of transmission or storage is
          completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>Children’s Privacy</h2>
        <p>
          This website is not intended to knowingly collect personal information
          from children under 13 without appropriate parental or guardian
          involvement.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may contact us if you want us to update or delete information you
          previously submitted through our website, subject to any operational,
          legal, or recordkeeping needs.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with a revised effective date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy or your information,
          please contact us at{" "}
          <a href="mailto:info@scratchclubgolf.com">
            info@scratchclubgolf.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}