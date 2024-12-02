import {create} from 'zustand'

export const useCartStore = create<{cart:number[],setCart:Function}>( (set) => ({
    cart: [],
    setCart: (cart: number[]) => set((oldCart) => ({cart:cart}))
}));