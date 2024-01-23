"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { Check, Loader2 } from "lucide-react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  orderEmail,
  orderId,
  isPaid,
}) => {
  const router = useRouter();

  const { data: paymentStatus } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: !isPaid,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  React.useEffect(() => {
    if (paymentStatus?.isPaid) router.refresh();
  }, [paymentStatus?.isPaid, router]);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-900">Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-900">Order Status</p>
        <p>
          {isPaid ? (
            <span className="text-green-600 flex items-center gap-2">
              <Check className="h-4 w-4" aria-hidden />
              Payment successful
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Pending payment
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
