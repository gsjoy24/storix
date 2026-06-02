import { promos } from "@/constants/promos"

export function PromoStrip() {
  return (
    <div className="bg-brand-primary py-2 text-center text-sm font-medium text-white">
      {promos.topBanner}
    </div>
  )
}
