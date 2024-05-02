import React from 'react'
import { Installment, Seller } from 'vtex.product-context/react/ProductTypes'
import { useCssHandles } from 'vtex.css-handles'

import { formatValues } from '../../../../helpers/formatValues'
import useDiscount from '../../hooks/useDiscounts'

const CSS_HANDLES = ['table', 'bodyCash', 'tableRow', 'discountTax']

interface Props {
  arrayInstallments: Installment[]
  paymentSystemName: string
  paymentSystemId: number
  seller: Seller
}

export const Installments = ({
  arrayInstallments,
  paymentSystemName,
  paymentSystemId,
  seller,
}: Props) => {
  const { discount, discountLoaded } = useDiscount(paymentSystemId, seller)
  const css = useCssHandles(CSS_HANDLES)

  if (!discountLoaded) {
    return (
      <span className="w100 flex justify-center c-on-base">Carregando...</span>
    )
  }

  return (
    <>
      <table className={css.handles.table}>
        <tbody className={css.handles.bodycash}>
          {arrayInstallments.map((key: Installment, index: number) => (
            <>
              {key.PaymentSystemName === paymentSystemName && (
                <tr key={index} className={`c-on-base ${css.handles.tableRow}`}>
                  <td>
                    <strong>
                      {discount && discount.tax > 0
                        ? `${formatValues(discount.totalValue)} `
                        : `${formatValues(key.TotalValuePlusInterestRate)} `}
                    </strong>
                    no {paymentSystemName}
                    {discount && discount.tax > 0 && (
                      <strong className={css.handles.discountTax}>
                        {' '}
                        ({discount.tax}% de desconto)
                      </strong>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </>
  )
}
