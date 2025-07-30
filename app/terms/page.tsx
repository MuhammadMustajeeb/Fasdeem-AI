import LegalLayout from "@/components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <section className="space-y-6">
        <p className="text-gray-600">
          By using Fasdeem, you agree to these terms. Please read carefully.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            Accessing Fasdeem means you agree to comply with these terms and applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">2. Fair Usage</h2>
          <p className="text-gray-600">
            Do not misuse our platform, engage in fraud, or breach legal regulations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">3. Liability</h2>
          <p className="text-gray-600">
            Fasdeem is provided “as-is.” We are not liable for any damages arising from its use.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
