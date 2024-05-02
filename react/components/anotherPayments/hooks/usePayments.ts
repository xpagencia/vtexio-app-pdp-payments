import { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { Installment, Seller } from 'vtex.product-context/react/ProductTypes'

export default function usePayments(seller: Seller) {
  const productContext = useProduct()
  const [arrayInstallments, setArrayInstallments] = useState<Installment[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  function createArrayInstallments() {
    let arrayInstallmentsCreate: Installment[] = []

    if (seller?.commertialOffer) {
      arrayInstallmentsCreate = seller.commertialOffer.Installments
    }

    setArrayInstallments(arrayInstallmentsCreate)
  }

  useEffect(() => {
    createArrayInstallments()
    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productContext])

  return { arrayInstallments, isLoaded }
}
