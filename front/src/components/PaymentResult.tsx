import Link from "next/link";
import Container from "@/components/Container";

interface PaymentResultProps {
  icon: string;
  title: string;
  message: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const PaymentResult = ({
  icon,
  title,
  message,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PaymentResultProps) => {
  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <Container>
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto text-center">
          <div className="text-5xl mb-4">{icon}</div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex flex-col gap-3">
            <Link
              href={primaryHref}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="text-green-700 hover:text-green-800 font-semibold py-2"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentResult;