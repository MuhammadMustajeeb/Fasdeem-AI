import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-6">
        <p className="text-gray-600">
          Your privacy matters to us. This Privacy Policy explains how Fasdeem collects, uses,
          and safeguards your information.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect basic details like email and usage data to provide services and improve
            your experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">2. How We Use Data</h2>
          <p className="text-gray-600">
            We use data to enhance AI personalization and security. We never sell your data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">3. Contact Us</h2>
          <p className="text-gray-600">
            Email us at <span className="font-medium">support@fasdeem.com</span> for privacy inquiries.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
