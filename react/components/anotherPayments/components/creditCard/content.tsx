import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductTypes } from 'vtex.product-context'

import { Installments } from './installments'
import usePayments from '../../hooks/usePayments'

const CSS_HANDLES = ['wrapper-credit-card-content']

interface Props {
  paymentSystemName: string
  showOneTimeLabel?: boolean
  showTotalLabel?: boolean
  seller: ProductTypes.Seller
}

export function Content({
  paymentSystemName,
  showOneTimeLabel,
  showTotalLabel,
  seller,
}: Props) {
  const { arrayInstallments, isLoaded } = usePayments(seller)
  const css = useCssHandles(CSS_HANDLES)

  return (
    <div className={css.handles['wrapper-credit-card-content']}>
      {isLoaded ? (
        <Installments
          paymentSystemName={paymentSystemName}
          showOneTimeLabel={showOneTimeLabel}
          showTotalLabel={showTotalLabel}
          arrayInstallments={arrayInstallments}
        />
      ) : (
        <span className="w100 flex justify-center c-on-base">
          Carregando...
        </span>
      )}
    </div>
  )
}

Content.schema = {
  title: 'Outras formas de pagamento crédito',
  description: 'Outras formas de pagamento para cartões de crédito',
  type: 'object',
  properties: {
    paymentSystemName: {
      title:
        'Nome da bandeira do cartão (Os parcelamentos serão exibidos de acordo com a bandeira apontada no campo abaixo)',
      description: 'Ex: Visa',
      type: 'string',
      default: 'Visa',
    },
    showOneTimeLabel: {
      title: 'Exibir o parcelamento "1x"',
      description: 'Exibe o parcelamento "1x" ao invés de "à vista"',
      type: 'boolean',
      default: false,
    },
    showTotalLabel: {
      title: 'Exibir o label "total"',
      description: 'Exibe o label "total" antes do valor da parcela',
      type: 'boolean',
      default: false,
    },
  },
}

export default Content
