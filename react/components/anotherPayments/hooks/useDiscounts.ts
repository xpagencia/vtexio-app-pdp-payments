import { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { Seller } from 'vtex.product-context/react/ProductTypes'

import { Discount } from '../typings/Discount'
import { Total } from '../typings/Total'
import { checkoutSimulation } from '../modules/checkoutSimulation'

export default function useDiscount(paymentSystem: number, seller: Seller) {
  const productContext = useProduct()
  const [discount, setDiscount] = useState<Discount>()
  const [discountLoaded, setDiscountLoaded] = useState(false)

  function simulateDiscount() {
    if (productContext?.selectedItem) {
      const { itemId } = productContext.selectedItem

      const data = {
        items: [
          {
            id: itemId,
            quantity: 1,
            seller: seller?.sellerId ?? 1,
          },
        ],
        paymentData: {
          payments: [
            {
              installments: 1,
              paymentSystem,
            },
          ],
        },
        country: 'BRA',
      }

      checkoutSimulation(data)
        .then((response) => {
          // eslint-disable-next-line vtex/prefer-early-return
          if (response) {
            const { totals } = response
            const discountTotal = calculateDiscount(totals)

            setDiscount(discountTotal)
          }
        })
        .finally(() => setDiscountLoaded(true))
    } else {
      setDiscountLoaded(true)
    }
  }

  function calculateDiscount(totals: Total[]) {
    let totalValue = 0
    let discountValue = 0

    totals.forEach((key: Total) => {
      if (key.id === 'Items') {
        totalValue = key.value
      } else if (key.id === 'Discounts') {
        discountValue = key.value && Math.abs(key.value)
      }
    })

    const discountData: Discount = {
      value: discountValue,
      tax:
        discountValue > 0
          ? Math.floor((discountValue * 100) / totalValue)
          : discountValue,
      totalValue: (totalValue - discountValue) / 100,
    }

    return discountData
  }

  useEffect(() => {
    simulateDiscount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productContext])

  return { discount, discountLoaded }
}
