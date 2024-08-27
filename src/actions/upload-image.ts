'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

import { s3Client } from '@/lib/s3-client'
import { toManyImages } from '@/utils/to-many-images'

export async function uploadImage(formData: FormData) {
  const image = formData.get('image') as File

  if (!image.size) {
    return {
      success: false,
      message: 'Nenhuma imagem adicionada.',
    }
  }

  if (!image.type.startsWith('image/')) {
    return {
      success: false,
      message: 'Formato do arquivo não permitido.',
    }
  }

  if (image.size > 2 * 1024 * 1024) {
    return {
      success: false,
      message: 'Tamanho do arquivo não permitido. (< 2mb)',
    }
  }

  if (await toManyImages()) {
    return {
      success: false,
      message: 'Está aplicação atingiu o limite de imagens.',
    }
  }

  const arrayBuffer = await image.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)

  const putObjectParams = new PutObjectCommand({
    Bucket: 'mp-galeria-codante',
    Key: nanoid() + '.jpeg',
    Body: imageBuffer,
    ContentType: 'image/jpeg',
  })

  try {
    await s3Client.send(putObjectParams)
    revalidatePath('/')

    return {
      success: true,
    }
  } catch (e) {
    return {
      success: false,
      message: 'Alguma coisa deu errado',
    }
  }
}
