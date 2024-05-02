import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Installment } from 'vtex.product-context/react/ProductTypes'

import { formatValues } from '../../../../helpers/formatValues'

const CSS_HANDLES = ['table', 'bodyCredit', 'tableRow', 'tableCel', 'secondCol']

interface Props {
  arrayInstallments: Installment[]
  paymentSystemName: string
  showOneTimeLabel?: boolean
  showTotalLabel?: boolean
}

export function Installments({
  arrayInstallments,
  paymentSystemName,
  showOneTimeLabel,
  showTotalLabel,
}: Props) {
  const css = useCssHandles(CSS_HANDLES)

  return (
    <table className={css.handles.table}>
      <tbody className={css.handles.bodyCredit}>
        {arrayInstallments.map((key: Installment, index: number) => (
          <>
            {key.PaymentSystemName === paymentSystemName && (
              <tr key={index} className={`c-on-base ${css.handles.tableRow}`}>
                {showOneTimeLabel ? (
                  <>
                    {key.NumberOfInstallments === 1 ? (
                      <>
                        <td className={`w-10 pl1 ${css.handles.tableCel}`}>
                          {key.NumberOfInstallments}x
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          de {formatValues(key.Value)}
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          {key.InterestRate > 0 ? (
                            <>com juros de {key.InterestRate}%</>
                          ) : (
                            <>sem juros</>
                          )}
                        </td>
                        {showTotalLabel ? (
                          <td className={`w-40 tr pr1 ${css.handles.tableCel}`}>
                            <span>total</span>{' '}
                            {formatValues(key.TotalValuePlusInterestRate)}
                          </td>
                        ) : (
                          <td
                            className={`w-40 tr pr1 ${css.handles.tableCel}`}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <td className={`w-10 pl1 ${css.handles.tableCel}`}>
                          {key.NumberOfInstallments}x
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          de {formatValues(key.Value)}
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          {key.InterestRate > 0 ? (
                            <>com juros de {key.InterestRate}%</>
                          ) : (
                            <>sem juros</>
                          )}
                        </td>
                        {showTotalLabel ? (
                          <td className={`w-40 tr pr1 ${css.handles.tableCel}`}>
                            <span>total</span>{' '}
                            {formatValues(key.TotalValuePlusInterestRate)}
                          </td>
                        ) : (
                          <td
                            className={`w-40 tr pr1 ${css.handles.tableCel}`}
                          />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {key.NumberOfInstallments === 1 ? (
                      <>
                        <td className={`w-10 pl1 ${css.handles.tableCel}`}>
                          à vista
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          {formatValues(key.Value)}
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`} />
                        <td className={`w-40 tr pr1 ${css.handles.tableCel}`} />
                        {showTotalLabel ? (
                          <td className={`w-40 tr pr1 ${css.handles.tableCel}`}>
                            <span>total</span>{' '}
                            {formatValues(key.TotalValuePlusInterestRate)}
                          </td>
                        ) : (
                          <td
                            className={`w-40 tr pr1 ${css.handles.tableCel}`}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <td className={`w-10 pl1 ${css.handles.tableCel}`}>
                          {key.NumberOfInstallments}x
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          de {formatValues(key.Value)}
                        </td>
                        <td className={`w-30 ${css.handles.tableCel}`}>
                          {key.InterestRate > 0 ? (
                            <>com juros de {key.InterestRate}%</>
                          ) : (
                            <>sem juros</>
                          )}
                        </td>
                        {showTotalLabel ? (
                          <td className={`w-40 tr pr1 ${css.handles.tableCel}`}>
                            <span>total</span>{' '}
                            {formatValues(key.TotalValuePlusInterestRate)}
                          </td>
                        ) : (
                          <td
                            className={`w-40 tr pr1 ${css.handles.tableCel}`}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  )
}
