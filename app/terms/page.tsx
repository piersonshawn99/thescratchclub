import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | The Scratch Club",
  description: "Terms of Use for The Scratch Club website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-neutral-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: April 2026
        </p>
      </header>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          Welcome to The Scratch Club website. By accessing or using this site,
          you agree to these Terms of Use. If you do not agree, please do not
          use the site.
        </p>

        <h2>Use of This Website</h2>
        <p>
          This website is provided for general informational, marketing, and
          customer inquiry purposes related to The Scratch Club, including our
          memberships, coaching, courses, leagues, and related services.
        </p>
        <p>
          You agree to use this website only for lawful purposes and in a way
          that does not damage, disable, overburden, or impair the site or
          interfere with anyone else’s use of it.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We try to keep the information on this site accurate and up to date,
          but we do not guarantee that all content is complete, current, or
          error-free. Membership options, pricing, hours, services, locations,
          events, and availability may change at any time without notice.
        </p>

        <h2>No Guarantee of Availability</h2>
        <p>
          We do not guarantee that the website will always be available, secure,
          or free from interruptions, errors, or technical issues. We may
          suspend, update, or change the site at any time.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          Unless otherwise noted, all content on this website—including text,
          graphics, logos, branding, layouts, images, and other materials—is
          owned by or used with permission by The Scratch Club and is protected
          by applicable intellectual property laws.
        </p>
        <p>
          You may not copy, reproduce, distribute, modify, republish, or create
          derivative works from this content without prior written permission,
          except for normal personal, non-commercial use.
        </p>

        <h2>Third-Party Links and Services</h2>
        <p>
          This site may contain links to third-party websites or services,
          including booking, maps, email, analytics, payment, or social
          platforms. We are not responsible for the content, privacy practices,
          availability, or policies of third-party sites.
        </p>

        <h2>User Submissions</h2>
        <p>
          If you submit information to us through contact forms, interest forms,
          or other website features, you represent that the information you
          provide is accurate and that you have the right to provide it.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, The Scratch Club is not liable
          for any direct, indirect, incidental, consequential, special, or
          punitive damages arising out of or related to your use of, or inability
          to use, this website.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          Content on this website is provided for general informational purposes
          only and should not be treated as legal, financial, medical, or other
          professional advice.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Any updates will
          be posted on this page with a revised effective date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these Terms of Use, please contact us at{" "}
          <a href="mailto:info@scratchclubgolf.com">
            info@scratchclubgolf.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}