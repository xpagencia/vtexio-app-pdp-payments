import React, { useEffect, useState } from 'react'
import { useCssHandles, useCustomClasses } from 'vtex.css-handles'
import { ProductTypes, useProduct } from 'vtex.product-context'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTrigger,
} from 'vtex.modal-layout'
import { index as RichText } from 'vtex.rich-text'
import {
  TabLayout,
  TabList,
  TabContent,
  TabListItem,
  TabContentItem,
} from 'vtex.tab-layout'
import {
  CssHandlesList,
  CustomClasses,
} from 'vtex.css-handles/react/CssHandlesTypes'
import { Item } from 'vtex.product-context/react/ProductTypes'

import { ImageList } from './components/imageList'
import { Content as CashContent } from './components/cash/content'
import { Content as CreditCardContent } from './components/creditCard/content'

const CSS_HANDLES = [
  'wrapper-another-payments',
  'another-payments-button-open-modal',
  'wrapper-content-credit-card',
  'wrapper-content-boleto',
  'wrapper-content-pix',
  'header-credit-card',
  'header-boleto',
  'header-pix',
]

type IpropsTrigger = {
  text: string
}

type IpropsModal = {
  header: {
    title: string
  }
}

interface Props {
  sellerId: string
  skuId: number
  trigger?: IpropsTrigger
  modal?: IpropsModal
}

export default function AnotherPayments(props: Props) {
  const [seller, setSeller] = useState<ProductTypes.Seller>()
  const [paymentSystemAvailable, setPaymentSystemAvailable] = useState<
    string[]
  >([])

  const productContext = useProduct()
  const product = productContext?.product
  const css = useCssHandles(CSS_HANDLES)
  const classes = useCustomClasses(
    (): Pick<CustomClasses<CssHandlesList>, string> => ({
      text: ['trigger-link'],
    })
  )

  const {
    sellerId,
    skuId,
    trigger = {
      text: 'ver parcelamento',
    },
    modal = {
      header: {
        title: 'Formas de pagamento',
      },
    },
  } = props

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (product && sellerId !== undefined && sellerId !== '' && skuId > 0) {
      let sellerFind: ProductTypes.Seller | undefined

      const { items } = product
      let itemsFilter: Item[]

      if (skuId > 0) {
        itemsFilter = items.filter(
          (x: ProductTypes.Item) => x.itemId === skuId.toString()
        )
      } else {
        itemsFilter = items
      }

      itemsFilter.forEach((item) => {
        sellerFind = item.sellers.find(
          (x: ProductTypes.Seller) => x.sellerId === sellerId
        )
        if (sellerFind) {
          setSeller(sellerFind)
        }
      })
    }
  }, [product, sellerId, skuId])

  useEffect(() => {
    if (seller) {
      const opcoesPagamaento = seller.commertialOffer.Installments.map(
        (installment) => {
          return installment.PaymentSystemName
        }
      ).filter((value, index, array) => array.indexOf(value) === index)

      setPaymentSystemAvailable(opcoesPagamaento)
    }
  }, [seller])

  // {paymentSystemAvailable.length} {seller?.sellerId} {skuId}

  return (
    <>
      {seller && seller?.sellerId !== '' && paymentSystemAvailable.length > 0 && (
        <div
          className={css.handles['wrapper-another-payments']}
          data-seller-id={seller?.sellerId}
          data-sku-id={skuId}
        >
          <ModalTrigger>
            <RichText text={trigger.text} classes={classes} />
            <Modal>
              <ModalHeader />
              <ModalContent>
                <section>
                  <header>{modal.header.title}</header>
                  <TabLayout>
                    <TabList>
                      <div className={css.handles['header-credit-card']}>
                        <TabListItem
                          tabId="another-payments-option-1"
                          label="Cartão de crédito"
                          defaultActiveTab
                          position={1}
                        />
                      </div>
                      <div
                        className={`${css.handles['header-boleto']} ${paymentSystemAvailable.indexOf('Boleto Bancário') ===
                          -1 && 'dn'
                          }`}
                      >
                        <TabListItem
                          tabId="another-payments-option-2"
                          label="Boleto"
                          defaultActiveTab={false}
                          position={2}
                        />
                      </div>
                      <div
                        className={`${css.handles['header-pix']} ${paymentSystemAvailable.indexOf('PIX') === -1 && 'dn'
                          }`}
                      >
                        <TabListItem
                          tabId="another-payments-option-3"
                          label="PIX"
                          defaultActiveTab={false}
                          position={3}
                        />
                      </div>
                    </TabList>
                    <TabContent>
                      <TabContentItem
                        key="another-payments-option-1"
                        tabId="another-payments-option-1"
                        position={1}
                      >
                        <div
                          className={css.handles['wrapper-content-credit-card']}
                        >
                          <RichText text="Cartões aceitos:" />
                          <ImageList
                            height="30px"
                            images={[
                              {
                                image: '/arquivos/produto-pagamento-visa.svg',
                                width: '30px',
                                title: 'Visa',
                              },
                              {
                                image:
                                  '/arquivos/produto-pagamento-mastercard.svg',
                                width: '30px',
                                title: 'Mastercard',
                              },
                              {
                                image:
                                  '/arquivos/produto-pagamento-american-express.svg',
                                width: '30px',
                                title: 'Amex',
                              },
                              {
                                image:
                                  '/arquivos/produto-pagamento-diners-club.svg',
                                width: '30px',
                                title: 'Diners',
                              },
                              {
                                image: '/arquivos/produto-pagamento-elo.svg',
                                width: '30px',
                                title: 'Elo',
                              },
                              {
                                image:
                                  '/arquivos/produto-pagamento-hipercard.svg',
                                width: '30px',
                                title: 'Hipercard',
                              },
                              {
                                image:
                                  '/arquivos/produto-pagamento-2-cartoes.svg',
                                width: '30px',
                                id: 'cartoes-2',
                                title: 'Pague com 2 cartões',
                              },
                            ]}
                          />
                          <RichText text="Demonstrativo de parcelamento:" />
                          <CreditCardContent
                            paymentSystemName="Visa"
                            showOneTimeLabel
                            showTotalLabel
                            seller={seller}
                          />
                        </div>
                      </TabContentItem>

                      <TabContentItem
                        key="another-payments-option-2"
                        tabId="another-payments-option-2"
                        position={2}
                      >
                        {paymentSystemAvailable.indexOf('Boleto Bancário') >
                          -1 && (
                            <div
                              className={css.handles['wrapper-content-boleto']}
                            >
                              <CashContent
                                paymentSystemName="Boleto Bancário"
                                paymentSystemId={6}
                                seller={seller}
                              />
                              <RichText text="O boleto será gerado após a finalização de sua compra. Imprima e pague no banco ou pague pela internet utilizando o código de barras do boleto." />
                            </div>
                          )}
                      </TabContentItem>

                      <TabContentItem
                        key="another-payments-option-3"
                        tabId="another-payments-option-3"
                        position={3}
                      >
                        {paymentSystemAvailable.indexOf('PIX') > -1 && (
                          <div className={css.handles['wrapper-content-pix']}>
                            <CashContent
                              paymentSystemName="Pix"
                              paymentSystemId={125}
                              seller={seller}
                            />
                            <RichText text="O pagamento é instantâneo e só pode ser à vista. Na etapa de finalização da compra, a gente explica direitinho como pagar com Pix." />
                          </div>
                        )}
                      </TabContentItem>
                    </TabContent>
                  </TabLayout>
                </section>
              </ModalContent>
            </Modal>
          </ModalTrigger>
        </div>
      )}
    </>
  )
}
