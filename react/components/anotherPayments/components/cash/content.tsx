import React from 'react'
import { ProductTypes } from 'vtex.product-context'

import usePayments from '../../hooks/usePayments'
import { Installments } from './installments'

interface Props {
  paymentSystemName: string
  paymentSystemId: number
  seller: ProductTypes.Seller
}

export function Content({ paymentSystemName, paymentSystemId, seller }: Props) {
  const { arrayInstallments, isLoaded } = usePayments(seller)

  return (
    <>
      {isLoaded ? (
        <>
          <Installments
            paymentSystemName={paymentSystemName}
            arrayInstallments={arrayInstallments}
            paymentSystemId={paymentSystemId}
            seller={seller}
          />
        </>
      ) : (
        <span className="w100 flex justify-center c-on-base">
          Carregando...
        </span>
      )}
    </>
  )
}

Content.schema = {
  title: 'Outras formas de pagamento: Cash',
  description: 'Outras formas de pagamento que não possuem parcelamento',
  type: 'object',
  properties: {
    paymentSystemName: {
      title: 'Nome da forma de pagamento',
      description: 'Ex: Boleto Bancário',
      type: 'string',
      default: 'Boleto Bancário',
    },
    paymentSystemId: {
      title: 'ID da forma de pagamento',
      description: 'Ex: 6',
      type: 'number',
      default: 6,
    },
  },
}

export default Content
