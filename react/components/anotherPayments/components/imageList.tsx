import React from 'react'
import {
  useListContext,
  ListContextProvider,
  ListRenderer,
} from 'vtex.list-context'
import { useDevice } from 'vtex.device-detector'
import { Image } from 'vtex.store-image'

interface Image {
  link?: string
  image: string
  mobileImage?: string
  description?: string
  title?: string
  width?: string
  id?: string
}

interface Props {
  images: Image[]
  height: string
}

export const ImageList: StorefrontFunctionComponent<Props> = ({
  images,
  height,
}: Props) => {
  const { isMobile } = useDevice()
  const { list } = useListContext() || []

  const imageListContent = images.map(
    (
      {
        link,
        image,
        mobileImage,
        description,
        title,
        width = '100%',
        id,
      }: Image,
      idx: number
    ) => (
      <Image
        key={idx}
        src={isMobile && mobileImage ? mobileImage : image}
        alt={description}
        link={{
          url: link ?? '',
          attributeNofollow: true,
        }}
        title={title}
        maxHeight={height}
        width={width}
        id={id}
      />
    )
  )

  const newListContextValue = list.concat(imageListContent)

  return (
    <ListContextProvider list={newListContextValue}>
      <ListRenderer listElement="div" itemElement="div" />
    </ListContextProvider>
  )
}

ImageList.schema = {
  title: 'Imagens de cartão de crédito',
  description:
    'IMagens utililizadas para a lista de cartões de crédito disponíveis.',
  type: 'object',
  properties: {
    images: {
      type: 'array',
      title: 'Lista',
      items: {
        properties: {
          image: {
            $ref: 'app:vtex.native-types#/definitions/url',
            default: '',
            title: 'Imagem',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          mobileImage: {
            $ref: 'app:vtex.native-types#/definitions/url',
            default: '',
            title: 'Imagem mobile',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          description: {
            $ref: 'app:vtex.native-types#/definitions/text',
            default: '',
            title: 'Descrição',
          },
          link: {
            default: '',
            title: 'URL',
            $ref: 'app:vtex.native-types#/definitions/link',
          },
        },
      },
    },
    height: {
      default: 420,
      enum: [420, 440],
      isLayout: true,
      title: 'Altura',
      type: 'number',
    },
  },
}
