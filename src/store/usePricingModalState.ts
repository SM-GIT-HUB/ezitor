import { PricingModalState } from "@/types"
import { create } from "zustand"

export const usePricingModalState = create<PricingModalState>((set, get) => ({
    modalOpen: false,
    setModalOpen: (value) => set({ modalOpen: value })
}))